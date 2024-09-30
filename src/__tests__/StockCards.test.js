import { render, screen, fireEvent } from '@testing-library/react';
import StockCards from '../components/StockCards';
import { useNavigate } from 'react-router-dom';

const mockStock = {
  name: 'Stock 1',
  symbol: 'S1',
  type: 'Common',
  currency: 'INR',
  exchange: 'NSE',
  mic_code: 'XNSE',
};

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

describe('StockCards', () => {
  it('renders stock card correctly', () => {
    render(<StockCards stock={mockStock} handleStockClick={() => {}} />);

    expect(screen.getByText(/stock 1/i)).toBeInTheDocument();
  });

  it('handles click event correctly', () => {
    const mockHandleClick = jest.fn();
    useNavigate.mockImplementation(() => mockHandleClick);

    render(<StockCards stock={mockStock} handleStockClick={mockHandleClick} />);

    fireEvent.click(screen.getByText(/stock 1/i));
    expect(mockHandleClick).toHaveBeenCalledWith(mockStock);
  });
});
 