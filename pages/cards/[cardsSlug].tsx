import type { NextPage } from "next";
import gql from "graphql-tag";
import { useGQLQuery } from "../../hooks/useGQLQuery";
import { useRouter } from "next/router";
import styled from "styled-components";
import Card from "../../components/card";
import { useState } from "react";
import Zoom from "@mui/material/Zoom";
import Grow from "@mui/material/Grow";
import Button from "../../components/button";

const CardsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    text-align: center;
  }

  .cardsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 3rem;
  }

  .cardPlaceholder {
    border-radius: 1rem;
    background: linear-gradient(
      0deg,
      rgba(34, 193, 195, 1) 0%,
      rgba(253, 187, 45, 1) 100%
    );
    height: 400px;
    color: white;
    position: relative;
  }

  .placeholderLabel {
    position: absolute;
    top: 45%;
    left: 0;
    width: 100%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
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
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const { query } = useRouter();
  const { data, isLoading } = useGQLQuery(
    "cards",
    GET_CARDS,
    {
      slugs:
        typeof query.cardsSlug === "string" ? query.cardsSlug?.split(",") : "",
    },
    { enabled: dataFetched }
  );
  return (
    <CardsLayout>
      <h1>Welcome on card grid page</h1>
      <Button onClick={() => setDataFetched((old) => !old)}>
        Click Me To {dataFetched ? "Hide" : "Reveal"} Cards
      </Button>
      <div className="cardsGrid">
        {typeof query.cardsSlug === "string" &&
          query.cardsSlug?.split(",").map((cardSlug: string, i) => (
            <div className="cardPlaceholder" key={cardSlug}>
              <Zoom
                in={!isLoading && dataFetched}
                style={{
                  transitionDelay: dataFetched ? `${i * 4}00ms` : "0ms",
                }}
              >
                <div>
                  <Card card={data?.cards[i]} />
                </div>
              </Zoom>
              <Grow in={!dataFetched}>
                <p className="placeholderLabel">This is a card placeholder</p>
              </Grow>
            </div>
          ))}
      </div>
    </CardsLayout>
  );
};

export default CardsPage;
