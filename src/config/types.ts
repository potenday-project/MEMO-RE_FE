import React from "react";
import { store } from "../app/store";

export interface GridLayoutProps {
  children: React.ReactNode;
  logo?: boolean;
}

export interface CommonInputProps {
  name: string;
  type: string;
  placeholder?: string;
}

export interface CommonButtonProps {
  name?: string;
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface StyleLineProps {
  direction: string;
  bottom?: string;
  right?: string;
}

export type RootState = ReturnType<typeof store.getState>;
