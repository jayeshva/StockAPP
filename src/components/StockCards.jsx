import React from "react";


const StockCards = ({ stock, handleStockClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-sm hover:cursor-pointer"  onClick={() => handleStockClick(stock)}>
      <div className="bg-gradient-to-r from-customSlate-light to-Emerald p-4 rounded-t-lg">
        <div className="font-bold text-xl mb-1 text-Zinc">{stock.name}</div>
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm bg-Indigo px-2 py-1 rounded-full">{stock.type}</span>
          <span className="text-white text-sm">{stock.currency}</span>
        </div>
      </div>
      
      <div className="px-6 py-4">
        <p className="text-customGray-DEFAULT text-sm">
          <span className="font-semibold">Symbol:</span> {stock.symbol}
        </p>
        <p className="text-customGray-DEFAULT text-sm">
          <span className="font-semibold">Exchange:</span> {stock.exchange}
        </p>
        <p className="text-customGray-DEFAULT text-sm">
          <span className="font-semibold">MIC Code:</span> {stock.mic_code}
        </p>
      </div>
    </div>
  );
};

export default StockCards;
