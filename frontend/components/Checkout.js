import { useState } from "react";
import Router from "next/router";
import nProgress from "nprogress";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import SickButton from "./styles/SickButton";
import { useCart } from "../lib/CartState";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px #00000044;
  border: 1px solid #00000022;
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 5px;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const { closeCart } = useCart();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nProgress.start();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log(error);
      setError(error);
      setLoading(false);
      nProgress.done();
      return;
    }
    // send token to mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(paymentMethod, error, order);
    setLoading(false);
    nProgress.done();
    if (!error) {
      closeCart();
      Router.push({
        pathname: `/orders/${order.data.checkout.id}`,
      });
    }
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <SickButton disabled={loading}>CHECK OUT</SickButton>
    </CheckoutFormStyles>
  );
}
