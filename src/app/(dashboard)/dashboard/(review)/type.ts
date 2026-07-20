// Types
export interface IData {
  _id: string;
  title: string;
  slug: string;
  designation: string;
  description: string; 
  social: string;
  image: string; 
  status: "pending" | "published";
  isTrash: boolean;
  createdAt: string;
  updatedAt: string;
}

// Types
export interface IFormInput {
  title: string;
  designation: string;
  description: string; 
  image: string; 
  social: string;
}
