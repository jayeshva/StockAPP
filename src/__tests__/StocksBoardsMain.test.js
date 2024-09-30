import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import {StocksBoard} from '../components/StocksBoard';

const mockData = [
  { name: 'Stock 1', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 2', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 3', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 4', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 5', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 6', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 7', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 8', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 9', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 10', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 11', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 12', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 13', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 14', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 15', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 16', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 17', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 18', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 19', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 20', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 21', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 22', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 23', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 24', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 25', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 26', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 27', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 28', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 29', symbol: 'S1', type: 'Common', currency: 'INR', exchange: 'NSE' },
  { name: 'Stock 30', symbol: 'S2', type: 'Common', currency: 'INR', exchange: 'NSE' },
];

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

describe('StocksBoardMain', () => {
  it('renders correctly and filters stocks', () => {
    render(<StocksBoard  isLoading = {false} data={mockData} />, { wrapper: MemoryRouter });

    const input = screen.getByPlaceholderText(/filter by stock name/i);
    fireEvent.change(input, { target: { value: 'stock 12' } });

    expect(screen.getByText(/stock 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/stock 2/i)).not.toBeInTheDocument();
  });

  it('handles pagination correctly', () => {
    render(<StocksBoard  isLoading = {false} data={mockData} />, { wrapper: MemoryRouter });
    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);

    expect(screen.getByText(/stock 16/i)).toBeInTheDocument();
  });

  it('navigates to stock details on stock click', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    render(<StocksBoard isLoading={false} data={mockData} />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText(/stock 1/i));
    expect(mockNavigate).toHaveBeenCalledWith('/stock/S1', { state: { stock: mockData[0] } });
  });
});
