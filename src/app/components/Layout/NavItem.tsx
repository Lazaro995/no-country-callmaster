import Link from "next/link";

type NavItemProps = {
  href: string;
  label: string;
};

export default function NavItem({ href, label } : NavItemProps) {
  return (
    <li className="w-full">
      <Link
       href={href}
       className="flex items-center justify-start p-3 w-full text-lg hover:bg-secondary1 hover:text-primary3 transition-all duration-300 rounded-lg"

        aria-label={`Ir a ${label}`}
        >
          {label}
      </Link>
    </li>
  );
}