import React, { createContext, useState } from "react";

export const SidebarToggleContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export const SidebarToggleProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { Provider } = SidebarToggleContext;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </Provider>
  );
};

