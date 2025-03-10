import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Product Catalog
        </h1>
        <ProductList />
      </div>
    </div>
  );
}

export default App;
