export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface Summary {
  id: number;
  title: string;
  summary: string;
}

export type Tabs = "search" | "favorite";
