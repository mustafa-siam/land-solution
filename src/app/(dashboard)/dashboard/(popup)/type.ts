// Types
export interface IData {
  _id: string;
  title: string;
  slug: string;
  link: string;
  image: string; 
  status: "pending" | "published";
  isTrash: boolean;
  createdAt: string;
  updatedAt: string;
}

// Types
export interface IFormInput {
  title: string;
  link: string;
  image: string; 
}
