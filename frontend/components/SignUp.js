import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { CURRENT_USER_QUERY } from "./User";
import ErrorMessage from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    name: "",
    password: "",
  });

  const [singup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await singup().catch(console.error);
    console.log(res);
    resetForm();
  }

  //   const error =
  //     data?.authenticateUserWithPassword.__typename ===
  //     "UserAuthenticationWithPasswordFailure"
  //       ? data?.authenticateUserWithPassword
  //       : undefined;

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <ErrorMessage error={error} />
      <fieldset aria-busy={loading}>
        {data?.createUser && (
          <p>Signed up with {data.createUser.email} - Go Ahead And Log In</p>
        )}
        <label htmlFor='name'>
          Your Name
          <input
            type='name'
            name='name'
            placeholder='name'
            autoComplete='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
          <button type='submit'>Sign In</button>
        </label>
      </fieldset>
    </Form>
  );
}
