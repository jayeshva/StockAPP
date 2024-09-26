export const StockApiState = (Component) => {
  return (props) => {
    if (props?.error) return <div className="text-center text-red-500 p-4 bg-gray-100">Error: {props?.error}</div>;
    if (props.isLoading)
      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      );
    if (!props.data?.length) return <div>No data</div>;
    return <Component {...props} />;
  };
};
