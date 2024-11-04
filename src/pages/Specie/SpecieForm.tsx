import { FC, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { SpecieAttributes } from "../../models/specie.model";

interface SpecieFormProps {
  data?: SpecieAttributes | null;
  onSubmit: (data: SpecieAttributes) => void;
}

const SpecieForm: FC<SpecieFormProps> = ({ data, onSubmit }) => {
  const [formState, setFormState] = useState<SpecieAttributes>(
    {} as SpecieAttributes
  );

  useEffect(() => {
    if (data) {
      setFormState(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
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
        value={formState.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descrição"
        name="description"
        value={formState.description}
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

export default SpecieForm;
