"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import NotificationItem from "./NotificacionItem";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);



  const mockMessages = [
    { message: "Operación completada con éxito", type: "success" },
    { message: "Hubo un problema con la solicitud", type: "error" },
    { message: "Atención: cambios pendientes", type: "warning" },
    { message: "Hay una actualización disponible", type: "info" },
  ] as const; // as a const para evitar el error del tipo any
  

  // Se genera una notifacion aleatoria
  const addMockNotification = () => {
    const random = mockMessages[Math.floor(Math.random() * mockMessages.length)];
    const newNotification: Notification = {
      id: Date.now(), // Se genera un nuevo ID sin sobrescribir
      message: random.message,
      type: random.type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
<div className="fixed left-20 top-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg p-4 transition-all duration-300 z-40">
<h2 className="text-lg font-semibold text-primary1 dark:text-primary2">
        Notificaciones
      </h2>
      <p className="text-secondary1 dark:text-secondary2">
        Aquí aparecerán las notificaciones del sistema.
      </p>

      <button
        onClick={addMockNotification}
        className="mt-2 p-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <PlusCircle size={18} />
        Generar Notificación
      </button>

      <div className="mt-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="p-4 border border-secondary1 rounded-lg">
            <p className="text-sm text-gray-500">No hay notificaciones por ahora.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={removeNotification}
            />
          ))
        )}
      </div>
    </div>
  );
}
