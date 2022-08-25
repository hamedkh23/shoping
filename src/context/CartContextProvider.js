import React, { createContext, useReducer } from "react";

const initialState = {
  selectedItem: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const sumItems = (items) => {
  const itemsCounter = items.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const total = items
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemsCounter, total };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItem.find((item) => item.id === action.payload.id)) {
        state.selectedItem.push({
          ...action.payload,
          quantity: 1,
        });
      }
      return {
        ...state,
        selectedItem: [...state.selectedItem],
        ...sumItems(state.selectedItem),
        checkout: false,
      };
    case "REMOVE_ITEM":
      const newSelectesItems = state.selectedItem.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItem: [...newSelectesItems],
        ...sumItems(newSelectesItems),
      };
    case "INCREASE":
      const indexI = state.selectedItem.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItem[indexI].quantity++;
      return {
        ...state,
        ...sumItems(state.selectedItem),
      };
    case "DECREASE":
      const indexD = state.selectedItem.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItem[indexD].quantity--;
      return {
        ...state,
        ...sumItems(state.selectedItem),
      };
    case "CHECKOUT":
      return {
        selectedItem: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };
    case "CLEAR":
      return {
        selectedItem: [],
        itemsCounter: 0,
        total: 0,
        checkout: false,
      };
    default:
      return state;
  }
};

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
