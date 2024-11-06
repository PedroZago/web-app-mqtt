import { DeviceData, DeviceAttributes } from "../models/device.model";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const API_URL = "/devices";

export const useDeviceService = () => {
  const apiPrivate = useAxiosPrivate();

  const fetchDevices = async (): Promise<DeviceAttributes[]> => {
    const response = await apiPrivate.get(API_URL);
    return response.data;
  };

  const fetchDeviceById = async (id: string): Promise<DeviceAttributes> => {
    const response = await apiPrivate.get(`${API_URL}/${id}`);
    return response.data;
  };

  const createDevice = async (device: DeviceData) => {
    await apiPrivate.post(API_URL, device);
  };

  const updateDevice = async (device: DeviceAttributes) => {
    await apiPrivate.put(`${API_URL}/${device.id}`, device);
  };

  const deleteDevice = async (id: string) => {
    await apiPrivate.delete(`${API_URL}/${id}`);
  };

  return {
    fetchDevices,
    fetchDeviceById,
    createDevice,
    updateDevice,
    deleteDevice,
  };
};
