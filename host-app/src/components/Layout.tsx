import { Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const { cartItems } = useApp();
  const location = useLocation();
  const cartItemsCount = cartItems.reduce(
    (acc: number, item: { quantity: number }) => acc + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            {/* Left side - Logo and Nav Links */}
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                MicroStore
              </Link>
            </div>

            {/* Right side - Cart and Profile */}
            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className={`relative group p-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/cart"
                    ? "text-indigo-600"
                    : "text-gray-400 hover:text-gray-500"
                }`}
                aria-label="Shopping cart"
              >
                <span>&#128722;</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium text-white transform scale-100 group-hover:scale-110 transition-transform duration-200">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/profile"
                    ? "text-indigo-600"
                    : "text-gray-400 hover:text-gray-500"
                }`}
                aria-label="User profile"
              >
                <span>&#128100;</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 MicroStore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
