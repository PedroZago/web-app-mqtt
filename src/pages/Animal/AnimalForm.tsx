import { FC, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormHelperText,
  Box,
} from "@mui/material";
import { AnimalAttributes } from "../../models/animal.model";
import { Option } from "../../interfaces/option";

interface AnimalFormProps {
  data?: AnimalAttributes | null;
  onSubmit: (data: AnimalAttributes) => void;
  speciesOptions: Option[];
  breedsOptions: Option[];
  animalSexOptions: Option[];
}

const AnimalForm: FC<AnimalFormProps> = ({
  data,
  onSubmit,
  speciesOptions,
  breedsOptions,
  animalSexOptions,
}) => {
  const [formState, setFormState] = useState<AnimalAttributes>(
    {} as AnimalAttributes
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handleBreedChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      breedId: event.target.value as string,
    }));
  };

  const handleDeviceStatusChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      sex: event.target.value as any,
    }));
  };

  const handleDateChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      birthDate: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name) newErrors.name = "Nome é obrigatório";
    if (!formState.specieId) newErrors.specieId = "Espécie é obrigatória";
    if (!formState.breedId) newErrors.breedId = "Raça é obrigatória";
    if (!formState.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
    } else if (new Date(formState.birthDate) > new Date()) {
      newErrors.birthDate = "Data de nascimento não pode ser no futuro";
    }
    if (!formState.sex) newErrors.sex = "Sexo é obrigatório";
    if (!formState.weight || formState.weight <= 0)
      newErrors.weight = "Peso deve ser maior que 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validateForm()) {
          onSubmit(formState);
        }
      }}
    >
      <TextField
        label="Nome"
        name="name"
        value={formState.name || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />
      <FormControl fullWidth margin="normal" error={!!errors.specieId}>
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
        {errors.specieId && (
          <FormHelperText style={{ color: "red" }}>
            {errors.specieId}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal" error={!!errors.breedId}>
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
        {errors.breedId && (
          <FormHelperText style={{ color: "red" }}>
            {errors.breedId}
          </FormHelperText>
        )}
      </FormControl>
      <TextField
        label="Data de Nascimento"
        name="birthDate"
        type="date"
        value={formState.birthDate ? formState.birthDate.substring(0, 10) : ""}
        onChange={(e) => handleDateChange(e.target.value)}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
        error={!!errors.birthDate}
        helperText={errors.birthDate}
      />
      <FormControl fullWidth margin="normal" error={!!errors.sex}>
        <InputLabel>Sexo</InputLabel>
        <Select
          label="Sexo"
          name="sex"
          value={formState.sex || ""}
          onChange={handleDeviceStatusChange}
        >
          {animalSexOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {errors.sex && (
          <FormHelperText style={{ color: "red" }}>{errors.sex}</FormHelperText>
        )}
      </FormControl>
      <TextField
        label="Peso (kg)"
        name="weight"
        type="number"
        value={formState.weight || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.weight}
        helperText={errors.weight}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </form>
  );
};

export default AnimalForm;
