export interface MessageData {
  temperature: number;
  heartRate: number;
  behavior: string;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
}

export interface TelemetryData {
  topic: string;
  message: MessageData;
  deviceId: string;
}

export interface TelemetryAttributes extends TelemetryData {
  id: string;
}
