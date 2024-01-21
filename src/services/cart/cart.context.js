import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);

  const saveCart = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (err) {
      console.log("error saving: ", err);
    }
  };

  const loadCart = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value !== null) {
        const userCart = JSON.parse(value);
        setCart(userCart);
        userCart.forEach((item) => {
          setRestaurant(item.restaurant);
        });
      }
    } catch (err) {
      console.log("error loading: ", err);
    }
  };

  const add = (item, rst) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      console.log("Adding this restaurant: ", item);
      setRestaurant(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
    saveCart([], user.uid);
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && cart.length) {
      saveCart(cart, user.uid);
    }
  }, [cart, user]);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ addToCart: add, clearCart: clear, restaurant, cart, sum }}
    >
      {children}
    </CartContext.Provider>
  );
};
