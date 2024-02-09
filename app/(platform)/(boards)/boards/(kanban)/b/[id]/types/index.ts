import { UniqueIdentifier } from "@dnd-kit/core";

export type Label = {
  id?: any;
  title: string;
  color?: string;
}


export type Item = {
  id: any;
  title: string;
  labelColor?: string;
  member?: { name: string, avatar: string };
  labels?: Label[]
  isPlaceholder?: boolean;
  description?: string;
  dueDate?: string;
  status?: string;
  comments?: number;
  priority?: string;
}

export type DNDType = {
  id: UniqueIdentifier;
  background?: {
    id: string
    value: string;
    thumb: string;
    url: string;
  }
  title: string;
  items: Item[];
  archive?: Item[];

};

export type Background = {
  id: string
  value: string;
  thumb: string;
  url: string;
}
