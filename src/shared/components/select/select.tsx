import { FieldProps } from "formik";
import AsyncSelect from "react-select/async";
import { useCallback } from "react";
import { MultiValue, SingleValue } from "react-select";
import loadOptions from "../../utils/loadOptionsUtility.ts";
import { ControlProps } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Option[];
  isErrorValidation?: boolean;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  isSuggesting?: boolean;
  setTyping: (isTyping: boolean) => void;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isErrorValidation = false,
  isSuggesting = false,
  isMulti = false,
  setTyping,
}: CustomSelectProps) => {
  const handleLoadOptions = useCallback(
    (inputValue: string, callback: (options: Option[]) => void) => {
      if (!isSuggesting) {
        callback(options);
        return;
      }

      loadOptions(inputValue)
        .then((option) => callback(option))
        .catch(() => callback([]));
    },
    [isSuggesting, options],
  );

  const onChange = useCallback(
    (newValue: MultiValue<Option> | SingleValue<Option>) => {
      if (isMulti) {
        const values = (newValue as MultiValue<Option>).map(
          (item: Option) => item.value,
        );
        form.setFieldValue(field.name, values);
      } else {
        const value = (newValue as Option)?.value;
        form.setFieldValue(field.name, value);
      }
    },
    [form, field.name, isMulti],
  );

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => {
            return option.value === field.value;
          });
    } else {
      return isMulti ? [] : null;
    }
  };

  const borderColor = (state: ControlProps<Option>) => {
    if (isErrorValidation) {
      return "1px solid hsl(0, 59%, 80%)";
    } else if (state.isFocused && !isErrorValidation) {
      return "1px solid rgba(0,0,0,0.5)";
    } else {
      return "1px solid hsl(0,0,80%)";
    }
  };

  return (
    <AsyncSelect
      className={className}
      name={field?.name}
      value={getValue()}
      loadOptions={handleLoadOptions}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      getOptionLabel={(option: Option) => option.label}
      defaultOptions
      onInputChange={(_, actionMeta) => {
        if (actionMeta.action === "input-change") {
          setTyping(true);
        } else {
          setTyping(false);
        }
      }}
      getOptionValue={(option: Option) => option.value}
      isMulti={isMulti}
      styles={{
        control: (provided, state) => ({
          ...provided,
          marginBottom: "2rem",
          height: "5rem",
          fontSize: "1.2rem",
          background: isErrorValidation
            ? "hsl(0, 59%, 90%)"
            : "hsl(0, 0%, 98%)",
          boxShadow: "none",
          border: borderColor(state),
          transition: "border 0.5s ease",
          "&:hover": {
            border: "1px solid rgba(0,0,0,0.5)",
          },
          minWidth: "100%",
        }),
        option: (provided) => ({
          ...provided,
          margin: "0",
          fontSize: "1.2rem",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "rgba(0,0,0,0.45)",
        }),
        valueContainer: (provided) => ({
          ...provided,
          top: "10px",
        }),
      }}
    />
  );
};

export default CustomSelect;
