"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "./ui/sonner";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position="bottom-right" />
      {children}
    </>
  );
};

export default Providers;
