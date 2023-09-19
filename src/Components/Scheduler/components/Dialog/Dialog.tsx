import { ReactNode } from "react";
import {
  Backdrop,
  DialogButtons,
  DialogContent,
  DialogTitle,
  DialogWrapper,
} from "./styles";

interface DialogProps {
  open: boolean;
  children: ReactNode;
  buttons?: () => ReactNode;
  title?: string;
}

const Dialog = ({ open, children, buttons, title }: DialogProps) => {
  if (!open) return null;
  return (
    <Backdrop role="presentation">
      <DialogWrapper>
        {title ? (
          <DialogTitle>
            <div>{title}</div>
          </DialogTitle>
        ) : null}
        <DialogContent>
          <div>{children}</div>
        </DialogContent>
        {buttons ? (
          <DialogButtons>
            <div>{buttons()}</div>
          </DialogButtons>
        ) : null}
      </DialogWrapper>
    </Backdrop>
  );
};

export default Dialog;
