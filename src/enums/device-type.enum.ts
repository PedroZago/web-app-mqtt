export enum DeviceType {
  NODE = "node",
  GATEWAY = "gateway",
}

export const deviceType: { [key: string]: string } = {
  [DeviceType.NODE]: "Node",
  [DeviceType.GATEWAY]: "Gateway",
};
