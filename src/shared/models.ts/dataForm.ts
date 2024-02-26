export enum EDataForm {
  INPUT = "input",
  SELECT = "select",
  PHONE = "phone",
  DATE = "date",
  MULTI_SELECT = "multi-select",
  CHECKBOX = "checkbox",
}

export interface IDataForm {
  type: EDataForm;
  key: string;
  placeholder: string;
  textholder?: string;
  options?: Record<string, string>[];
  isSuggesting?: boolean;
}
