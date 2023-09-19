import styled from "@emotion/styled";

export const ContextMenuStyled = styled("div", {
  shouldForwardProp: (propName) => propName !== "posY" && propName !== "posX",
})<{ posY: string; posX: string }>`
  position: absolute;
  background: #f4f4f4;
  box-shadow: 8px 11px 8px #00000033;
  border-radius: 10px;
  z-index: 500;
  top: ${({ posY }) => `${posY}px`};
  left: ${({ posX }) => `${posX}px`};
  max-width: 300px;
  padding: 8px;

  & > div {
    cursor: pointer;
  }
`;
