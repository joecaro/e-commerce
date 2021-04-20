import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";

const RequestResetForm = styled(Form)`
  max-width: 400px;
  margin: 0 auto;
`;

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });

  const [singup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await singup().catch(console.error);
    console.log(res);
    resetForm();
  }
  return (
    <RequestResetForm method='POST' onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <ErrorMessage error={error} />
      <fieldset aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check you email for a link.</p>
        )}
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='email'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Request Reset</button>
      </fieldset>
    </RequestResetForm>
  );
}
