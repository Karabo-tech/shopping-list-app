export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  cellNumber: string;
}

export interface ShoppingList {
  id?: number;
  userId: number;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  image?: string;
  dateAdded: string;
}