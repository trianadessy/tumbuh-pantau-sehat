import { Home, Users, AlertTriangle, Heart, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { 
    to: "/", 
    icon: Home, 
    label: "Beranda", 
    testId: "nav-beranda" 
  },
  { 
    to: "/anak", 
    icon: Users, 
    label: "Anak", 
    testId: "nav-anak" 
  },
  { 
    to: "/risiko", 
    icon: AlertTriangle, 
    label: "Risiko", 
    testId: "nav-risiko" 
  },
  { 
    to: "/maternal", 
    icon: Heart, 
    label: "Maternal", 
    testId: "nav-maternal" 
  },
  { 
    to: "/pengaturan", 
    icon: Settings, 
    label: "Pengaturan", 
    testId: "nav-pengaturan" 
  },
];

const BottomNav = () => {
  return (
    <nav 
      className="bg-bottom-nav border-t border-border fixed bottom-0 left-0 right-0 z-50"
      data-testid="bottom-nav"
    >
      <div className="flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={item.testId}
              className={({ isActive }) =>
                cn(
                  "flex-1 flex flex-col items-center justify-center px-2 py-2 text-xs font-medium transition-colors min-h-[60px]",
                  isActive
                    ? "text-bottom-nav-active bg-primary/5"
                    : "text-bottom-nav-foreground hover:text-bottom-nav-active hover:bg-primary/5"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={20} 
                    className={cn(
                      "mb-1",
                      isActive ? "text-bottom-nav-active" : "text-bottom-nav-foreground"
                    )} 
                  />
                  <span className={cn(
                    isActive ? "text-bottom-nav-active" : "text-bottom-nav-foreground"
                  )}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;