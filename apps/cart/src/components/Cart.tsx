import { useState } from "react";
import styles from "./Cart.module.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (items: CartItem[], total: number) => void;
  onNavigateToHome: () => void;
}

const Cart = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onNavigateToHome,
}: CartProps) => {
  console.log("items", items);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    onCheckout(items, total);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
        <div className={styles["cart-empty"]}>
          <div className={styles["cart-empty-icon"]}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart and they will appear here</p>
          <button onClick={onNavigateToHome}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-gray-50 py-8">
      <div className={styles["cart-container"]}>
        <div className={styles["cart-items"]}>
          <h2>Shopping Cart ({items.length} items)</h2>
          {items.map((item: CartItem) => (
            <div key={item.id} className={styles["cart-item"]}>
              <div className={styles["item-image"]}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles["item-details"]}>
                <h3>{item.name}</h3>
                <div className={styles["item-price"]}>
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <div className={styles["quantity-controls"]}>
                <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
              </div>
              <div className={styles["item-total"]}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => onRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>

        <div className={styles["cart-summary"]}>
          <h3>Order Summary</h3>
          <div className={styles["summary-row"]}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles["summary-row"]}>
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className={`${styles["summary-row"]} ${styles.total}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className={styles["checkout-button"]}
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
