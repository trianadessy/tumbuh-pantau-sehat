import { Home, Users, Camera, BarChart, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

const BottomNav = () => {
  const { t } = useLanguage();

  const navItems = [
    { to: "/home", icon: Home, label: t("nav.home"), testId: "nav-home" },
    { to: "/tasks", icon: Users, label: t("nav.tasks"), testId: "nav-tasks" },
    { to: "/camera", icon: Camera, label: t("nav.camera"), testId: "nav-camera" },
    { to: "/reports", icon: BarChart, label: t("nav.reports"), testId: "nav-reports" },
    { to: "/profile", icon: Settings, label: t("nav.profile"), testId: "nav-profile" }
  ];

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
