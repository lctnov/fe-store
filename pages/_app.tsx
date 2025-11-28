import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/hooks/useCart";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
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
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff'
            }
          }
        }}
      />
    </CartProvider>
  );
}
