import Router from "next/router";
import { gql, useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";

export default function CreateProduct() {
  const { inputs, handleChange, clearForm } = useForm({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
      # Which variables are being passed in? what Types?
      $name: String!
      $description: String!
      $price: Int!
      $image: Upload
    ) {
      createProduct(
        data: {
          name: $name
          price: $price
          description: $description
          status: "AVAILABLE"
          photo: { create: { image: $image, altText: $name } }
        }
      ) {
        id
        name
        description
        price
      }
    }
  `;

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        const res = await createProduct();
        clearForm();
        // Go to the Product Page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='image'>
          Image
          <input type='file' id='image' name='image' onChange={handleChange} />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type='button' onClick={clearForm}>
          Clear Form
        </button>
        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  );
}
