import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import { useUser } from "./User";
import ErrorMessage from "./ErrorMessage";
import OrderItemStyles from "./styles/OrderItemStyles";
import formatMoney from "../lib/formatMoney";

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    allOrders {
      id
      total
      items {
        name
        description
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function Orders() {
  const { error, data, loading } = useQuery(ALL_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div>
      <Head>
        <title>Your Orders ({data.allOrders.length})</title>
      </Head>
      <h2>You have {data.allOrders.length} orders!</h2>
      <OrderUl>
        {data &&
          data.allOrders.map((order) => (
            <OrderItemStyles>
              <Link href={`/orders/${order.id}`}>
                <div>
                  <div className='order-meta'>
                    <p>{formatMoney(order.total)}</p>
                    <p>{order.items.length} products</p>
                    <p>{countItemsInAnOrder(order)} items</p>
                  </div>
                  <div className='images'>
                    {order.items.map((item) => (
                      <img
                        key={`image-${item.id}`}
                        src={item.photo?.image?.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </OrderItemStyles>
          ))}
      </OrderUl>
    </div>
  );
}
