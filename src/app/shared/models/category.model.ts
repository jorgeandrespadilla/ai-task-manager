interface BaseCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
}

export interface RawCategory extends BaseCategory {
  createdAt: string;
  updatedAt?: string;
}

export interface Category extends BaseCategory {
  createdAt: Date;
  updatedAt?: Date;
}

export interface AddCategory {
  name: string;
  description?: string;
  color: string;
}

export interface UpdateCategory {
  id: string;
  name?: string;
  description?: string;
  color?: string;
}
