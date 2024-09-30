import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { StockPriceApiState } from "../apistate/StockPriceApiState";
import { useNavigate } from "react-router-dom";

function SelectStocks({ selectedStock, data }) {
  const navigate = useNavigate();
  if (!data.price || !data.time_series) {
    return (
      <div>
        <p className="text-2xl font-bold text-gray-900">
          oops! No Data Available for {selectedStock.name}
        </p>
      </div>
    );
  }
  const createChartData = (timeSeries) => {
    const labels = Object.keys(timeSeries);
    const prices = labels.map((key) => timeSeries[key].price);

    return {
      labels: labels,
      datasets: [
        {
          label: "Price (₹)",
          data: prices,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-3xl font-extrabold mb-4 text-indigo-600">
        {selectedStock.name} Analysis
      </h3>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <p className="text-lg">
          <span className="font-semibold text-gray-800">Symbol:</span>{" "}
          {selectedStock?.symbol}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-800">Exchange:</span>{" "}
          {selectedStock?.exchange}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-800">MIC Code:</span>{" "}
          {selectedStock?.mic_code}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-800">Currency:</span>{" "}
          {selectedStock?.currency}
        </p>
        <p className="text-lg col-span-2">
          <span className="font-semibold text-gray-800">Type:</span>{" "}
          {selectedStock?.type}
        </p>
      </div>

      <div className="mt-4">
        {data.price ? (
          <p className="text-2xl font-bold text-gray-900">
            Current Price: <span className="text-green-500">₹{data.price}</span>
          </p>
        ) : (
          <p className="text-2xl font-bold text-gray-900">Loading...</p>
        )}
      </div>

      {Object.keys(data.time_series).length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-xl mb-4 text-gray-800">
            Stock Price Chart
          </h4>
          <Line
            data={createChartData(data?.time_series)}
            width={1000}
            height={450}
          />
        </div>
      )}

      <div className="mt-6">
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-200"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default StockPriceApiState(SelectStocks);
