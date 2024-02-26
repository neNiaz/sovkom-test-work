import { FC, useMemo, useState } from "react";
import { IDataForm } from "../../models.ts/dataForm.ts";
import { DataFormControl } from "../data-form-cotrol/data-form-control.tsx";
import Button from "../button/button.tsx";
import { Form, Formik } from "formik";
import Title from "../title/title.tsx";
import * as Yup from "yup";
import styles from "./data-form.module.scss";
import { isValidDate } from "../../utils/validator.ts";

interface Props {
  rows: IDataForm[];
}

export const DataForm: FC<Props> = ({ rows }) => {
  const [formKey, setFormKey] = useState(0);

  const formSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Слишком короткое ФИО!")
      .max(50, "Слишком длинное ФИО!")
      .required("Пожалуйста, напишите ваше ФИО"),
    birthday: Yup.string()
      .required("Требуется дата рождения")
      .test("isValidDate", "Неверный формат даты рождения", (value) =>
        value ? isValidDate(value) : false,
      ),
    phoneNumber: Yup.string()
      .matches(
        /^\+7 \d{3} \d{3} \d{4}$/,
        "Номер телефона должен соответствовать формату +7 999 999 9999",
      )
      .required("Требуется номер телефона"),
    gender: Yup.string().notRequired(),
    doctorInfo: Yup.array().required("Пожалуйста, выберите справку о врачах"),
    currentDoctor: Yup.string().notRequired(),
    isSendSms: Yup.boolean().notRequired(),
  });

  const initialValues = useMemo(() => {
    return rows
      .map((row) => row.key)
      .reduce(
        (acc, key) => {
          acc[key] = "";
          return acc;
        },
        {} as Record<string, string>,
      );
  }, [rows]);

  return (
    <div className={styles.container}>
      <Title text={"Форма клиента поликлиники"} />
      <Formik
        key={formKey}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          console.log("values", values);
          resetForm();
          setFormKey((oldKey) => oldKey + 1);
          alert(`
          Пользователь успешно создан!
          ${JSON.stringify(values, null, 2)}`);
        }}
        validationSchema={formSchema}
      >
        {(formikProps) => (
          <Form className={styles.container_form}>
            {rows.map((currentRows) => {
              return (
                <DataFormControl
                  key={currentRows.key}
                  row={currentRows}
                  form={formikProps}
                />
              );
            })}
            <Button disabled={false} type="submit">
              Отправить данные
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
