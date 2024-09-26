import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StocksProvider from './hooks/StocksProvider';
import { ReactQueryStockList } from './components/ReactQueryStockList';
import { ReactQueryStockPrice } from './components/ReactQueryStockPrice';
import NotFound from './components/NotFound';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 1 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StocksProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ReactQueryStockList />} />
            <Route path="/stock/:symbol" element={<ReactQueryStockPrice />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </StocksProvider>
    </QueryClientProvider>
  );
}

export default App;
