const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const ids = (arr) => arr.map((p) => p.id);
const byId = (id) => products.find((p) => p.id === id);

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(ids(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(ids(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const subset = [byId(1), byId(3), byId(4)];
    expect(ids(sortProductsByPrice(subset, 'asc'))).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(ids(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const subset = [byId(3), byId(1), byId(4)];
    expect(ids(sortProductsByPrice(subset, 'desc'))).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const subset = [byId(5), byId(2), byId(6)];
    expect(ids(sortProductsByPrice(subset, 'desc'))).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const subset = [byId(1), byId(3), byId(4)];
    const snapshot = [...subset];
    sortProductsByPrice(subset, 'asc');
    expect(subset).toEqual(snapshot);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const subset = [byId(1), byId(3), byId(4)];
    const snapshot = [...subset];
    sortProductsByPrice(subset, 'desc');
    expect(subset).toEqual(snapshot);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const snapshot = [...products];
    sortProductsByPrice(products);
    expect(products).toEqual(snapshot);
  });
});