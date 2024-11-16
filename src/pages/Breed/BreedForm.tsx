import { FC, useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { SpecieAttributes } from "../../models/specie.model";
import { FormErrors } from "../../interfaces/form-errors";

interface SpecieFormProps {
  data?: SpecieAttributes | null;
  onSubmit: (data: SpecieAttributes) => void;
}

const SpecieForm: FC<SpecieFormProps> = ({ data, onSubmit }) => {
  const [formState, setFormState] = useState<SpecieAttributes>(
    {} as SpecieAttributes
  );
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (data) setFormState(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formState.name) newErrors.name = "Nome é obrigatório";
    if (!formState.description)
      newErrors.description = "Descrição é obrigatória";

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
      <TextField
        label="Descrição"
        name="description"
        value={formState.description || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </form>
  );
};

export default SpecieForm;
