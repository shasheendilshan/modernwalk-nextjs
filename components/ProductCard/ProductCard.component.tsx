import React from "react";

import { IProduct } from "../../interfaces/products/products.interfaces";
import { formatCurrency } from "@utils/formatCurancy";
import { useGlobalContext } from "@contexts/globalStateContext";
import style from "./ProductCard.module.scss";

type Props = {
  product: IProduct;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const globalCtx = useGlobalContext();

  const cardClick = () => {
    globalCtx.setProductDetails(product);
    globalCtx.showModal(true);
  };

  return (
    <div className={style.mainContainer} onClick={cardClick}>
      <div className={style.titleContainer}>
        <h3>{product.title.substring(0, 100)}</h3>
      </div>
      <div className={style.imageContainer}>
        <img src={product.image} alt="product" />
      </div>

      <div
        className={`${
          product.category !== "men's clothing" ? "bg-secondary" : "bg-primary"
        } ${style.contentContainer}`}
      >
        <h3>{formatCurrency(product.price)}</h3>
        <div className={style.description}>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);