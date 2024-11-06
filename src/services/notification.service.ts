import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import {
  NotificationData,
  NotificationAttributes,
} from "../models/notification.model";

const API_URL = "/notifications";

export const useNotificationService = () => {
  const apiPrivate = useAxiosPrivate();

  const fetchNotifications = async (): Promise<NotificationAttributes[]> => {
    const response = await apiPrivate.get(API_URL);
    return response.data;
  };

  const fetchNotificationById = async (
    id: string
  ): Promise<NotificationAttributes> => {
    const response = await apiPrivate.get(`${API_URL}/${id}`);
    return response.data;
  };

  const createNotification = async (notification: NotificationData) => {
    await apiPrivate.post(API_URL, notification);
  };

  const updateNotification = async (notification: NotificationAttributes) => {
    await apiPrivate.put(`${API_URL}/${notification.id}`, notification);
  };

  const deleteNotification = async (id: string) => {
    await apiPrivate.delete(`${API_URL}/${id}`);
  };

  return {
    fetchNotifications,
    fetchNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
  };
};
