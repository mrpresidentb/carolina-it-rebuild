
export interface Service {
  id: number;
  title: string;
  description: string;
  slug: string;
  content: string;
  visible: boolean;
  createdAt: string;
}

export interface ServiceFormData {
  id?: number;
  title: string;
  description: string;
  slug: string;
  content: string;
  visible: boolean;
}
