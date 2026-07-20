export interface IFields {
  label: string;
  valueKey: string;
  placeholder: string;
  type:
    | "text"
    | "richtext"
    | "keywords"
    | "number"
    | "email"
    | "phone"
    | "image"
    | "date";
  formType: "string" | "array" | "number" | "file";
  required?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  minFiles?: number; 
}

export interface ParamsSlug {
  slug: string;
}
