"use client";

import { XCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface NotificationProps {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: (id: number) => void;
}

export default function NotificationItem({ id, message, type, onClose }: NotificationProps) {
  const getStyles = (type: "success" | "error" | "warning" | "info") => {
    switch (type) {
      case "success":
        return { border: "border-[#00BF63]", icon: <CheckCircle size={20} className="text-[#00BF63]" /> };
      case "error":
        return { border: "border-[#FF6B6B]", icon: <XCircle size={20} className="text-[#FF6B6B]" /> };
      case "warning":
        return { border: "border-[#FF9F1C]", icon: <AlertTriangle size={20} className="text-[#FF9F1C]" /> };
      default:
        return { border: "border-[#007BFF]", icon: <Info size={20} className="text-[#007BFF]" /> };
    }
  };

  const { border, icon } = getStyles(type);

  return (
    <div className={`relative flex items-center justify-between p-3 rounded-lg bg-white shadow-md ${border}`}>
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-sm text-primary3">{message}</p>
      </div>
      <button
        className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
        onClick={() => onClose(id)}
      >
        <XCircle size={16} />
      </button>
    </div>
  );
}
