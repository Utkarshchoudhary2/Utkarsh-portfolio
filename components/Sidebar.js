import { Home, User, FileText, Mail } from "lucide-react";

const navItems = [
  { icon: <Home size={22} />, label: "Home", href: "#home" },
  { icon: <User size={22} />, label: "About", href: "#about" },
  { icon: <FileText size={22} />, label: "Resume", href: "/resume.pdf" },
  { icon: <Mail size={22} />, label: "Contact", href: "#contact" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-16 bg-[#0f172a] flex flex-col items-center py-6 space-y-8 shadow-lg">
      {navItems.map((item, i) => (
        <a
          key={i}
          href={item.href}
          target={item.label === "Resume" ? "_blank" : "_self"}
          className="flex flex-col items-center text-gray-300 hover:text-blue-400"
        >
          {item.icon}
          <span className="text-[10px] mt-1">{item.label}</span>
        </a>
      ))}
    </aside>
  );
}