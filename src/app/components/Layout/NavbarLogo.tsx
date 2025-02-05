import Link from "next/link";
import Image from "next/image";

export default function NavbarLogo() {
  return (
    <div className="mb-6 flex items-center">
      <Link href="/" className="hover:opacity-80 flex items-center gap-2">
        {/* Logo con Next.js Image */}
        <Image 
          src="/LOGO_CALLMASTER.png"
          alt="CallMaster Logo" 
          width={100} 
          height={100} 
          className="rounded-md" 
        />
        {/* Nombre de la marca */}
        <span className="text-3xl font-bold text-primary1"></span>
      </Link>
    </div>
  );
}
