export const ADD_TO_CART = "ADD_TO_CART";

//action ไว้เขียน logic
export const addToCart = (product = {}, cart = []) => {
  let exists = false;

  if (cart.length > 0) {
    for (const c of cart) {
      if (c.id === product.id) {
        c.qty ++;
        exists = true;
      }
    }
  }

  if (!exists) {
    cart.push(product);
  }

  const total = cart.reduce((total, product) => total + product.qty, 0);

  return {
    type: ADD_TO_CART,
    payload: {
      cart: cart,
      total: total,
    },
  };
};
