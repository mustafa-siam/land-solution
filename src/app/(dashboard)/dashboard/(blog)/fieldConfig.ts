import { IFields } from "@/Type/IFields";

export const fieldConfig: IFields[] = [
  {
    label: "Title",
    valueKey: "title",
    placeholder: "Enter the title",
    type: "text",
    formType: "string",
    required: true,
  },
  {
    label: "Description",
    valueKey: "description",
    placeholder: "Enter the description",
    type: "richtext",
    formType: "string",
    required: true,
  },
  {
    label: "Date",
    valueKey: "date",
    placeholder: "Enter the date",
    type: "date",
    formType: "string",
    required: true,
  },
  {
    label: "Image",
    valueKey: "image",
    placeholder: "Upload a image",
    type: "image",
    formType: "file",
    multiple: false,
    maxFiles: 1,
    minFiles: 1, // ✅ Minimum 1 image required
    required: true, 
  },
  // {
  //   label: "Meta SEO Tag",
  //   valueKey: "metaSeoTags",
  //   placeholder: "Enter the Meta SEO Tag",
  //   type: "keywords",
  //   formType: "array",
  //   required: false,
  // },
  // {
  //   label: "Meta SEO Description",
  //   valueKey: "metaSeoDescription",
  //   placeholder: "Enter the Meta SEO Tag",
  //   type: "text",
  //   formType: "string",
  //   required: false,
  // },
];
