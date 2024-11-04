export interface NotificationData {
  title: string;
  message: string;
  dateTime: Date;
  userId: string;
  read: boolean;
}

export interface NotificationAttributes extends NotificationData {
  id: string;
}
