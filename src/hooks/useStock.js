import {useContext} from 'react'
import { StocksContext } from './StocksProvider';

function useStock() {
    const context = useContext(StocksContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
}

export default useStock