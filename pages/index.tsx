import type { NextPage } from "next";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "../components/button";
import { useState } from "react";
import { useRouter } from "next/router";

const HomeLayout = styled.div`
  height: 100vh;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5rem;
    gap: 4rem;
  }

  h1 {
    width: 100%;
    text-align: center;
  }

  footer {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    border-top: 1px solid #555;
    padding: 1rem;
  }
`;

const Home: NextPage = () => {
  const [searchedSlugs, setSearchedSlugs] = useState<string>("");
  const { push } = useRouter();
  return (
    <HomeLayout>
      <main>
        <h1>Welcome on {`Tim's`} test page for Sorare</h1>
        <TextField
          label="Enter one slug per line"
          variant="filled"
          multiline
          onChange={(e) => setSearchedSlugs(e.target.value)}
          sx={{ width: "400px" }}
          rows={4}
        />
        <Button
          onClick={() => push(`/cards/${searchedSlugs.replace(/\n/g, ",")}`)}
        >
          Search for slugs
        </Button>
      </main>
      <footer>
        Find source code{" "}
        <a
          href="https://github.com/Archymede123/sorare-test-tim"
          target="_blank"
          rel="noreferrer"
        >
          {`-->`} here {`<--`}
        </a>
      </footer>
    </HomeLayout>
  );
};

export default Home;
