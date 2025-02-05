import { create } from "zustand";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

const useNotificationsStore = create<NotificationStore>((set) => ({
  notifications: [], // almacena la lista de notificaciones
  addNotification: (message, type) => // agrega una nueva
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), message, type },
      ],
    })),
  removeNotification: (id) => // eliminamos una especifica
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

export default useNotificationsStore;
