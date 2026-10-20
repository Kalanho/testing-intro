const filterByCategory = (products, category) => {
  if (!category || category === 'all') {
    return products.slice();
  }
  return products.filter((product) => product.category === category);
};

const getAvailableProducts = (products) => {
  return products.filter((product) => product.stock > 0);
};

const getProductById = (products, id) => {
  if (typeof id !== 'number' || Number.isNaN(id)) {
    return null;
  }
  const product = products.find((item) => item.id === id);
  return product || null;
};

const searchProducts = (products, query) => {
  const normalized = typeof query === 'string' ? query.trim().toLowerCase() : '';
  if (!normalized) {
    return products.slice();
  }
  return products.filter((product) =>
    product.name.toLowerCase().includes(normalized)
  );
};

const sortProductsByPrice = (products, direction = 'asc') => {
  const sorted = products.slice();
  if (direction === 'desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else {
    sorted.sort((a, b) => a.price - b.price);
  }
  return sorted;
};

module.exports = {
  filterByCategory,
  getAvailableProducts,
  getProductById,
  searchProducts,
  sortProductsByPrice,
};