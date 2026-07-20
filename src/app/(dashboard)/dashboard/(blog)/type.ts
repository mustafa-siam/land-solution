// Types
export interface IData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  image: string; 
  status: "pending" | "published";
  isTrash: boolean;
  createdAt: string;
  updatedAt: string;
}

// Types
export interface IFormInput {
  title: string;
  description: string;
  date: string; 
  image: string; 
}
