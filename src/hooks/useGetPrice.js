import { useQuery,useCallback } from 'react-query';


const fetchStockPrice = async (symbol) => {
    console.log(symbol)
  const apiKey = "b0d2cbff6amshb5bb2776b2d2a3bp1375a0jsn40d2ae345c08";
  try {
    const response = await fetch(
      `https://real-time-finance-data.p.rapidapi.com/stock-time-series?symbol=${symbol}&period=1D&language=en`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch stock price");
    }
    const data = await response.json();
    console.log("price : ", data)
    return data;
   
  } catch (err) {
     return err.message;
  }
};

export const useGetPrice = (symbol) => {
  return useQuery({
    queryFn: async () => {
      try {
        const data = await fetchStockPrice(symbol);
        console.log(data);
        return data;
      } catch (err) {
        console.log({ err });
        throw new Error(err.response.data);
      }
    },
    queryKey:["stockPrice",symbol]
  });
};
