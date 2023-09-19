import styled from "@emotion/styled";

export const Backdrop = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  z-index: 800;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

export const DialogWrapper = styled("div")`
  position: relative;
  min-height: 300px;
  min-width: 320px;
  width: 400px;
  z-index: 801;
  background: white;
  top: 15%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 8px 11px 8px #00000033;
`;

export const DialogTitle = styled("div")`
  width: 100%;
  font-size: 1.2rem;
  background-color: #f4f4f0;
  & > div {
    padding: 8px;
  }
`;

export const DialogContent = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  & > div {
    padding: 8px;
  }
`;

export const DialogButtons = styled("div")`
  width: 100%;
  background-color: #f4f4f0;
  display: flex;
  justify-content: end;
  & > div {
    padding: 8px;
  }

  & button {
    margin-left: 8px;
  }
`;
