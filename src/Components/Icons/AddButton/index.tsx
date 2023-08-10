import React from "react";
import { styled } from "styled-components";
import { CommonButtonProps } from "../../../config/types";

const AddButton = ({ onClick }: CommonButtonProps) => {
  return (
    <Wrap onClick={onClick}>
      <ColLine />
      <RowLine />
    </Wrap>
  );
};

const Wrap = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ColLine = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 16px;
  width: 1px;
  background-color: #000;
`;

const RowLine = styled(ColLine)`
  width: 16px;
  height: 1px;
`;

export default AddButton;
