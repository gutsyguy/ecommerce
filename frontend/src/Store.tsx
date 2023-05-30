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
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props:any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}