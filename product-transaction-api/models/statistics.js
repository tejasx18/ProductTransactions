import ProductTransaction from "../models/ProductTransaction.js";
import { Op } from 'sequelize';
import sequelize from '../config/db.js';

export const statistics = async (month)=>{
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

    return {
      totalSales,
      totalSoldItems,
      totalNotSoldItems,
    }
}