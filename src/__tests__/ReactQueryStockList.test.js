import { render, screen } from "@testing-library/react";
import { useGetStocks } from "../hooks/useGetStocks";
import { MemoryRouter } from "react-router-dom";
import { ReactQueryStockList } from "../components/ReactQueryStockList";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../hooks/useGetStocks");
afterEach(() => {
  jest.clearAllMocks();
});

describe("ReactQueryStockList", () => {
  it("renders loading state correctly", () => {
    useGetStocks.mockReturnValue({ isFetching: true });
    render(<ReactQueryStockList />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-busy", "true");
  });

  it("renders error state correctly", () => {
    useGetStocks.mockReturnValue({
      isFetching: false,
      error: { message: "Error fetching data" },
    });
    render(<ReactQueryStockList />);

    expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
  });

  it("renders data correctly", () => {
    const mockData = {
      data: [
        {
          name: "Stock 1",
          symbol: "S1",
          type: "Common",
          currency: "INR",
          exchange: "NSE",
        },
      ],
    };
    useGetStocks.mockReturnValue({ isFetching: false, data: mockData});
    render(<ReactQueryStockList />,{wrapper:MemoryRouter});

    expect(screen.getByText(/stock 1/i)).toBeInTheDocument();
  });

  it("renders No data if not available", () => {
    useGetStocks.mockReturnValue({ isFetching: false, data: {data:[]} });
    render(<ReactQueryStockList />,{wrapper:MemoryRouter});

    expect(screen.getByText(/No data/i)).toBeInTheDocument();
  });
});
