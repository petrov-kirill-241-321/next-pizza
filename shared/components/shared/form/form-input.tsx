"use client";

import { useFormContext } from "react-hook-form";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "../../ui/input";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(name);
  const textError = errors[name]?.message as string;

  const onClearClick = () => {
    setValue(name, "", { shouldValidate: true });
  };
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClearClick} />}
      </div>

      {textError && <ErrorText text={textError} className="mt-2" />}
    </div>
  );
};
