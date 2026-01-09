import React from "react";

type PanelContextType = {
  selected: string;
  setSelected: (s: string) => void;
};

export const PanelContext = React.createContext<PanelContextType>({
  selected: "wydatki",
  setSelected: () => {},
});

export function PanelProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = React.useState<string>("wydatki");
  return (
    <PanelContext.Provider value={{ selected, setSelected }}>
      {children}
    </PanelContext.Provider>
  );
}

export default PanelProvider;
