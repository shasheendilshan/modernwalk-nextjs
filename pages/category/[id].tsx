import React from "react";
import Skeleton from "react-loading-skeleton";
import { BallBeat } from "react-pure-loaders";
import { useQuery } from "react-query";
import "react-loading-skeleton/dist/skeleton.css";

import { getSpecificCategory } from "@services/products.services";
import {
  IProduct,
  productCategory,
} from "../../interfaces/products/products.interfaces";
import ProductCard from "@components/ProductCard/ProductCard.component";
import style from "./category.module.scss";
import { useRouter } from "next/router";

type Props = {
  category: productCategory;
  title: string;
};

const Category: React.FC<Props> = ({ category, title }) => {
  const router = useRouter();
  const path = router.asPath.split("/")[router.asPath.split("/").length - 1];

  const pathTransform = (path: string) => {
    return path.replace("-", " ");
  };

  const getProducts = () => {
    return getSpecificCategory(pathTransform(path));
  };

  const { data, isLoading } = useQuery(
    ["getProductsCategory", path],
    getProducts
  );
  console.log("data", data);
  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.heading}>
          <h2>{pathTransform(path)}</h2>
        </div>
        <div className={style.ballBeatContainer}>
          <BallBeat
            color={title === "Men's Clothing" ? "#2BD9AF" : "#FF5E84"}
            loading
          />
        </div>

        <div className={style.skeletonContainer}>
          <div className={style.skeletonInnerContainer}>
            <div className={style.skeletonBox}>
              <Skeleton className={style.skeleton} />
            </div>
            <div className={style.skeletonBox}>
              <Skeleton className={style.skeleton} />
            </div>
            <div className={style.skeletonBox}>
              <Skeleton className={style.skeleton} />
            </div>
            <div className={style.skeletonBox}>
              <Skeleton className={style.skeleton} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.productContainer}>
        <div className={style.header}>
          <h2>{pathTransform(path)}</h2>
        </div>
        <div className={style.productList}>
          {data?.data.map((product: IProduct, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    );
  }
};

export default Category;
