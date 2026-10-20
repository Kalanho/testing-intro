const products = require('./data/products');

function findItem(cart, productId) {
  return cart.find((item) => item.id === productId);
}

function addToCart(cart, product, quantity = 1) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }
  if (!product || product.stock === 0) {
    throw new RangeError('Товара нет в наличии');
  }

  const existingItem = findItem(cart, product.id);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock) {
      throw new RangeError('Недостаточно товара на складе');
    }
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }

  if (quantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }
  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, newQuantity) {
  const item = findItem(cart, productId);
  if (!item) {
    return cart;
  }

  if (newQuantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }
  const product = products.find((p) => p.id === productId);
  if (product && newQuantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  return cart.map((cartItem) =>
    cartItem.id === productId ? { ...cartItem, quantity: newQuantity } : cartItem
  );
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;

  if (promoCode && promoCode.trim().toUpperCase() === 'SAVE10') {
    if (subtotal >= 20000) {
      discount = Math.round(subtotal * 0.1);
    }
  }

  let delivery = 0;
  const priceAfterDiscount = subtotal - discount;

  if (cart.length > 0 && priceAfterDiscount < 50000) {
    delivery = 30000;
  }

  const total = priceAfterDiscount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;