const { appDataSource } = require("./appDataSource");
const { paymentMethodEnums } = require("./QueryBuilder");

const getOrderUserInfo = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      u.id,
      u.nickname,
      u.email
    FROM users AS u
    WHERE u.id = ?
    `,
    [userId]
  );
};

const getUserPoint = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      u.point
    FROM users AS u
    WHERE u.id = ?
    `,
    [userId]
  );
};

const getOrderCartInfo = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      c.id,
      p.id AS productId,
      c.quantity,
      p.name AS productName,
      p.image_url AS productImage,
      ((p.price - p.discount) * c.quantity) AS productPriceAmount,
      p.shipping_fee AS shippingFeeAmount
    FROM carts c
    INNER JOIN products p ON p.id = c.product_id
    INNER JOIN users u ON u.id = c.user_id
    WHERE u.id = ? AND c.is_selected = 1
    `,
    [userId]
  );
};

const postOrderDeliveryInfo = async (
  userId,
  deliveryName,
  receiverName,
  phoneNumber,
  address,
  detailAddress,
  zipCode,
  message
) => {
  return await appDataSource.query(
    `
    INSERT INTO deliveries (
      user_id,
      name,
      receiver,
      phone_number,
      address,
      detail_address,
      zip_code,
      message  
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
      `,
    [
      userId,
      deliveryName,
      receiverName,
      phoneNumber,
      address,
      detailAddress,
      zipCode,
      message,
    ]
  );
};

const getOrderDeliveryInfo = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
      d.id AS deliveryId,
      d.name AS deliveryName,
      d.receiver AS deliveryReceiver,
      d.phone_number AS deliveryPhoneNumber,
      d.address AS deliveryAddress,
      d.detail_address AS deliveryDetailAddress,
      d.zip_code AS deliveryZipCode,
      d.message AS deliveryMessage
    FROM deliveries AS d
    WHERE d.user_id = ?
    `,
    [userId]
  );
};

const checkTotalPrice = async (cartInfo) => {
  const cartId = cartInfo.map((c) => {
    return c.id;
  });

  return await appDataSource.query(
    `
    SELECT
      ((p.price-p.discount)* c.quantity)+ p.shipping_fee AS totalPrice
    FROM products AS p
    INNER JOIN carts c ON c.product_id = p.id
    WHERE c.id IN (?)`,
    [cartId]
  );
};

const createPaymentByUser = async (
  userId,
  cartInfo,
  orderNumber,
  totalProductPrice,
  totalDeliveryPrice,
  deliveryName,
  deliveryReceiver,
  deliveryPhoneNumber,
  deliveryAddress,
  deliveryDetailAddress,
  deliveryMessage,
  paymentType
) => {
  console.log(paymentType);
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    const postDeliveryInfo = await queryRunner.query(
      `
      INSERT INTO deliveries (
        user_id,  
        name,
        receiver,
        phone_number,
        address,
        detail_address,
        message
        )
      VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
        )
        `,
      [
        userId,
        deliveryName,
        deliveryReceiver,
        deliveryPhoneNumber,
        deliveryAddress,
        deliveryDetailAddress,
        deliveryMessage,
      ]
    );

    deliveryId = postDeliveryInfo.insertId;

    const createOrders = await queryRunner.query(
      `
      INSERT INTO orders (
        order_number,
        total_price,
        delivery_price,
        delivery_id,
        user_id,
        payment_method_id
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
      `,
      [
        orderNumber,
        totalProductPrice,
        totalDeliveryPrice,
        deliveryId,
        userId,
        paymentMethodEnums[paymentType],
      ]
    );

    const orderId = createOrders.insertId;

    const cartValue = cartInfo.map((c) => {
      return [c.productId, c.quantity, orderId];
    });

    const createOrderItems = await queryRunner.query(
      `
      INSERT INTO order_items (
        product_id,
        quantity,
        order_id
      ) VALUES (?)
      `,
      cartValue
    );

    const cartId = cartInfo.map((c) => {
      return c.id;
    });

    await queryRunner.query(
      `
      DELETE FROM carts
      WHERE id IN (?)
      `,
      [cartId]
    );

    await queryRunner.query(
      `
      UPDATE users
      SET point = point - ?
      WHERE id = ?
      `,
      [totalProductPrice + totalDeliveryPrice, userId]
    );

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getOrderUserInfo,
  getOrderCartInfo,
  postOrderDeliveryInfo,
  getOrderDeliveryInfo,
  createPaymentByUser,
  getUserPoint,
  checkTotalPrice,
};
