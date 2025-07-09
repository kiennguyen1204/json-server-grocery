const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const categories = ['Chair', 'Bag', 'Lamp', 'Table', 'Sofa', 'Decor'];

// Giả sử storeName là tên cửa hàng
const storeNames = ['Store A', 'Store B', 'Store C', 'Store D', 'Store E'];

// Hàm tạo sản phẩm
const generateProduct = id => {
  const oldPrice = faker.number.int({ min: 500, max: 5000 });
  const discount = faker.number.float({ min: 5, max: 50, precision: 1 });
  const newPrice = oldPrice - (oldPrice * discount) / 100;

  return {
    id: String(id),
    name: `${faker.commerce.productName()} ${faker.number.int({
      min: 1,
      max: 100,
    })}`,
    oldPrice: oldPrice,
    newPrice: newPrice,
    discount: discount,
    images: Array.from(
      { length: faker.number.int({ min: 3, max: 5 }) },
      () => `https://m.media-amazon.com/images/I/818vbkvpQ9L._AC_SL1500_.jpg`,
    ),
    description: faker.lorem.paragraph(),
    storeName: faker.helpers.arrayElement(storeNames),
    categoryId: faker.number.int({ min: 1, max: categories.length }),
    categoryName: faker.helpers.arrayElement(categories),
    condition: faker.helpers.arrayElement(['New', 'Used', 'Display']),
    priceType: faker.helpers.arrayElement(['Fixed', 'Negotiable']),
    location: faker.location.city(),
    delivery: faker.helpers.arrayElement([
      'Home delivery',
      'In-store pickup',
      'Express delivery',
    ]),
  };
};

let db = { users: [], products: [] };
try {
  const currentDb = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
  db = JSON.parse(currentDb);
} catch (error) {
  console.log(
    'Không tìm thấy db.json hoặc lỗi đọc file, tạo mới với users rỗng.',
  );
}

// Tạo 1000 sản phẩm mới
const products = Array.from({ length: 10 }, (_, index) =>
  generateProduct(index + 1),
);

db.products = products;

fs.writeFileSync(
  path.join(__dirname, 'db.json'),
  JSON.stringify(db, null, 2),
  'utf-8',
);

console.log('Đã tạo 1000 sản phẩm trong db.json, giữ nguyên mảng users.');
