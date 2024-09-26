import React, { useState, useMemo } from "react";
import StockCards from "./StockCards";
import { StockApiState } from "../apistate/StockApiState";
import { useNavigate } from "react-router-dom";

const StocksBoardMain = (props) => {
  const [filterName, setFilterName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 9; 
  const navigate = useNavigate();

  const filteredStocks = useMemo(() => {
    return props.data.filter(
      (stock) =>
        stock.name.toLowerCase().includes(filterName.toLowerCase()) &&
        !stock.symbol.includes(".")
    );
  }, [filterName, props.data]);

  const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);

  const currentStocks = useMemo(() => {
    const startIndex = (currentPage - 1) * stocksPerPage;
    return filteredStocks.slice(startIndex, startIndex + stocksPerPage);
  }, [currentPage, filteredStocks]);

  const handleStockClick = (stock) => {
    navigate(`/stock/${stock.symbol}`, { state: { stock } });
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'next') {
        return Math.min(prev + 1, totalPages);
      } else {
        return Math.max(prev - 1, 1);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Indian Stock Exchange
        </h2>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Filter by Stock Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentStocks.map((stock, index) => (
            <StockCards
              key={index}
              stock={stock}
              handleStockClick={handleStockClick}
              className="transition-transform transform hover:scale-105"
            />
          ))}
        </div>

        <div className="text-center mt-4 text-gray-600">
          Showing {currentStocks.length} of {filteredStocks.length}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-center items-center p-4 border-t border-gray-200">
          <button
            className={`mx-1 px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-400 transition duration-200"}`}
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`mx-1 px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-400 transition duration-200"}`}
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export const StocksBoard = StockApiState(StocksBoardMain);
