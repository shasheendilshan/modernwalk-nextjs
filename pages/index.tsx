import type { NextPage } from "next";
import Categories from "@section-templates/Categories/Categories.section-template";
import style from "./index.module.scss";
import FlashSalesStat from "@section-templates/FlashSalesStat/FlashSales";
import { getAllProducts } from "@services/products.services";

const Home: NextPage = ({ products }: any) => {
  return (
    <div className={style.mainContainer}>
      <FlashSalesStat products={products} />
      <Categories />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const products = await getAllProducts();

  return {
    props: {
      products: products?.data,
    },
  };
}
