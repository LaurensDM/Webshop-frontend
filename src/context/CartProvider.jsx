import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { useSnackbarContext } from './ui/SnackbarProvider';

export const CartContext = createContext({});
export const useCartContext = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const { handleSnackbar } = useSnackbarContext();
  const storageCartProducts = localStorage.getItem('cartProducts');
  let productList = storageCartProducts ? JSON.parse(storageCartProducts) : [];
  const storage = localStorage.getItem('shoppingCart');
  const cart = storage ? new Map(JSON.parse(storage)) : new Map();
  const [dummyState, setDummyState] = useState([]);
  function resetCart() {
    cart.clear();
    productList = [];
    const number = [...dummyState];
    number.push(1);
    setDummyState([...number]);
    localStorage.removeItem('cartProducts');
    localStorage.removeItem('shoppingCart');
  }

  function addToCart(product, amount) {
    const productId = product.id;
    if (cart.has(productId)) {
      const quantity = cart.get(productId) + amount;
      if (Number(quantity) > product.stock) {
        handleSnackbar({
          content: 'There is not enough stock, delivery may be delayed',
          severity: 'info',
        });
      }
      cart.set(productId, quantity);
    } else {
      if (amount > product.stock) {
        handleSnackbar({
          content: 'There is not enough stock, delivery may be delayed',
          severity: 'info',
        });
      }
      productList.push(product);
      cart.set(productId, amount);
      localStorage.setItem('cartProducts', JSON.stringify(productList));
      const number = [...dummyState];
      number.push(1);
      setDummyState([...number]);
    }

    localStorage.setItem('shoppingCart', JSON.stringify([...cart.entries()]));
  }

  function changeQuantity(product, amount) {
    if (amount <= 0) {
      cart.delete(product.id);
      const array = productList.filter((cartProduct) => cartProduct.id !== product.id);
      productList = array;
      localStorage.setItem('cartProducts', JSON.stringify(array));
      const number = [...dummyState];
      number.push(1);
      setDummyState([...number]);
    }
    if (amount <= product.stock && !(amount <= 0)) {
      if (cart.has(product.id)) {
        cart.set(product.id, amount);
      }
    }
    if (cart.size === 0) {
      localStorage.removeItem('cartProducts');
      localStorage.removeItem('shoppingCart');
    } else {
      localStorage.setItem('shoppingCart', JSON.stringify([...cart.entries()]));
    }
  }

  function deleteFromCart(product, amount) {
    const productId = product.id;
    const quantity = cart.get(productId);
    if (quantity <= amount) {
      cart.delete(productId);
      const array = productList.filter((cartProduct) => cartProduct.id !== productId);
      productList = array;
      localStorage.setItem('cartProducts', JSON.stringify(array));
      const number = [...dummyState];
      number.push(1);
      setDummyState([...number]);
    } else {
      cart.set(productId, quantity - amount);
    }
    if (cart.size === 0) {
      localStorage.removeItem('cartProducts');
      localStorage.removeItem('shoppingCart');
    } else {
      localStorage.setItem('shoppingCart', JSON.stringify([...cart.entries()]));
    }
  }

  function getCart() {
    const newCart = [];
    cart.forEach((value, key) => {
      const newKey = productList.filter((product) => product.id === key);
      const array = [];
      array.push(newKey[0]);
      array.push(value);
      newCart.push(array);
    });
    return newCart;
  }

  const value = useMemo(() => ({
    addToCart,
    deleteFromCart,
    getCart,
    resetCart,
    changeQuantity,
    productList,
    dummyState,
  }), [dummyState]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}