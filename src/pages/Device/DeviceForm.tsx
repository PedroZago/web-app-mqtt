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
import { DeviceAttributes } from "../../models/device.model";
import { Option } from "../../interfaces/option";
import { DeviceType } from "../../enums/device-type.enum";
import { DeviceStatus } from "../../enums/device-status.enum";

interface DeviceFormProps {
  data?: DeviceAttributes | null;
  onSubmit: (data: DeviceAttributes) => void;
  animalsOptions: Option[];
  gatewaysOptions: Option[];
  deviceTypeOptions: Option[];
  deviceStatusOptions: Option[];
}

const DeviceForm: FC<DeviceFormProps> = ({
  data,
  onSubmit,
  animalsOptions,
  gatewaysOptions,
  deviceTypeOptions,
  deviceStatusOptions,
}) => {
  const [formState, setFormState] = useState<DeviceAttributes>(
    {} as DeviceAttributes
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data) setFormState(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAnimalChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      animalId: event.target.value as string,
    }));
  };

  const handleGatewayChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      gatewayId: event.target.value as string,
    }));
  };

  const handleDeviceTypeChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      type: event.target.value as DeviceType,
    }));
  };

  const handleDeviceStatusChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      status: event.target.value as DeviceStatus,
    }));
  };

  const handleDateChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      activationDate: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.serialNumber)
      newErrors.serialNumber = "Serial Number é obrigatório";
    if (!formState.status) newErrors.status = "Status é obrigatório";
    if (
      formState.batteryLevel === undefined ||
      formState.batteryLevel < 0 ||
      formState.batteryLevel > 100
    )
      newErrors.batteryLevel = "Nível de bateria deve ser entre 0 e 100";
    if (!formState.type) newErrors.type = "Tipo de dispositivo é obrigatório";
    if (!formState.animalId) newErrors.animalId = "Animal é obrigatório";
    if (!formState.model) newErrors.model = "Modelo é obrigatório";
    if (!formState.activationDate) {
      newErrors.activationDate = "Data de ativação é obrigatória";
    } else if (new Date(formState.activationDate) > new Date()) {
      newErrors.activationDate = "Data de ativação não pode ser no futuro";
    }
    if (formState.type === DeviceType.NODE && !formState.gatewayId)
      newErrors.gatewayId =
        "Gateway é obrigatório para dispositivos do tipo NODE";

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
        label="Serial Number"
        name="serialNumber"
        value={formState.serialNumber || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.serialNumber}
        helperText={errors.serialNumber}
      />
      <FormControl fullWidth margin="normal" error={!!errors.status}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          name="status"
          value={formState.status || ""}
          onChange={handleDeviceStatusChange}
        >
          {deviceStatusOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {errors.status && (
          <FormHelperText style={{ color: "red" }}>
            {errors.status}
          </FormHelperText>
        )}
      </FormControl>
      <TextField
        label="Nível de bateria"
        name="batteryLevel"
        value={formState.batteryLevel || ""}
        type="number"
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.batteryLevel}
        helperText={errors.batteryLevel}
        slotProps={{
          htmlInput: {
            type: "number",
            min: 0,
            max: 100,
          },
        }}
      />
      <FormControl fullWidth margin="normal" error={!!errors.type}>
        <InputLabel>Tipo de dispositivo</InputLabel>
        <Select
          label="Tipo de dispositivo"
          name="type"
          value={formState.type || ""}
          onChange={handleDeviceTypeChange}
        >
          {deviceTypeOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {errors.type && (
          <FormHelperText style={{ color: "red" }}>
            {errors.type}
          </FormHelperText>
        )}
      </FormControl>

      {formState.type === DeviceType.NODE && (
        <FormControl fullWidth margin="normal" error={!!errors.gatewayId}>
          <InputLabel>Gateway</InputLabel>
          <Select
            label="Gateway"
            name="gatewayId"
            value={formState.gatewayId || ""}
            onChange={handleGatewayChange}
          >
            {gatewaysOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {errors.gatewayId && (
            <FormHelperText style={{ color: "red" }}>
              {errors.gatewayId}
            </FormHelperText>
          )}
        </FormControl>
      )}

      <FormControl fullWidth margin="normal" error={!!errors.animalId}>
        <InputLabel>Animal</InputLabel>
        <Select
          label="Animal"
          name="animalId"
          value={formState.animalId || ""}
          onChange={handleAnimalChange}
        >
          {animalsOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {errors.animalId && (
          <FormHelperText style={{ color: "red" }}>
            {errors.animalId}
          </FormHelperText>
        )}
      </FormControl>
      <TextField
        label="Modelo"
        name="model"
        value={formState.model || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.model}
        helperText={errors.model}
      />
      <TextField
        label="Data de Ativação"
        name="activationDate"
        type="date"
        value={
          formState.activationDate
            ? formState.activationDate.substring(0, 10)
            : ""
        }
        onChange={(e) => handleDateChange(e.target.value)}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
        error={!!errors.activationDate}
        helperText={errors.activationDate}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </form>
  );
};

export default DeviceForm;
