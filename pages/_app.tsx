import "@styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { TextContextProvider } from "@contexts/testContext";
import Navbar from "@components/Navbar/Navbar.component";
import { QueryProvider } from "@contexts/react query/reactQuery";
import { UserProvider } from "@contexts/userContext";
import { CartProvider } from "@contexts/cartContext";
import { GlobalStateProvider } from "@contexts/globalStateContext";
import { Toaster } from "react-hot-toast";
import ProductModal from "@components/ProductModal/ProductModal.component";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <GlobalStateProvider>
        <CartProvider>
          <UserProvider>
            <TextContextProvider>
              <Toaster />
              <ProductModal />
              <Navbar />
              <Component {...pageProps} />;
            </TextContextProvider>
          </UserProvider>
        </CartProvider>
      </GlobalStateProvider>
    </QueryProvider>
  );
}

export default MyApp;
