import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Tạo context
const CartContext = createContext();

// Provider
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartAnimation, setCartAnimation] = useState(false);

  // Load cart từ localStorage khi mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Lưu cart vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.name === item.name);
      if (exists) {
        return prev.map((p) =>
          p.name === item.name
            ? { ...p, quantity: p.quantity + (item.quantity ?? 1) }
            : p
        );
      } else {
        return [...prev, { ...item, quantity: item.quantity ?? 1 }];
      }
    });

    triggerAnimation();
    // toast.success(`Đã thêm ${item.name} vào giỏ! 🎉`);
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (itemName, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === itemName
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // Xoá sản phẩm khỏi giỏ
  const removeFromCart = (itemName) => {
    setCart((prev) => prev.filter((item) => item.name !== itemName));
    toast.success("Đã xoá sản phẩm khỏi giỏ!");
  };

  // Xoá toàn bộ giỏ
  const clearCart = () => {
    setCart([]);
    toast.success("Đã xoá toàn bộ giỏ hàng!");
  };

  // Animation khi thêm vào giỏ
  const triggerAnimation = () => {
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 500);
  };

  // Tổng số lượng sản phẩm
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        cartAnimation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook để sử dụng cart
export function useCart() {
  return useContext(CartContext);
}
