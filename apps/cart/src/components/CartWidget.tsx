import React from "react";

interface CartWidgetProps {
  itemCount: number;
  onNavigateToCart: () => void;
}

const CartWidget: React.FC<CartWidgetProps> = ({
  itemCount,
  onNavigateToCart,
}) => {
  return (
    <div className="cart-widget" onClick={onNavigateToCart}>
      <div className="cart-icon">🛒</div>
      {itemCount > 0 && <div className="cart-badge">{itemCount}</div>}
    </div>
  );
};

export default CartWidget;
