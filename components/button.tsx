import { ReactNode } from "react";
import styled from "styled-components";

const ButtonLayout = styled.button`
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
`;

type TButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

const Button = ({ onClick, children }: TButtonProps) => {
  return <ButtonLayout onClick={onClick}>{children}</ButtonLayout>;
};

export default Button;
