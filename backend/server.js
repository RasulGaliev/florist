require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // Импорт роутов
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // для парсинга JSON-тела запросов

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flowerShop')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Подключение роутов
app.use('/api/products', productRoutes); // Это должно быть ДО обработчика ошибок

// Обработчик 404 (должен быть последним!)
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Порт сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
