export enum DeviceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  MAINTENANCE = "maintenance",
}

export const deviceStatus: { [key: string]: string } = {
  [DeviceStatus.ACTIVE]: "Ativo",
  [DeviceStatus.INACTIVE]: "Inativo",
  [DeviceStatus.MAINTENANCE]: "Manutenção",
};
