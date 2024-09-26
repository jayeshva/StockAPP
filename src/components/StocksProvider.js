import React, { createContext,useReducer } from 'react'

export const StocksContext = createContext();

const initialState = {
  selectedStock: null,
  stockPrice:null,
  timeSeries:{}
};

const stockReducer = (state, action) => {
  switch (action.type){
    case "FETCH-STOCK-PRICE":
      return { ...state, loading: true, error: null };
    case "FETCH-STOCK-PRICE-SUCCESS":
      return { ...state, loading: false, stockPrice: action.payload};
    case "FETCH-STOCK-PRICE-FAIL":
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER_NAME':
      return { ...state, filterName: action.payload };
    default:
      return state;
  }
}




function StocksProvider({children}) {
  const [state, dispatch] = useReducer(stockReducer, initialState);

  return (
    <StocksContext.Provider value={state} >{children}</StocksContext.Provider>
  )
}

export default StocksProvider