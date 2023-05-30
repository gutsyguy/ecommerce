import { createContext, useReducer } from 'react';


export const Store = createContext<any>();

const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state:any, action:any) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item:any) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item:any) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    default:
      return state;
  }
}

export function StoreProvider(props:any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}