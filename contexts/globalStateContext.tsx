import React, { useState, createContext, useMemo, useContext } from "react";

import { IProduct } from "../interfaces/products/products.interfaces";

interface IGlobalStateContext {
  product: IProduct | null;
  productModalState: boolean;
  showModal: (state: boolean) => void;
  setProductDetails: (product: IProduct) => void;
}

type Props = {
  children: React.ReactNode;
};

export const GlobalStateContext = createContext({} as IGlobalStateContext);

const GlobalStateProvider = ({ children }: Props) => {
  const [productModalState, setProductModalState] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct | null>(null);

  const showModal = (state: boolean) => {
    setProductModalState(state);
  };

  const setProductDetails = (productData: IProduct) => {
    setProduct(productData);
  };

  const data = useMemo(() => {
    return {
      productModalState,
      product,
      showModal,
      setProductDetails,
    };
  }, [productModalState, product]);

  return (
    <GlobalStateContext.Provider value={data}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalStateProvider"
    );
  }

  return context;
};

export { GlobalStateProvider, useGlobalContext };
