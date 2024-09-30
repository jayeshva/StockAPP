import { useQuery } from 'react-query';


const fetchStocks = async () => {
    const apiKey = '96e5e010e3214e76b10f05fe5b052342'; 
    const country = 'India';
    const exchange = 'NSE';
  
    try {
      const response = await fetch(
        `https://api.twelvedata.com/stocks?country=${country}&exchange=${exchange}&apikey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return err.response.data;
    }
};

export const useGetStocks = () => {
    return useQuery({
      queryFn: async () => {
        try {
          console.log("qwe")
          const data = await fetchStocks();
          console.log(data)
          return data;
        } catch (err) {
          console.log({ err });
          throw new Error(err.response.data);
        }
      },
      queryKey:["stockList"]      
    });
};