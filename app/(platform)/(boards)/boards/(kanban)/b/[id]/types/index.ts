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
  label?: Label[]
  isPlaceholder?: boolean;
  description?: string
}

