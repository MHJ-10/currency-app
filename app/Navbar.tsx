"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCoins } from "react-icons/fa";

const Navbar = () => {
  const navItems: { label: string; href: string }[] = [
    { label: "قیمت سکه", href: "/coins" },
    { label: "قیمت ارز", href: "/" },
    { label: "قیمت ارز دیجیتال", href: "/" },
  ];

  const pathName = usePathname();

  return (
    <nav className="relative">
      <div className="nav-img absolute inset-0 bg-cover bg-center"></div>

      <div className="w-full">
        <div className="relative mx-auto flex items-center justify-between px-5 py-6 text-white">
          <ul className="flex items-center justify-start gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={`${item.href === pathName && "font-bold"} text-slate-200`}
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
