import { useState } from "react";

export const useContextMenu = () => {
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const [contextMenuData, setContextMenuData] = useState<{
    data: Record<string, unknown> | null;
    date: Date | null;
  } | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const handleContextMenu = (evt, data = null, date = null) => {
    evt.preventDefault();
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
    setContextMenuData,
  };
};
