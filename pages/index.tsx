import type { NextPage } from "next";
import { useTestContext } from "@contexts/testContext";
import Categories from "@section-templates/Categories/Categories.section-template";
import style from "./index.module.scss";
import FlashSales from "@section-templates/FlashSales/FlashSales.section-template";

const Home: NextPage = () => {
  const testCtx = useTestContext();
  console.log("test context", testCtx);
  return (
    <div className={style.mainContainer}>
      <FlashSales />
      <Categories />
    </div>
  );
};

export default Home;
