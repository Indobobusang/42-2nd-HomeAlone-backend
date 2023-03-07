const orderService = require("../services/orderService");
const { catchAsync } = require("../utils/errorHandler");

const getOrderUserInfo = catchAsync(async (req, res) => {
  const userId = req.user;

  const getUserInfo = await orderService.getOrderUserInfo(userId);
  res.status(200).json({ data: getUserInfo });
});

const getOrderCartInfo = catchAsync(async (req, res) => {
  const userId = req.user;

  const getCartInfo = await orderService.getOrderCartInfo(userId);

  const getCartId = getCartInfo.map((c) => {
    return [c.id];
  });
  res.status(200).json({ data: getCartInfo });
});

const postOrderDeliveryInfo = catchAsync(async (req, res) => {
  const userId = req.user;
  const {
    deliveryName,
    receiverName,
    phoneNumber,
    address,
    detailAddress,
    zipCode,
    message,
  } = req.body;

  if (
    !deliveryName ||
    !receiverName ||
    !phoneNumber ||
    !address ||
    !detailAddress
  ) {
    const error = new Error("POST_DELIVERY_INFO KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  const postDeliveryInfo = await orderService.postOrderDeliveryInfo(
    userId,
    deliveryName,
    receiverName,
    phoneNumber,
    address,
    detailAddress,
    zipCode,
    message
  );
  res.status(200).json({ message: "배송지가 추가되었습니다." });
});

const getOrderDeliveryInfo = catchAsync(async (req, res) => {
  const userId = req.user;

  const getDeliveryInfo = await orderService.getOrderDeliveryInfo(userId);
  res.status(200).json({ data: getDeliveryInfo });
});

const createPaymentByUser = catchAsync(async (req, res) => {
  const userId = req.user;
  const {
    totalProductPrice,
    totalDeliveryPrice,
    deliveryName,
    deliveryReceiver,
    deliveryPhoneNumber,
    deliveryAddress,
    deliveryDetailAddress,
    deliveryMessage,
    paymentType,
  } = req.body.payments;

  if (
    !totalProductPrice ||
    !totalDeliveryPrice ||
    !deliveryName ||
    !deliveryReceiver ||
    !deliveryPhoneNumber ||
    !deliveryAddress ||
    !deliveryDetailAddress ||
    !paymentType
  ) {
    const error = new Error("CREATE_PAYMENT_KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  const cartInfo = await orderService.getOrderCartInfo(userId);

  if (cartInfo.length === 0) {
    const error = new Error("CART_ITEMS_DOES_NOT_EXIST");
    error.statusCode = 400;
    throw error;
  }

  const createPayment = await orderService.createPaymentByUser(
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
  );
  res.status(200).json({ message: "결제가 완료됐습니다." });
});

module.exports = {
  getOrderUserInfo,
  getOrderCartInfo,
  postOrderDeliveryInfo,
  getOrderDeliveryInfo,
  createPaymentByUser,
};
