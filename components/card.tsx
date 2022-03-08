import styled from "styled-components";
import Image from "next/image";
import { ICard } from "../types";

const CardLayout = styled.div`
  position: relative;
  border-radius: 1rem;
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  height: 400px;
  color: white;

  .cardContent {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 10;
    justify-content: center;
    align-items: center;
    gap: 4px;

    & > * {
      margin: 0;
    }

    .playerName {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
  }

  .cardInfos {
    position: absolute;
    bottom: 0;
    border-top: 1px solid white;
    background: #ffffff5c;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    color: black;
    font-weight: 700;
  }

  .cardImage {
    position: absolute;
    top: 0;
    left: 0;
    height: 400px;
    width: 100%;
    opacity: 0.5;
  }
`;

type TCardProps = {
  card: ICard | null;
};

const Card = ({ card }: TCardProps) => {
  if (!card)
    return (
      <p
        className=""
        style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        ERROR : Could not find player associated to this slug
      </p>
    );
  return (
    <CardLayout>
      <div className="cardContent">
        <p className="playerName">{card.player.matchName}</p>
        <p className="playerDetails">{card.position}</p>
        <p className="playerDetails">{card.age} years old</p>
      </div>
      <div className="cardInfos">
        <p>{card.rarity} card</p>
        <p>{card.onSale ? "on sale" : "not available"}</p>
      </div>
      <div className="cardImage">
        <Image
          src={card.player.pictureUrl}
          alt={card.name}
          layout="fill"
          objectFit="contain"
        ></Image>
      </div>
    </CardLayout>
  );
};

export default Card;
