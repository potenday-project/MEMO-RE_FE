export interface BaseInputProps {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export interface CommonButtonProps {
  name?: string;
  value?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
