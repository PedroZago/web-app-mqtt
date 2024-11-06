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
import { DeviceAttributes } from "../../models/device.model";
import { DeviceType } from "../../enums/device-type.enum";
import { DeviceStatus } from "../../enums/device-status.enum";

interface DeviceFormProps {
  data?: DeviceAttributes | null;
  onSubmit: (data: DeviceAttributes) => void;
  animalsOptions: { id: string; name: string }[];
  gatewaysOptions: { id: string; name: string }[];
  deviceTypeOptions: { id: string; name: string }[];
  deviceStatusOptions: { id: string; name: string }[];
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

  const handleDeviceTypeChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      type: event.target.value as any,
    }));
  };

  const handleDeviceStatusChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      status: event.target.value as any,
    }));
  };

  const handleGatewayChange = (event: SelectChangeEvent<string>) => {
    setFormState((prevState) => ({
      ...prevState,
      gatewayId: event.target.value as string,
    }));
  };

  const handleDateChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      activationDate: value ? new Date(value) : undefined,
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
        label="Serial Number"
        name="serialNumber"
        value={formState.serialNumber || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
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
      </FormControl>
      <TextField
        label="Nível de bateria"
        name="batteryLevel"
        value={formState.batteryLevel || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
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
      </FormControl>
      <FormControl fullWidth margin="normal">
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
      </FormControl>
      <FormControl fullWidth margin="normal">
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
      </FormControl>
      <TextField
        label="Modelo"
        name="model"
        value={formState.model || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Data de Ativação"
        name="activationDate"
        type="date"
        value={
          formState.activationDate
            ? new Date(formState.activationDate).toISOString().split("T")[0]
            : ""
        }
        onChange={(e) => handleDateChange(e.target.value)}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
};

export default DeviceForm;
