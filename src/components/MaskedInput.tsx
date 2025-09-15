import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

interface MaskedInputProps {
  mask: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
  mask,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {(inputProps: any) => (
        <Input {...inputProps} placeholder={placeholder} className="text-sm sm:text-base" />
      )}
    </InputMask>
  );
};
