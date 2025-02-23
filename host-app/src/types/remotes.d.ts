declare module "cart/Cart" {
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }

  const Cart: React.ComponentType<{
    items: CartItem[];
    onUpdateQuantity: (id: string, change: number) => void;
    onRemoveItem: (id: string) => void;
    onCheckout: (items: CartItem[], total: number) => void;
    onNavigateToHome: () => void;
  }>;
  export default Cart;
}

declare module "cart/CartWidget" {
  const CartWidget: React.ComponentType<{
    itemCount: number;
    onNavigateToCart: () => void;
  }>;
  export default CartWidget;
}

declare module "catalog/ProductList" {
  const ProductList: React.ComponentType<{
    onAddToCart?: (product: {
      id: string;
      name: string;
      price: number;
      image: string;
    }) => void;
    onNavigate?: (path: string) => void;
  }>;
  export default ProductList;
}

declare module "catalog/ProductDetails" {
  const ProductDetails: React.ComponentType<{
    onAddToCart?: (product: {
      id: string;
      name: string;
      price: number;
      image: string;
    }) => void;
    onNavigate?: (path: string) => void;
  }>;
  export default ProductDetails;
}

declare module "profile/Profile" {
  const Profile: React.ComponentType<{
    onLogin?: (userData: { name: string; email: string }) => void;
    onLogout?: () => void;
    onNavigate?: (path: string) => void;
  }>;
  export default Profile;
}

declare module "profile/ProfileWidget" {
  const ProfileWidget: React.ComponentType<{
    onNavigateToProfile: () => void;
  }>;
  export default ProfileWidget;
}
