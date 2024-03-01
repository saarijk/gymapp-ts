import { createContext, useContext, useState, ReactNode } from "react";

interface VisibilityContextProps {
  createForm: boolean;
  setCreateform: (state: boolean) => void;
}

const VisibilityContext = createContext<VisibilityContextProps | undefined>(
  undefined
);

export const VisbilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [createForm, setCreateform] = useState<boolean>(false);

  const value: VisibilityContextProps = {
    createForm,
    setCreateform,
  };

  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisbility = () => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error("useVisibility must be used within a VisibilityProvider");
  }
  return context;
};
