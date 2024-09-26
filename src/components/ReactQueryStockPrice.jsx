import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetPrice } from "../hooks/useGetPrice";
import SelectStocks from "./SelectStocks";

export const ReactQueryStockPrice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // if(!location.state?.stock){
  //  return navigate('/');
  // }
   const stock = location.state?.stock;
    const { data, isFetching, error } = useGetPrice(stock.symbol);
  
    return (
      <SelectStocks data={data?.data} isLoading={isFetching} error={error?.message} selectedStock={stock} />
    );
  };
  