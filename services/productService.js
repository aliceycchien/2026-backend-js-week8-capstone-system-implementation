// ========================================
// 產品服務
// ========================================

const { fetchProducts } = require('../api');
const { getDiscountRate, getAllCategories, formatCurrency } = require('../utils');

/**
 * 取得所有產品
 * @returns {Promise<Object>}
 */
async function getProducts() {
  // 請實作此函式
  const products = await fetchProducts();
  return { products, count: products.length };
}

/**
 * 根據分類篩選產品
 * @param {string} category - 分類名稱
 * @returns {Promise<Array>}
 */
async function getProductsByCategory(category) {
  // 請實作此函式
  const products = await fetchProducts();
  return products.filter(p => p.category === category);
}

/**
 * 根據 ID 取得單一產品
 * @param {string} productId - 產品 ID
 * @returns {Promise<Object|null>}
 */
async function getProductById(productId) {
  // 請實作此函式
  const products = await fetchProducts();
  return products.find(p => p.id === productId) || null;
}

/**
 * 取得所有分類（不重複）
 * @returns {Promise<Array>}
 */
async function getCategories() {
  // 請實作此函式
  const products = await fetchProducts();
  return getAllCategories(products);
}

/**
 * 顯示產品列表
 * @param {Array} products - 產品陣列
 */
function displayProducts(products) {
  // 請實作此函式
  console.log('產品列表：');
  products.forEach((p, i) => {
    console.log('----------------------------------------');
    console.log(`${i + 1}. ${p.title}`);
    console.log(`   分類：${p.category}`);
    console.log(`   原價：${formatCurrency(p.origin_price)}`);
    console.log(`   售價：${formatCurrency(p.price)} (${getDiscountRate(p)})`);
  });
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  getCategories,
  displayProducts
};
