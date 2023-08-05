import { styled } from "styled-components";
import { BaseInputProps } from "../../config/types";

const CommonInput = ({ type, name, label, placeholder }: BaseInputProps) => {
  return (
    <InputField>
      {label ? <span>{label}</span> : null}
      <StyledInput
        type={type}
        name={name}
        placeholder={`${placeholder ? placeholder : ""}`}
      />
    </InputField>
  );
};

const InputField = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  span {
    display: block;
    width: 74px;

    color: #000;
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
  }
`;

export const StyledInput = styled.input`
  width: 336px;
  border-bottom: 1px solid #000;
  padding-bottom: 10px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.176px;
  }
  &:focus {
    border-bottom: 1px solid #000;
  }
`;

export default CommonInput;
