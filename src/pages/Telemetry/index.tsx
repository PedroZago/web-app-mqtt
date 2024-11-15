import { FC, useCallback, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { MessageData, TelemetryAttributes } from "../../models/telemetry.model";
import { useTelemetryService } from "../../services/telemetry.service";

const TelemetriesPage: FC = () => {
  const [telemetryData, setTelemetryData] = useState<TelemetryAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTelemetry, setSelectedTelemetry] =
    useState<TelemetryAttributes | null>(null);

  const { fetchTelemetries } = useTelemetryService();

  const loadTelemetries = useCallback(async () => {
    setLoading(true);
    try {
      const telemetries = await fetchTelemetries();
      setTelemetryData(telemetries);
    } catch (error) {
      console.error("Erro ao carregar telemetria:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTelemetries();
  }, [loadTelemetries]);

  const handleOpenModal = (telemetry: TelemetryAttributes) => {
    setSelectedTelemetry(telemetry);
  };

  const handleCloseModal = () => {
    setSelectedTelemetry(null);
  };

  const formatMessage = (message: MessageData) => {
    const translationMap: { [key: string]: string } = {
      speed: "Velocidade",
      altitude: "Altitude",
      behavior: "Comportamento",
      latitude: "Latitude",
      heartRate: "Frequência Cardíaca",
      longitude: "Longitude",
      temperature: "Temperatura",
    };

    const unitMap: { [key: string]: string } = {
      speed: "km/h",
      altitude: "m",
      heartRate: "bpm",
      latitude: "°",
      longitude: "°",
      temperature: "°C",
    };

    return Object.keys(message)
      .map((key) => {
        const translatedKey = translationMap[key] || key;
        const value = message[key as keyof MessageData];
        const unit = unitMap[key as keyof MessageData];

        const formattedValue =
          typeof value === "number" ? `${value.toFixed(2)}${unit}` : value;

        return `${translatedKey}: ${formattedValue}`;
      })
      .join("\n");
  };

  return (
    <>
      <CRUDPage
        title="Telemetria"
        columns={[
          { field: "id", headerName: "ID" },
          { field: "topic", headerName: "Tópico" },
          {
            field: "message",
            headerName: "Mensagem",
            renderCell: (params) => {
              return (
                <Button onClick={() => handleOpenModal(params.row)}>
                  Ver Detalhes
                </Button>
              );
            },
          },
          {
            field: "deviceId",
            headerName: "Dispositivo",
            renderCell: (params) =>
              `${params?.row?.device?.model} - ${params?.row?.device?.serialNumber}`,
          },
        ]}
        data={telemetryData}
        loading={loading}
      />

      {selectedTelemetry && (
        <Dialog open={!!selectedTelemetry} onClose={handleCloseModal}>
          <DialogTitle>Detalhes da Telemetria</DialogTitle>
          <DialogContent>
            <Typography>
              <strong>Tópico:</strong> {selectedTelemetry.topic}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>Mensagem:</strong>
            </Typography>
            <pre>{formatMessage(selectedTelemetry.message)}</pre>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Fechar</Button>
          </DialogActions>
        </Dialog>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default TelemetriesPage;
