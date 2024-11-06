import { FC, useCallback, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import DeviceForm from "./DeviceForm";
import { DeviceAttributes } from "../../models/device.model";
import { useDeviceService } from "../../services/device.service";
import { useAnimalService } from "../../services/animal.service";
import moment from "moment";
import { DeviceType, deviceType } from "../../enums/device-type.enum";
import { DeviceStatus, deviceStatus } from "../../enums/device-status.enum";

const DevicesPage: FC = () => {
  const [deviceData, setDeviceData] = useState<DeviceAttributes[]>([]);
  const [animalsOptions, setAnimalsOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [gatewaysOptions, setGatewaysOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { createDevice, deleteDevice, fetchDevices, updateDevice } =
    useDeviceService();

  const { fetchAnimals } = useAnimalService();

  const loadDevices = useCallback(async () => {
    setLoading(true);
    try {
      const devices = await fetchDevices();
      setDeviceData(devices);
      setGatewaysOptions(
        devices.map((device) => ({
          id: device.id,
          name: `${device.model} - ${device.serialNumber}`,
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar animais:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const animals = await fetchAnimals();
      setAnimalsOptions(animals);
    } catch (error) {
      console.error("Erro ao carregar espécies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deviceTypeOptions: { id: string; name: string }[] = Object.entries(
    DeviceType
  ).map(([_, value]) => ({
    id: value,
    name: deviceType[value],
  }));

  const deviceStatusOptions: { id: string; name: string }[] = Object.entries(
    DeviceStatus
  ).map(([_, value]) => ({
    id: value,
    name: deviceStatus[value],
  }));

  useEffect(() => {
    loadDevices();
    loadAnimals();
  }, [loadDevices, loadAnimals]);

  const handleCreate = async (data: DeviceAttributes) => {
    setLoading(true);
    try {
      await createDevice(data);
      loadDevices();
    } catch (error) {
      console.error("Erro ao criar device:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data: DeviceAttributes) => {
    setLoading(true);
    try {
      await updateDevice(data);
      loadDevices();
    } catch (error) {
      console.error("Erro ao editar device:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteDevice(id);
      loadDevices();
    } catch (error) {
      console.error("Erro ao deletar device:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRUDPage
      title="Dispositivo"
      columns={[
        { field: "id", headerName: "ID" },
        { field: "serialNumber", headerName: "Serial Number" },
        {
          field: "status",
          headerName: "Status",
          renderCell: (params) =>
            deviceStatus[params.row.status] || params.row.status,
        },
        { field: "batteryLevel", headerName: "Nível de bateria" },
        {
          field: "type",
          headerName: "Tipo de dispositivo",
          renderCell: (params) =>
            deviceType[params.row.type] || params.row.type,
        },
        {
          field: "gatewayId",
          headerName: "Gateway",
          renderCell: (params) =>
            params?.row?.gateway
              ? `${params?.row?.gateway?.model} - ${params?.row?.gateway?.serialNumber}`
              : "-",
        },
        {
          field: "animalId",
          headerName: "Animal",
          renderCell: (params) => params?.row?.animal?.name,
        },
        { field: "model", headerName: "Modelo" },
        {
          field: "activationDate",
          headerName: "Data de Ativação",
          renderCell: (params) =>
            moment(params?.row?.activationDate).format("DD/MM/YYYY"),
        },
      ]}
      data={deviceData}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={(props) => (
        <DeviceForm
          {...props}
          animalsOptions={animalsOptions}
          gatewaysOptions={gatewaysOptions}
          deviceTypeOptions={deviceTypeOptions}
          deviceStatusOptions={deviceStatusOptions}
        />
      )}
      loading={loading}
    />
  );
};

export default DevicesPage;
