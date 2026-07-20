// Types
export interface IData {
  _id: string;
  title: string;
  slug: string;
  productId: string;
  phone: string;
  country: string;
  message: string;
  
  status: "pin" | "unpin";
  isTrash: boolean;
  createdAt: string;
  updatedAt: string;
}

// Types
export interface IFormInput {
  title: string;
  description: string;
  date: string;
  link: {
    title: string;
    url: string;
  }[];
}
