import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useQuery } from "react-query";
import { request } from "graphql-request";
import gql from "graphql-tag";
import { useGQLQuery } from "../hooks/useGQLQuery";

const GET_CARD = gql`
  query ($slug: String!) {
    card(slug: $slug) {
      id
      name
    }
  }
`;

const Home: NextPage = () => {
  const { data } = useGQLQuery("countries", GET_CARD, {
    slug: "marco-verratti-2021-rare-1",
  });
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Sorare Test Tim</main>

      <footer className={styles.footer}>my footer</footer>
    </div>
  );
};

export default Home;
