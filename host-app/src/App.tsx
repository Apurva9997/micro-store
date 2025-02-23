import { lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useApp } from "./context/AppContext";
import { Layout } from "./components/Layout";

// Lazy load components
const Catalog = lazy(() => import("catalog/ProductList"));
const ProductDetails = lazy(() => import("catalog/ProductDetails"));
const Cart = lazy(() => import("cart/Cart"));
const Profile = lazy(() => import("profile/Profile"));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
    </div>
  );
}

function App() {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useApp();
  const navigate = useNavigate();

  console.log("cartItems", cartItems);

  const handleCheckout = (items: typeof cartItems, total: number) => {
    // TODO: Implement checkout logic
    console.log("Checking out:", { items, total });
    toast.success(`Order placed successfully! Total: $${total.toFixed(2)}`);
    // Clear cart after successful checkout
    items.forEach((item) => removeFromCart(item.id));
    navigate("/");
  };

  return (
    <>
      <Layout>
        <Toaster position="top-right" />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <Catalog onAddToCart={addToCart} onNavigate={navigate} />
              }
            />
            <Route
              path="/product/:productId"
              element={
                <ProductDetails onAddToCart={addToCart} onNavigate={navigate} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  onUpdateQuantity={(id, change) => {
                    const item = cartItems.find((item) => item.id === id);
                    if (item) {
                      const newQuantity = Math.max(0, item.quantity + change);
                      updateQuantity(id, newQuantity);
                    }
                  }}
                  onRemoveItem={removeFromCart}
                  onCheckout={handleCheckout}
                  onNavigateToHome={() => navigate("/")}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile onNavigate={navigate} />}
            />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
