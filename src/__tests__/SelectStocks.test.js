import { render, screen } from '@testing-library/react';
import SelectStocks from '../components/SelectStocks';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

const mockData = {
  price: 100,
  time_series: {
    '2023-09-01': { price: 100 },
    '2023-09-02': { price: 105 },
  },
};

const mockSelectedStock = {
  name: 'Stock 1',
  symbol: 'S1',
  exchange: 'NSE',
  mic_code: 'XNSE',
  currency: 'INR',
  type: 'Common',
};
beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

describe('SelectStocks', () => {
  it('renders no data message when no price or time_series is available', () => {
    render(<SelectStocks selectedStock={mockSelectedStock} data={{}} />,{wrapper:MemoryRouter});

    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('renders stock details and price chart correctly', () => {
    render(<SelectStocks selectedStock={mockSelectedStock} data={mockData} />, {wrapper:MemoryRouter});

    expect(screen.getByText(/stock 1 analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/₹100/i)).toBeInTheDocument();
  }); 
});
