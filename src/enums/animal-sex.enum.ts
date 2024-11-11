export enum AnimalSex {
  NONE = "none",
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export const animalSex: { [key: string]: string } = {
  [AnimalSex.NONE]: "Selecione uma opção",
  [AnimalSex.MALE]: "Macho",
  [AnimalSex.FEMALE]: "Fêmea",
  [AnimalSex.OTHER]: "Outro",
};
