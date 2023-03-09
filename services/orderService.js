const orderDao = require("../models/orderDao");
const uuid = require("uuid");

const getOrderUserInfo = async (userId) => {
  return await orderDao.getOrderUserInfo(userId);
};

const getOrderCartInfo = async (userId) => {
  return await orderDao.getOrderCartInfo(userId);
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
  return await orderDao.postOrderDeliveryInfo(
    userId,
    deliveryName,
    receiverName,
    phoneNumber,
    address,
    detailAddress,
    zipCode,
    message
  );
};

const getOrderDeliveryInfo = async (userId) => {
  return await orderDao.getOrderDeliveryInfo(userId);
};

const createPaymentByUser = async (
  userId,
  cartInfo,
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
  const [userPoint] = await orderDao.getUserPoint(userId);

  if (totalProductPrice > userPoint.point) {
    const error = new Error("TOTAL PRICE EXCEEDED USER POINT");
    error.statusCode = 400;
    throw error;
  }

  const totalPriceList = await orderDao.checkTotalPrice(
    cartInfo,
    totalProductPrice,
    totalDeliveryPrice
  );

  const checkTotalPrice = totalPriceList
    .map((el) => {
      return parseInt(el.totalPrice);
    })
    .reduce((totalAmount, currentValue) => {
      return totalAmount + currentValue;
    });

  if (checkTotalPrice !== totalProductPrice + totalDeliveryPrice) {
    const error = new Error("TOTAL_PRICE_NOT_MATCHED");
    error.statusCode = 400;
    throw error;
  }

  orderNumber = uuid.v1();

  await orderDao.createPaymentByUser(
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
    paymentType.toUpperCase()
  );
};

module.exports = {
  getOrderUserInfo,
  getOrderCartInfo,
  postOrderDeliveryInfo,
  getOrderDeliveryInfo,
  createPaymentByUser,
};
