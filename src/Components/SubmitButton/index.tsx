import { CommonButtonProps } from "../../config/types";
import { styled } from "styled-components";

const CommonButton = ({ name, onClick, children }: CommonButtonProps) => {
  return (
    <StyledButton type="submit" name={`${name ? name : ""}`} onSubmit={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: absolute;
  bottom: 80px;
  display: block;
  right: 80px;
  width: 248px;
  border-bottom: 1px solid #000;

  color: #000;
  font-size: 30px;
  font-weight: 700;
  line-height: 52px;
`;
export default CommonButton;