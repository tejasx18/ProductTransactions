import ProductTransaction from '../models/ProductTransaction.js';
import { Op } from 'sequelize';
import sequelize from '../config/db.js';
import axios from 'axios';


export const getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '' } = req.query;

  try {
    const whereClause = {
      [Op.or]: [],
    };
    let transactions;
    if (search) {
      whereClause[Op.or].push(
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      );

      // Check if search can be parsed as a number for price search
      const priceSearch = parseFloat(search);
      if (!isNaN(priceSearch)) {
        whereClause[Op.or].push({ price: priceSearch });
      }
       transactions = await ProductTransaction.findAndCountAll({
        where: whereClause,
        limit: perPage,
        offset: (page - 1) * perPage,
      });
    }else{
       transactions = await ProductTransaction.findAndCountAll({
        limit: perPage,
        offset: (page - 1) * perPage,
      });
    }

    res.status(200).json({
      totalItems: transactions.count,
      totalPages: Math.ceil(transactions.count / perPage),
      currentPage: page,
      transactions: transactions.rows,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};


export const getStatistics = async (req, res) => {
  const { month } = req.params; 

  try {
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

    const totalSales = await ProductTransaction.sum('price', {
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "dateOfSale"')), monthNumber),
        ],
      },
    });

    const totalSoldItems = await ProductTransaction.count({
      where: {
        sold: true,
        [Op.and]: [
          sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "dateOfSale"')), monthNumber),
        ],
      },
    });

    const totalNotSoldItems = await ProductTransaction.count({
      where: {
        sold: false,
        [Op.and]: [
          sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "dateOfSale"')), monthNumber),
        ],
      },
    });

    res.status(200).json({
      totalSales,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};


export const getBarChartData = async (req, res) => {
  const { month } = req.params;

  try {
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const data = await Promise.all(priceRanges.map(async (range) => {
      const count = await ProductTransaction.count({
        where: {
          price: {
            [Op.and]: [
              { [Op.gte]: range.min },
              { [Op.lte]: range.max },
            ],
          },
          [Op.and]: [
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "dateOfSale"')), monthNumber),
          ],
        },
      });
      return { range: `${range.min}-${range.max}`, count };
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
};

export const getPieChartData = async (req, res) => {
  const { month } = req.params;

  try {
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

    const categories = await ProductTransaction.findAll({
      attributes: ['category', [sequelize.fn('COUNT', sequelize.col('category')), 'count']],
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "dateOfSale"')), monthNumber),
        ],
      },
      group: ['category'],
    });

    const result = categories.map(category => ({
      category: category.category,
      count: category.dataValues.count,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ message: 'Error fetching pie chart data', error });
  }
};



// Get combined data for a specific month
export const getCombinedData = async (req, res) => {
  const { month } = req.params;

  try {
    // Define the base URL for your API
    const baseUrl = 'http://localhost:3000/api'; // Update with your actual API URL

    // Make API calls
    const statisticsResponse = await axios.get(`${baseUrl}/statistics/${month}`);
    const barChartDataResponse = await axios.get(`${baseUrl}/bar-chart/${month}`);
    const pieChartDataResponse = await axios.get(`${baseUrl}/pie-chart/${month}`);

    // Extract data from responses
    const statistics = statisticsResponse.data;
    const barChartData = barChartDataResponse.data;
    const pieChartData = pieChartDataResponse.data;

    // Combine all responses
    const combinedResponse = {
      statistics,
      barChartData,
      pieChartData,
    };

    res.status(200).json(combinedResponse);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ message: 'Error fetching combined data', error: error.message });
  }
};





