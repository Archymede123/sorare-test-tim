import type { NextPage } from "next";
import gql from "graphql-tag";
import { useGQLQuery } from "../../hooks/useGQLQuery";
import { useRouter } from "next/router";
import { ICard } from "../../types";
import styled from "styled-components";
import Card from "../../components/card";

const CardsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 3rem;
`;

const GET_CARDS = gql`
  query ($slugs: [String!]!) {
    cards(slugs: $slugs) {
      id
      name
      age
      grade
      onSale
      position
      rarity
      player {
        matchName
        country {
          code
        }
        pictureUrl
      }
    }
  }
`;

const CardsPage: NextPage = () => {
  const { query } = useRouter();
  const { data, isLoading, isError } = useGQLQuery("countries", GET_CARDS, {
    slugs: typeof query.cardSlug === "string" ? query.cardSlug?.split(",") : "",
  });
  console.log(data);
  isLoading && <div>Loading ...</div>;
  isError && <div>Error ...</div>;
  return (
    <CardsLayout>
      {data &&
        data.cards.map((card: ICard) => <Card key={card.id} card={card} />)}
    </CardsLayout>
  );
};

export default CardsPage;
