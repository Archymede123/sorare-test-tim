import type { NextPage } from "next";
import gql from "graphql-tag";
import { useGQLQuery } from "../../hooks/useGQLQuery";
import { useRouter } from "next/router";
import { ICard } from "../../types";
import styled from "styled-components";
import Card from "../../components/card";
import { useState } from "react";
import Zoom from "@mui/material/Zoom";
import Grow from "@mui/material/Grow";

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

  button {
    background: linear-gradient(
      90deg,
      rgba(131, 58, 180, 1) 0%,
      rgba(253, 29, 29, 1) 50%,
      rgba(252, 176, 69, 1) 100%
    );
    border: none;
    padding: 1rem 3rem;
    font-size: 1.5rem;
    color: white;
    border-radius: 100px;
    width: 500px;
    margin: 0 auto;
    cursor: pointer;
    transition: box-shadow 0.5s ease-in-out;

    &:hover {
      box-shadow: 0px 0px 10px #000000a9;
    }
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
  const { data } = useGQLQuery(
    "cards",
    GET_CARDS,
    {
      slugs:
        typeof query.cardsSlug === "string" ? query.cardsSlug?.split(",") : "",
    },
    { enabled: dataFetched }
  );
  // console.log(dataFetched);
  return (
    <CardsLayout>
      <h1>Welcome on card grid page</h1>
      <button onClick={() => setDataFetched((old) => !old)}>
        Click Me To {dataFetched ? "Hide" : "Reveal"} Cards
      </button>
      <div className="cardsGrid">
        {typeof query.cardsSlug === "string" &&
          query.cardsSlug?.split(",").map((cardSlug: string, i) => (
            <div className="cardPlaceholder" key={cardSlug}>
              <Zoom
                in={dataFetched}
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
