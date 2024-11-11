export interface NotificationData {
  title: string;
  message: string;
  dateTime: string;
  userId: string;
  read: boolean;
}

export interface NotificationAttributes extends NotificationData {
  id: string;
}
