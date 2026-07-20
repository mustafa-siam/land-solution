// Types
export interface IData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  video: string;
  image: string[];
  price: string;
  feature: string[];
  termsAndConditions: string;
  phone: string;
  googleMap: string;
  categoryId: string;
  areaId: string;
  metaSeoTags: string[];
  metaSeoDescription: string;
  verification: boolean;
  recommendation: boolean;
  status: "pending" | "published";
  isTrash: boolean;
  createdAt: string;
  updatedAt: string;
}


// Types
export interface IFormInput {
  title: string;
  description: string;
  location: string;
  video: string;
  image: string[];
  price: string;
  drawingSpace: string;
  diningRoom: string;
  kitchen: string;
  parking: string;
  feature: string[];
  termsAndConditions: string;
  phone: string;
  googleMap: string;
  categoryId: string;
  areaId: string;
  gas: string;
  facing: string;
  electricity: string;
  water: string;
  availability: string;
  propertyType: string;
  metaSeoTags: string[];
  metaSeoDescription: string;
}

