import { styled } from "styled-components";
import { CommonButtonProps } from "../../../config/types";

const DeleteButton = ({ onClick }: CommonButtonProps) => {
  return (
    <Wrap onClick={onClick}>
      <Line className="first" />
      <Line className="second" />
    </Wrap>
  );
};

const Wrap = styled.button`
  width: 20px;
  height: 20px;
`;

const Line = styled.div`
  width: 16px;
  height: 1px;
  background-color: #000;
  &.first {
    transform: rotate(45deg);
    margin-left: 2px;
  }
  &.second {
    transform: rotate(-45deg);
    margin-top: -1px;
    margin-left: 2px;
  }
`;

export default DeleteButton;
