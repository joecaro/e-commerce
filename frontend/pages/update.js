import Head from "next/head";
import UpdateProduct from "../components/UpdateProduct";

export default function UpdatePage({ query }) {
  return (
    <div>
      <Head>
        <title>Shop.ME | Edit</title>
      </Head>
      <UpdateProduct id={query.id} />
    </div>
  );
}
