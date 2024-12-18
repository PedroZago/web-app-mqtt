import { AnimalSex } from "../enums/animal-sex.enum";

export interface AnimalData {
  name: string;
  specieId: string;
  breedId: string;
  sex: AnimalSex;
  birthDate: string;
  weight: number;
}

export interface AnimalAttributes extends AnimalData {
  id: string;
}
