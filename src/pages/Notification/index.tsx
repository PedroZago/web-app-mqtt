import { FC, useCallback, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import { NotificationAttributes } from "../../models/notification.model";
import { useNotificationService } from "../../services/notification.service";
import moment from "moment";

const NotificationsPage: FC = () => {
  const [notificationData, setNotificationData] = useState<
    NotificationAttributes[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { deleteNotification, fetchNotifications } = useNotificationService();

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const notifications = await fetchNotifications();
      setNotificationData(notifications);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteNotification(id);
      loadNotifications();
    } catch (error) {
      console.error("Erro ao deletar notificação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRUDPage
      title="Notificações"
      columns={[
        { field: "id", headerName: "ID" },
        { field: "title", headerName: "Título" },
        { field: "message", headerName: "Mensagem" },
        {
          field: "dateTime",
          headerName: "Data e Hora",
          renderCell: (params) =>
            moment.parseZone(params?.row?.dateTime).format("DD/MM/YYYY"),
        },
        { field: "userId", headerName: "Usuário" },
        {
          field: "read",
          headerName: "Já lido?",
          renderCell: (params) => (params?.row?.read ? "Sim" : "Não"),
        },
      ]}
      data={notificationData}
      onDelete={handleDelete}
      loading={loading}
    />
  );
};

export default NotificationsPage;
