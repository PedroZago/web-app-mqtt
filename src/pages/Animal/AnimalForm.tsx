import { FC, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { AnimalAttributes } from "../../models/animal.model";

interface AnimalFormProps {
  data?: AnimalAttributes | null;
  onSubmit: (data: AnimalAttributes) => void;
  speciesOptions: { id: string; name: string }[];
}

const AnimalForm: FC<AnimalFormProps> = ({
  data,
  onSubmit,
  speciesOptions,
}) => {
  const [formState, setFormState] = useState<AnimalAttributes>(
    {} as AnimalAttributes
  );

  useEffect(() => {
    if (data) setFormState(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSpecieChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      specieId: event.target.value as string,
    }));
  };

  const handleDateChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      birthDate: new Date(value),
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formState);
      }}
    >
      <TextField
        label="Nome"
        name="name"
        value={formState.name || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Espécie</InputLabel>
        <Select
          label="Espécie"
          name="specieId"
          value={formState.specieId || ""}
          onChange={handleSpecieChange}
        >
          {speciesOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Raça</InputLabel>
        <Select
          label="Raça"
          name="breedId"
          value={formState.breedId || ""}
          onChange={handleBreedChange}
        >
          {breedsOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Data de Nascimento"
        name="birthDate"
        type="date"
        value={
          formState.birthDate
            ? new Date(formState.birthDate).toISOString().split("T")[0]
            : ""
        }
        onChange={(e) => handleDateChange(e.target.value)}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        label="Peso (kg)"
        name="weight"
        type="number"
        value={formState.weight || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
};

export default AnimalForm;
