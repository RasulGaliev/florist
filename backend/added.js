const mongoose = require('mongoose');
const Product = require('./models/Product'); // Убедитесь в правильности пути

async function seedDatabase() {
    try {
        // Подключение к MongoDB (без устаревших опций)
        await mongoose.connect('mongodb://localhost:27017/flowerShop');
        console.log('✅ Подключено к MongoDB');

        // Очистка коллекции
        console.log('🧹 Очищаем коллекцию...');
        await Product.deleteMany({});

        // Добавляем тестовые данные
        console.log('🌱 Добавляем данные...');
        await Product.insertMany([
            {
                productType: 'flower',
                name: 'Розы красные',
                price: 1500,
                details: { color: 'красный', stemLength: 50 }
            },
            {
                productType: 'flower',
                name: 'Розы белые',
                price: 1500,
                details: { color: 'белый', stemLength: 50 }
            },
            {
                productType: 'flower',
                name: 'Тюльпаны красные',
                price: 1500,
                details: { color: 'белый', stemLength: 50 }
            },
            {
                productType: 'card',
                name: 'Открытка "С Днем Рождения"',
                price: 200,
                details: { size: '10x15cm', design: 'цветы' }
            }
        ]);

        console.log('✅ Данные успешно добавлены!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Ошибка:', err);
        process.exit(1);
    }
}

// Проверяем, был ли файл запущен напрямую
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;