export enum AnimalSex {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export const animalSex: { [key: string]: string } = {
  [AnimalSex.MALE]: "Macho",
  [AnimalSex.FEMALE]: "Fêmea",
  [AnimalSex.OTHER]: "Outro",
};
