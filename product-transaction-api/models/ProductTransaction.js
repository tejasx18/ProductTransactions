import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ProductTransaction = sequelize.define('ProductTransaction', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  category: DataTypes.STRING,
  dateOfSale: DataTypes.DATE,
  sold: DataTypes.BOOLEAN,
});

export default ProductTransaction;
