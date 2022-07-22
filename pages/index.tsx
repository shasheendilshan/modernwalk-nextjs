import type { NextPage } from "next";
import Categories from "@section-templates/Categories/Categories.section-template";
import style from "@styles/index.module.scss";
import FlashSalesStat from "@section-templates/FlashSalesStat/FlashSales";
import { getAllProducts, getAllCategories } from "@services/products.services";
import { IProduct } from "@interfaces/products/products.interfaces";

type Props = {
  products: IProduct[];
};

const Home: NextPage<Props> = ({ products }) => {
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
    revalidate: 10,
  };
}
