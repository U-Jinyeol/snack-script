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
    const totalCount = await SnackOrder.countDocuments(getSnackOrderListQuery);

    const snackOrderList = await SnackOrder.find(getSnackOrderListQuery)
      .sort({ created_at: -1 })
      .skip((page - 1) * size)
      .limit(size);

    return { snackOrderList, totalCount };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrderStatus = async (order_id, updateQuery) => {
  try {
    return await SnackOrder.findOneAndUpdate({ order_id }, updateQuery, {
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const findSnackOrderById = async (order_id) => {
  try {
    return await SnackOrder.findOne({ order_id });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createSnackOrder,
  getSnackOrderList,
  updateOrderStatus,
  findSnackOrderById,
};
