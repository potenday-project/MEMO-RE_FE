import { styled } from "styled-components";
import { BaseInputProps } from "../../config/types";

const CommonInput = ({
  type,
  name,
  label,
  placeholder,
  className,
}: BaseInputProps) => {
  return (
    <InputWrap>
      {label ? <span>{label}</span> : null}
      <StyledInput
        type={type}
        name={name}
        placeholder={`${placeholder ? placeholder : ""}`}
        className={`${className ? className : ""}`}
      />
    </InputWrap>
  );
};

const InputWrap = styled.div`
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
