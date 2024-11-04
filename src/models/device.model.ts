import { DeviceStatus } from "../enums/device-status.enum";
import { DeviceType } from "../enums/device-type.enum";

export interface DeviceData {
  serialNumber: string;
  status: DeviceStatus;
  batteryLevel?: number;
  type?: DeviceType;
  gatewayId?: string;
  animalId?: string;
  model: string;
  activationDate?: Date;
}

export interface DeviceAttributes extends DeviceData {
  id: string;
}
