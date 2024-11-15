import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface TextInputProps extends TextFieldProps<"outlined"> {
  showPassword?: boolean;
  toggleShowPassword?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  value,
  error,
  helperText,
  onChange,
  onBlur,
  showPassword,
  toggleShowPassword,
  ...props
}) => (
  <TextField
    {...props}
    fullWidth
    margin="normal"
    id={id}
    name={id}
    label={label}
    type={showPassword ? "text" : type}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    helperText={helperText}
    slotProps={{
      input: {
        endAdornment: type === "password" && toggleShowPassword && (
          <InputAdornment position="end" sx={{ justifyContent: "flex-end" }}>
            <IconButton onClick={toggleShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
    }}
  />
);

export default TextInput;
