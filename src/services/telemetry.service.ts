import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { TelemetryData, TelemetryAttributes } from "../models/telemetry.model";

const API_URL = "/telemetries";

export const useTelemetryService = () => {
  const apiPrivate = useAxiosPrivate();

  const fetchTelemetries = async (): Promise<TelemetryAttributes[]> => {
    const response = await apiPrivate.get(API_URL);
    return response.data;
  };

  const fetchTelemetryById = async (
    id: string
  ): Promise<TelemetryAttributes> => {
    const response = await apiPrivate.get(`${API_URL}/${id}`);
    return response.data;
  };

  const createTelemetry = async (telemetry: TelemetryData) => {
    await apiPrivate.post(API_URL, telemetry);
  };

  const updateTelemetry = async (telemetry: TelemetryAttributes) => {
    await apiPrivate.put(`${API_URL}/${telemetry.id}`, telemetry);
  };

  const deleteTelemetry = async (id: string) => {
    await apiPrivate.delete(`${API_URL}/${id}`);
  };

  return {
    fetchTelemetries,
    fetchTelemetryById,
    createTelemetry,
    updateTelemetry,
    deleteTelemetry,
  };
};
