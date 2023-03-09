const request = require("supertest");

const { createApp } = require("../app");
const { appDataSource } = require("../models/appDataSource");

const userFixture = require("./fixtures/user-fixtures");
const productFixture = require("./fixtures/product-fixtures");
const testUserData = require("./data/users");
const testProductData = require("./data/products");

describe("PRODUCT DETAIL", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await userFixture.createUsers(testUserData.users);
    await productFixture.createCategories(testProductData.categories);
    await productFixture.createProducts(testProductData.products);
  });

  afterAll(async () => {
    await appDataSource.query(`SET foreign_key_checks = 0`);
    await appDataSource.query(`TRUNCATE carts`);
    await appDataSource.query(`TRUNCATE products`);
    await appDataSource.query(`TRUNCATE categories`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`ALTER TABLE carts AUTO_INCREMENT = 1`);
    await appDataSource.query(`SET foreign_key_checks = 1`);
    await appDataSource.destroy();
  });

  const accesstoken = process.env.TEST_ACCESS_TOKEN;

  test("FAILED: GET CART - LOGIN REQUIRED", async () => {
    const res = await request(app).get("/carts");

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("TOKEN IS NOT EXIST!");
  });

  test("SUCCESS: GET CART - BEFORE CREATE ITEM", async () => {
    const res = await request(app)
      .get("/carts")
      .set("Authorization", `${accesstoken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual([]);
  });

  test("SUCCESS: CREATE CART ITEM", async () => {
    const res = await request(app)
      .post("/carts")
      .set("Authorization", `${accesstoken}`)
      .send({ data: { productId: 1, quantity: 1 } });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ message: "success" });
  });

  test("SUCCESS: GET CART - AFTER CREATE ITEM", async () => {
    const res = await request(app)
      .get("/carts")
      .set("Authorization", `${accesstoken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(getCartItem);
  });

  test("SUCCESS: UPDATE CART ITEM - FROM DETAIL PAGE", async () => {
    const res = await request(app)
      .post("/carts")
      .set("Authorization", `${accesstoken}`)
      .send({ data: { productId: 1, quantity: 2 } });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ message: "success" });
  });

  test("SUCCESS: GET CART - AFTER UPDATE ITEM - FROM DETAIL PAGE", async () => {
    const res = await request(app)
      .get("/carts")
      .set("Authorization", `${accesstoken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(getCartItemAfterQuantityUpdate);
  });

  test("SUCCESS: UPDATE CART ITEM - FROM CART", async () => {
    const res = await request(app)
      .post("/carts?fromCart")
      .set("Authorization", `${accesstoken}`)
      .send({ data: { productId: 1, quantity: 1 } });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ message: "success" });
  });

  test("SUCCESS: GET CART - AFTER UPDATE ITEM - FROM CART", async () => {
    const res = await request(app)
      .get("/carts")
      .set("Authorization", `${accesstoken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(getCartItem);
  });

  test("SUCCESS: CREATE CART ITEM - ADD ANOTHER ITEM", async () => {
    const res = await request(app)
      .post("/carts")
      .set("Authorization", `${accesstoken}`)
      .send({ data: { productId: 2, quantity: 1 } });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ message: "success" });
  });

  test("SUCCESS: GET CART - AFTER ADD ANOTHER ITEM", async () => {
    const res = await request(app)
      .get("/carts")
      .set("Authorization", `${accesstoken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(getCartItemAfterCreateAnother);
  });

  test("FAILED: PATCH CART ITEM - WIHTOUT SELECTION", async () => {
    const res = await request(app)
      .patch("/carts")
      .set("Authorization", `${accesstoken}`)
      .send(itemsWithoutSelection);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("SELECT ITEM TO ORDER");
  });

  test("SUCCESS: PATCH CART ITEM IS_SELECTED TO ORDER", async () => {
    const res = await request(app)
      .patch("/carts")
      .set("Authorization", `${accesstoken}`)
      .send(selectedItems);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("success");
  });

  test("SUCCESS: GET CART - AFTER PATCH IS_SELECTED TO ORDER", async () => {
    const res = await request(app)
      .get("/carts")
      .set("Authorization", `${accesstoken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(getCartItemAfterPatchIsSelected);
  });

  test("FAILED: DELETE CART ITEM -  WIHTOUT SELECTION", async () => {
    const res = await request(app)
      .delete("/carts")
      .set("Authorization", `${accesstoken}`)
      .send(itemsWithoutSelection);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("SELECT ITEM TO DELETE");
  });

  test("SUCCESS: DELETE CART ITEM", async () => {
    const res = await request(app)
      .delete("/carts")
      .set("Authorization", `${accesstoken}`)
      .send(selectedItems);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(getCartItemAfterDelete);
  });
});

const getCartItem = [
  {
    cartId: 1,
    discount: "50000.00",
    imageUrl: "productBedImage.url",
    isSelected: 1,
    name: "폭신 헤드 침대",
    price: "200000.00",
    productId: 1,
    quantity: 1,
    shippingFee: "3000.00",
  },
];

const getCartItemAfterQuantityUpdate = [
  {
    cartId: 1,
    discount: "50000.00",
    imageUrl: "productBedImage.url",
    isSelected: 1,
    name: "폭신 헤드 침대",
    price: "200000.00",
    productId: 1,
    quantity: 3,
    shippingFee: "3000.00",
  },
];

const getCartItemAfterCreateAnother = [
  {
    cartId: 4,
    discount: "2000.00",
    imageUrl: "productTableImage.url",
    isSelected: 1,
    name: "모던 블랙 테이블",
    price: "30000.00",
    productId: 2,
    quantity: 1,
    shippingFee: "0.00",
  },
  {
    cartId: 1,
    discount: "50000.00",
    imageUrl: "productBedImage.url",
    isSelected: 1,
    name: "폭신 헤드 침대",
    price: "200000.00",
    productId: 1,
    quantity: 1,
    shippingFee: "3000.00",
  },
];

const getCartItemAfterPatchIsSelected = [
  {
    cartId: 4,
    discount: "2000.00",
    imageUrl: "productTableImage.url",
    isSelected: 1,
    name: "모던 블랙 테이블",
    price: "30000.00",
    productId: 2,
    quantity: 1,
    shippingFee: "0.00",
  },
  {
    cartId: 1,
    discount: "50000.00",
    imageUrl: "productBedImage.url",
    isSelected: 0,
    name: "폭신 헤드 침대",
    price: "200000.00",
    productId: 1,
    quantity: 1,
    shippingFee: "3000.00",
  },
];

const getCartItemAfterDelete = [
  {
    cartId: 1,
    discount: "50000.00",
    imageUrl: "productBedImage.url",
    isSelected: 0,
    name: "폭신 헤드 침대",
    price: "200000.00",
    productId: 1,
    quantity: 1,
    shippingFee: "3000.00",
  },
];

const itemsWithoutSelection = {
  data: [
    {
      cartId: 1,
      isSelected: false,
    },
    {
      cartId: 4,
      isSelected: false,
    },
  ],
};

const selectedItems = {
  data: [
    {
      cartId: 1,
      isSelected: false,
    },
    {
      cartId: 4,
      isSelected: true,
    },
  ],
};
