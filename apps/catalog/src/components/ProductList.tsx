import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "../types";
import { SAMPLE_PRODUCTS } from "../constants";

interface ProductListProps {
  onAddToCart?: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
  onNavigate?: (path: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  onAddToCart,
  onNavigate,
}) => {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ].sort();

  const filteredProducts =
    !selectedCategory || selectedCategory.toLowerCase() === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4">
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                (!selectedCategory && category === "All") ||
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart || (() => {})}
            onNavigate={onNavigate || (() => {})}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
