import Head from "next/head";
import CreateProduct from "../components/CreateProduct";
import PleaseSignIn from "../components/PleaseSignIn";

export default function SellPage() {
  return (
    <div>
      <Head>
        <title>Shop.ME | Sell</title>
      </Head>
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </div>
  );
}
