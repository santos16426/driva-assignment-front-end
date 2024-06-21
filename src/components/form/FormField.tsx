import React from "react";
import { Controller, Control } from "react-hook-form";
import { parseValue } from "../../utils/parser";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  type?: string;
  options?: { value: string; label: string }[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

const FormField: React.FC<Props> = ({
  control,
  name,
  label,
  type = "text",
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          {type === "select" ? (
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              {...field}
            >
              <option value="">Select {label}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              type={type}
              {...field}
              onChange={(e) => field.onChange(parseValue(e.target.value, type))}
            />
          )}
          <div className="h-5">
            {fieldState.error && (
              <p className="text-sm text-red-600">{fieldState.error.message}</p>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default FormField;
