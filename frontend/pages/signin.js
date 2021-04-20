import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import RequestReset from "../components/RequestReset";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const Exit = styled.button`
  background: var(--red);
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  border: none;
  position: absolute;
  right: 40vw;
`;

export default function SignInPage() {
  const [isReset, setIsReset] = useState(false);

  return (
    <div>
      <Head>
        <title>Shop.ME | Sign In</title>
      </Head>
      {!isReset ? (
        <Grid>
          <SignIn handleShowReset={setIsReset} />
          <SignUp />
        </Grid>
      ) : (
        <>
          <Exit onClick={() => setIsReset(false)}>Go Back</Exit>
          <RequestReset />
        </>
      )}
    </div>
  );
}
