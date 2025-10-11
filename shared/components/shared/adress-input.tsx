"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="5ad308e41c241dfd3ff4c87eb242f297469f6d93"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
