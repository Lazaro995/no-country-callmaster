"use client";
import { useState } from "react";
import { Home, Phone, FileText, AlertTriangle, UserCog } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Dashboard", icon: <Home size={24} /> },
  { href: "/calls", label: "Calls", icon: <Phone size={24} /> },
  { href: "/reports", label: "Reportes", icon: <FileText size={24} /> },
  { href: "/incident", label: "Incidentes", icon: <AlertTriangle size={24} /> },
  { href: "/admin", label: "Admin", icon: <UserCog size={24} /> },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav
      className={`h-screen ${isExpanded ? "w-64" : "w-20"} bg-primary1 text-white flex flex-col py-6 shadow-lg fixed left-0 top-0 transition-all duration-300 z-50`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <NavbarLogo />

      <ul className="mt-10 flex flex-col gap-4">
        {navLinks.map(({ href, label, icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-primary3 transition duration-300"
            >
              {icon}
              {isExpanded && <span className="text-sm">{label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
