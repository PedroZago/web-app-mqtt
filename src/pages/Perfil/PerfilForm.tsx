import { FC, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { UserAttributes } from "../../models/user.model";

interface PerfilFormProps {
  data?: UserAttributes | null;
  onSubmit: (data: UserAttributes) => void;
}

const PerfilForm: FC<PerfilFormProps> = ({ data, onSubmit }) => {
  const [formState, setFormState] = useState<UserAttributes>(
    {} as UserAttributes
  );

  useEffect(() => {
    if (data) setFormState(data);
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
        value={formState.name || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="E-mail"
        name="email"
        value={formState.email || ""}
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

export default PerfilForm;
