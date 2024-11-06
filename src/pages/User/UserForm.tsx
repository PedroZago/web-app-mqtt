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
import { UserAttributes } from "../../models/user.model";
import { UserRole } from "../../enums/user-role.enum";

interface UserFormProps {
  data?: UserAttributes | null;
  onSubmit: (data: UserAttributes) => void;
  userRoleOptions: { id: string; name: string }[];
}

const UserForm: FC<UserFormProps> = ({ data, onSubmit, userRoleOptions }) => {
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

  const handleUserRoleChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      role: event.target.value as any,
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
      <TextField
        label="E-mail"
        name="email"
        value={formState.email || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Função</InputLabel>
        <Select
          label="Função"
          name="role"
          value={formState.role || ""}
          onChange={handleUserRoleChange}
        >
          {userRoleOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
};

export default UserForm;
