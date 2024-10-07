import ProductTransaction from "../models/ProductTransaction.js";
import { Op } from 'sequelize';
import sequelize from '../config/db.js';

export const piechart = async (month) =>{
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

    return result;
}