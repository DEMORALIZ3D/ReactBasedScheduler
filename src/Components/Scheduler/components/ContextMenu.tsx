import { useRef, useEffect, ReactElement } from "react";

import { ContextMenuStyled } from "../styles/ContextMenu";

export { useState } from "react";

interface ContextMenuProps {
  open: boolean;
  posX: number;
  posY: number;
  children: ReactElement;
  closeContextMenu: () => void;
}

const ContextMenu = ({
  open,
  posX,
  posY,
  children,
  closeContextMenu,
}: ContextMenuProps) => {
  const contextMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!open) {
    return null;
  }
  return (
    <ContextMenuStyled posX={posX} posY={posY} ref={contextMenuRef}>
      {children}
    </ContextMenuStyled>
  );
};

export default ContextMenu;
