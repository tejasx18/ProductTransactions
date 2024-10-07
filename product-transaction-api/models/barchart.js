import ProductTransaction from "../models/ProductTransaction.js";
import { Op } from 'sequelize';
import sequelize from '../config/db.js';

export const barchart = async (month) =>{
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

  return data;

}