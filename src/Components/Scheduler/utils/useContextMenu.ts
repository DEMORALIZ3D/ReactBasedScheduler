import { useState } from "react";

export const useContextMenu = () => {
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const [contextMenuData, setContextMenuData] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const handleContextMenu = (evt, data = null, date = null) => {
    evt.preventDefault();
    console.log("handle");
    setOpenContextMenu(true);
    setContextMenuPosition({ x: evt.clientX, y: evt.clientY });
    setContextMenuData({ data, date });
  };
  const closeContextMenu = () => setOpenContextMenu((p) => !p);

  return {
    closeContextMenu,
    openContextMenu,
    handleContextMenu,
    contextMenuData,
    contextMenuPosition,
  };
};
