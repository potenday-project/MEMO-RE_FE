import React from "react";

export interface CommonInputProps {
  name: string;
  type: string;
  placeholder?: string;
}

export interface CommonButtonProps {
  name?: string;
  value?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
