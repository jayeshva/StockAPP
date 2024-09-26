import { useGetStocks } from "../hooks/useGetStocks";
import {StocksBoard} from "./StocksBoard";

export const ReactQueryStockList = () => {
    const { data, isFetching, error } = useGetStocks();
    console.log(data,isFetching,error)
  
    return (
      <StocksBoard data={data?.data} isLoading={isFetching} error={error?.message} />
    );
  };
  