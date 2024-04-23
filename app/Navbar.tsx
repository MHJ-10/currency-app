"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCoins } from "react-icons/fa";

const Navbar = () => {
  const navItems: { label: string; href: string }[] = [
    { label: "قیمت سکه", href: "/coins" },
    { label: "قیمت ارز", href: "/currency" },
    { label: "قیمت ارز دیجیتال", href: "/crypto" },
  ];

  const pathName = usePathname();

  return (
    <nav className="relative">
      <div className="nav-img absolute inset-0 bg-cover bg-center"></div>

      <div className="container mx-auto w-full">
        <div className="relative z-10 mx-auto flex items-center justify-between px-5 py-6 text-white">
          <ul className="flex items-center justify-start gap-6 text-sm sm:text-base">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={`${item.href === pathName && "font-bold text-yellow-500"} text-slate-200 hover:text-yellow-600`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link className="text-yellow-500 hover:text-yellow-600" href="/">
            <FaCoins size={30} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
