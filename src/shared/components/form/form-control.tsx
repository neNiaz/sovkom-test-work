import { FC, memo, useMemo } from "react";
import { DataForm } from "../data-form/data-form.tsx";
import { EDataForm, IDataForm } from "../../models/dataForm.ts";

interface Props {}

export const FormControl: FC<Props> = memo(() => {
  const generatedColumns: IDataForm[] = useMemo(() => {
    const newColumns = [
      {
        key: "fullName",
        type: EDataForm.SELECT,
        placeholder: "Фамилия, имя и отчество",
        options: [{ label: " ", value: " " }],
        isSuggesting: true,
        textholder: "Иванов Ваня Иванов",
        required: true,
      },
      {
        key: "birthday",
        type: EDataForm.DATE,
        placeholder: "День рождения",
        textholder: "15.04.2005",
        required: true,
      },
      {
        key: "phoneNumber",
        type: EDataForm.PHONE,
        placeholder: "Номер телефона",
        required: true,
      },
      {
        key: "gender",
        type: EDataForm.INPUT,
        placeholder: "Пол",
        textholder: "Мужской / Женский",
      },
      {
        key: "doctorInfo",
        type: EDataForm.MULTI_SELECT,
        placeholder: "Справка о врачах",
        options: [
          { label: "VIP", value: "VIP" },
          { label: "Проблемные", value: "Проблемные" },
          { label: "ОМС", value: "ОМС" },
          { label: "ДМС", value: "ДМС" },
        ],
        required: true,
      },
      {
        key: "currentDoctor",
        type: EDataForm.SELECT,
        placeholder: "Выберите специалиста",
        options: [
          { label: "Петров", value: "Петров" },
          { label: "Захаров", value: "Захаров" },
          { label: "Черниговская", value: "Черниговская" },
        ],
      },
      {
        key: "isSendSms",
        type: EDataForm.CHECKBOX,
        placeholder: "Отправлять рассылку?",
      },
    ];

    return newColumns;
  }, []);

  return <DataForm rows={generatedColumns} />;
});
