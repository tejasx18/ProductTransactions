import axios from 'axios';
import ProductTransaction from '../models/ProductTransaction.js';

const THIRD_PARTY_API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

export const seedDatabase = async (req, res) => {
  try {
    //fetch
    const response = await axios.get(THIRD_PARTY_API_URL);
    const transactions = response.data;
    //delete data
    await ProductTransaction.destroy({ where: {}, truncate: true });
    //insert data from api
    await ProductTransaction.bulkCreate(transactions);   

    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding the database:', error);
    res.status(500).json({ message: 'Error seeding the database', error });
  }
};
