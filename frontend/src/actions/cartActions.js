import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      image: data.image,
      type: data.type,
      make: data.make,
      model: data.model,
      year: data.year,
      stockQty: data.stockQty,
      price: data.price,
      product: data._id,
      qty,
    },
  });
};
