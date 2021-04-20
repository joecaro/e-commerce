import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";

const GET_PRODUCT_BY_ID = gql`
  query GET_PRODUCT_BY_ID($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--max-width);
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }) {
  const { data, error, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Shop.ME | {Product.name}</title>
      </Head>
      <img
        src={Product?.photo?.image?.publicUrlTransformed}
        alt={Product.name}
      />
      <div className='detals'>
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
}
