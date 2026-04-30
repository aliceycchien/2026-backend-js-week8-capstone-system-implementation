// ========================================
// 購物車服務
// ========================================

const { fetchCart, addToCart, updateCartItem, deleteCartItem, clearCart } = require('../api');
const { validateCartQuantity, formatCurrency } = require('../utils');

/**
 * 取得購物車
 * @returns {Promise<Object>}
 */
async function getCart() {
  // 請實作此函式
  return await fetchCart();
}

/**
 * 加入商品到購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>}
 */
async function addProductToCart(productId, quantity) {
  // 請實作此函式
  const check = validateCartQuantity(quantity);
  if (!check.isValid) return { success: false, error: check.error };
  const data = await addToCart(productId, quantity);
  return { success: true, data };
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>}
 */
async function updateProduct(cartId, quantity) {
  // 請實作此函式
  const check = validateCartQuantity(quantity);
  if (!check.isValid) return { success: false, error: check.error };
  const data = await updateCartItem(cartId, quantity);
  return { success: true, data };
}

/**
 * 移除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>}
 */
async function removeProduct(cartId) {
  // 請實作此函式
  const data = await deleteCartItem(cartId);
  return { success: true, data };
}

/**
 * 清空購物車
 * @returns {Promise<Object>}
 */
async function emptyCart() {
  // 請實作此函式
  const data = await clearCart();
  return { success: true, data };
}

/**
 * 計算購物車總金額
 * @returns {Promise<Object>}
 */
async function getCartTotal() {
  // 請實作此函式
  const data = await fetchCart();
  return { total: data.total, finalTotal: data.finalTotal, itemCount: data.carts.length };
}

/**
 * 顯示購物車內容
 * @param {Object} cart - 購物車資料
 */
function displayCart(cart) {
  // 請實作此函式
  if (!cart.carts || cart.carts.length === 0) {
    console.log('購物車是空的');
    return;
  }
  console.log('購物車內容：');
  cart.carts.forEach((item, i) => {
    console.log('----------------------------------------');
    console.log(`${i + 1}. ${item.product.title}`);
    console.log(`   數量：${item.quantity}`);
    console.log(`   單價：${formatCurrency(item.product.price)}`);
    console.log(`   小計：${formatCurrency(item.product.price * item.quantity)}`);
  });
  console.log('----------------------------------------');
  console.log(`商品總計：${formatCurrency(cart.total)}`);
  console.log(`折扣後金額：${formatCurrency(cart.finalTotal)}`);
}

module.exports = {
  getCart,
  addProductToCart,
  updateProduct,
  removeProduct,
  emptyCart,
  getCartTotal,
  displayCart
};
