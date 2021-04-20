import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import PaginationStyles from "../components/styles/PaginationStyles";
import ErrorMessage from "./ErrorMessage";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return "loading...";
  if (error) return <ErrorMessage error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  const items = `${(page - 1) * perPage + 1}-${
    page * perPage < count ? page * perPage : count
  }`;

  return (
    <PaginationStyles>
      <Head>
        <title>
          Shop.ME - Page {page} of {pageCount}{" "}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>
        {items} Items of {count}
      </p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}
