import { styled } from "styled-components";
import { CommonInputProps } from "../../config/types";

const CommonInput = ({ type, name, placeholder }: CommonInputProps) => {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={`${placeholder ? placeholder : ""}`}
    />
  );
};

export const StyledInput = styled.input`
  width: 336px;
  border-bottom: 1px solid #000;
  padding-bottom: 10px;

  color: #000;
  font-size: 20px;
  line-height: 19.2px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.176px;
  }
  &:focus {
    border-bottom: 1px solid #000;
  }
`;

export default CommonInput;
