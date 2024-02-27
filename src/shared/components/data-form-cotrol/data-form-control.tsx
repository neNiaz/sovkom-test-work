import { EDataForm, IDataForm } from "../../models/dataForm.ts";
import { FC, memo, useMemo, useState } from "react";
import { ErrorMessage, Field, FormikProps } from "formik";
import styles from "../data-form/data-form.module.scss";
import classNames from "classnames";
import CustomSelect from "../select/select.tsx";
import MaskedInputField from "../input/masked-input/masked-input.tsx";
import { DATE_MASK, NUMBER_MASK } from "../../constants/constants.ts";

interface Props {
  row: IDataForm;
  form: FormikProps<Record<string, string>>;
}

export const DataFormControl: FC<Props> = memo(({ row, form }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const isValidationError = useMemo(() => {
    return !!form.touched[row.key] && !!form.errors[row.key];
  }, [form.errors, form.touched, row.key]);

  console.log("row.required", row.key, !!row.required);
  return (
    <div className={styles.container_wrapper}>
      <ErrorMessage
        name={row.key}
        render={(msg) => (
          <div className={styles.error_message_container}>
            <span className={styles.error_message_container_text}>{msg}</span>
          </div>
        )}
      />
      {row.type === EDataForm.INPUT && (
        <div
          className={classNames(styles.container_form_box, {
            [styles.container_form_box__error]: isValidationError,
          })}
        >
          <Field
            placeholder={isFocused ? row.textholder : ""}
            key={row.key}
            name={row.key}
            className={classNames(styles.input_field, {
              [styles.input_field__error]: isValidationError,
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <label
            htmlFor={row.key}
            className={classNames(styles.floating_label, {
              [styles.floating_label_valid]:
                !isValidationError && !!form.values[row.key],
            })}
          >
            {row.required ? row.placeholder.concat("*") : row.placeholder}
          </label>
        </div>
      )}
      {row.type === EDataForm.SELECT && (
        <>
          <Field
            placeholder={""}
            component={CustomSelect}
            key={row.key}
            isSuggesting={row.isSuggesting}
            options={row.options}
            name={row.key}
            isErrorValidation={isValidationError}
            setTyping={setIsTyping}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <label
            htmlFor={row.key}
            className={classNames(styles.floating_label, {
              [styles.floating_label_valid]: !!form.values[row.key] || isTyping,
            })}
          >
            {row.required ? row.placeholder.concat("*") : row.placeholder}
          </label>
        </>
      )}
      {row.type === EDataForm.CHECKBOX && (
        <div className={styles.container_checkbox}>
          <span>{row.placeholder}</span>
          <Field
            className={classNames(styles.checkbox_field, {
              [styles.container_form_error_message]: isValidationError,
            })}
            type={"checkbox"}
            placeholder={row.placeholder}
            key={row.key}
            name={row.key}
          />
        </div>
      )}
      {row.type === EDataForm.MULTI_SELECT && (
        <>
          <Field
            placeholder={""}
            key={row.key}
            name={row.key}
            isErrorValidation={isValidationError}
            component={CustomSelect}
            options={row.options}
            isMulti={true}
            setTyping={setIsTyping}
          />
          <label
            htmlFor={row.key}
            className={classNames(styles.floating_label, {
              [styles.floating_label_valid]: !!form.values[row.key] || isTyping,
            })}
          >
            {row.required ? row.placeholder.concat("*") : row.placeholder}
          </label>
        </>
      )}
      {row.type === EDataForm.PHONE && (
        <div
          className={classNames(styles.container_form_box, {
            [styles.container_form_box__error]:
              !!form.touched[row.key] && !!form.errors[row.key],
          })}
        >
          <MaskedInputField
            placeholder={""}
            name={row.key}
            mask={NUMBER_MASK}
            key={row.key}
          />
          <label
            htmlFor={row.key}
            className={classNames(styles.floating_label, {
              [styles.floating_label_valid]: form.values[row.key].length > 0,
            })}
          >
            {row.required ? row.placeholder.concat("*") : row.placeholder}
          </label>
        </div>
      )}
      {row.type === EDataForm.DATE && (
        <div
          className={classNames(styles.container_form_box, {
            [styles.container_form_box__error]: isValidationError,
          })}
        >
          <MaskedInputField
            placeholder={""}
            name={row.key}
            mask={DATE_MASK}
            key={row.key}
          />
          <label
            htmlFor={row.key}
            className={classNames(styles.floating_label, {
              [styles.floating_label_valid]: form.values[row.key].length > 0,
            })}
          >
            {row.required ? row.placeholder.concat("*") : row.placeholder}
          </label>
        </div>
      )}
    </div>
  );
});
