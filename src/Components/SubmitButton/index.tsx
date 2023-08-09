import { CommonButtonProps } from "../../config/types";
import { styled } from "styled-components";

const CommonButton = ({
  name,
  onClick,
  disabled,
  children,
}: CommonButtonProps) => {
  return (
    <StyledButton
      type="submit"
      name={`${name ? name : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
  width: 248px;
  border-bottom: 1px solid #000;

  color: #000;
  font-size: 30px;
  font-weight: 700;
  line-height: 52px;

  &:disabled {
    color: #d9d9d9;
  }
`;
export default CommonButton;
