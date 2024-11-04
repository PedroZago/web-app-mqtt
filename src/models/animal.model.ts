export interface AnimalData {
  name: string;
  specie: string;
  breed?: string;
  birthDate?: Date;
  weight?: number;
}

export interface AnimalAttributes extends AnimalData {
  id: string;
}
