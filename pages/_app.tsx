import "@/styles/globals.css";
import { CartProvider } from "@/hooks/useCart";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '14px'
          }
        }}
      />
    </CartProvider>
  );
}
