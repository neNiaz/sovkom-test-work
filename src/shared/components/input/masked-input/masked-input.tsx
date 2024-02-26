import { FC } from "react";
import { useField } from "formik";
import InputMask from "react-input-mask";
import classNames from "classnames";
import styles from "./masked-input.module.scss";

interface MaskedInputFieldProps {
  mask: string;
  name: string;
  placeholder: string;
  className?: string;
}

const MaskedInputField: FC<MaskedInputFieldProps> = ({
  mask,
  className,
  placeholder,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <>
      <InputMask
        className={classNames(styles.container_input_mask, className)}
        mask={mask}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </>
  );
};

export default MaskedInputField;
