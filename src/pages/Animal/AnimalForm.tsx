import { FC, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AnimalAttributes } from "../../models/animal.model";

interface AnimalFormProps {
  data?: AnimalAttributes | null;
  onSubmit: (data: AnimalAttributes) => void;
  speciesOptions: { id: string; name: string }[]; // Novo: Recebe as opções de espécies
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
    if (data) {
      setFormState(data);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSpecieChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormState((prevState) => ({
      ...prevState,
      specie: event.target.value as string,
    }));
  };

  const handleDateChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      birthDate: value ? new Date(value) : undefined,
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
          name="specie"
          value={formState.specie || ""}
          onChange={handleSpecieChange}
        >
          {speciesOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Raça"
        name="breed"
        value={formState.breed || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Data de Nascimento"
        name="birthDate"
        type="date"
        value={
          formState.birthDate
            ? formState.birthDate.toISOString().split("T")[0]
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
