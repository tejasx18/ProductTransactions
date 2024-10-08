import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ProductTransaction = sequelize.define('ProductTransaction', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  category: DataTypes.STRING,
  dateOfSale: DataTypes.DATE,
  sold: DataTypes.BOOLEAN,
  image: DataTypes.STRING,
});

export default ProductTransaction;
