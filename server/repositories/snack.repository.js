import SnackOrder from "../models/snack-order.model.js";

const createSnackOrder = async (newSnackOrder) => {
  try {
    return await newSnackOrder.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSnackOrderList = async (page, size, getSnackOrderListQuery) => {
  try {
    const snackOrderList = await SnackOrder.find(getSnackOrderListQuery)
      .skip((page - 1) * size)
      .limit(size);

    return snackOrderList;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrderStatus = async (order_id, status) => {
  try {
    await SnackOrder.findOneAndUpdate({ order_id }, { status }, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { createSnackOrder, getSnackOrderList, updateOrderStatus };
