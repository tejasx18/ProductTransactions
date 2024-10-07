import ProductTransaction from '../models/ProductTransaction.js';
import { Op } from 'sequelize';
import { statistics } from '../models/statistics.js';
import {barchart} from '../models/barchart.js';
import { piechart } from '../models/piechart.js';

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
      const priceSearch = parseFloat(search);
      if (!isNaN(priceSearch)) {
        whereClause[Op.or].push({ price: priceSearch });
      }
       transactions = await ProductTransaction.findAndCountAll({
        where: whereClause,
        limit: perPage,
        offset: (page - 1) * perPage,
      });
    }
    else {
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
    const data = await statistics(month);
    res.status(200).json({
      statistics:{...data},
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};


export const getBarChartData = async (req, res) => {
  const { month } = req.params;
  try {
    const data = await barchart(month);
    res.status(200).json({barChartData:{...data}});
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
};

export const getPieChartData = async (req, res) => {
  const { month } = req.params;
  try {
    const data = await piechart(month);
    res.status(200).json({pieChartData:{...data}});
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ message: 'Error fetching pie chart data', error });
  }
};

export const getCombinedData = async (req, res) => {
  const { month } = req.params;
  try {
    const statisticsResponse = await statistics(month);
    const barChartDataResponse = await barchart(month);
    const pieChartDataResponse = await piechart(month);
    const combinedResponse = {
      statistics : {...statisticsResponse},
      barChartData : {...barChartDataResponse},
      pieChartData : {...pieChartDataResponse},
    };
    res.status(200).json(combinedResponse);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ message: 'Error fetching combined data', error: error.message });
  }
};





