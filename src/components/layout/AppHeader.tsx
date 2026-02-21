import { Wifi, WifiOff, Cloud, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface SyncStatusProps {
  status: "online" | "offline" | "syncing" | "error";
  className?: string;
}

const SyncStatus = ({ status, className }: SyncStatusProps) => {
  const { t } = useLanguage();
  
  const statusConfig = {
    online: { icon: Wifi, textKey: "sync.online" as const, bgColor: "bg-sync-online", animate: false },
    offline: { icon: WifiOff, textKey: "sync.offline" as const, bgColor: "bg-sync-offline", animate: false },
    syncing: { icon: Loader2, textKey: "sync.syncing" as const, bgColor: "bg-sync-syncing", animate: true },
    error: { icon: WifiOff, textKey: "sync.error" as const, bgColor: "bg-sync-error", animate: false },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-white",
      config.bgColor,
      className
    )}>
      <Icon size={12} className={config.animate ? "animate-spin" : ""} />
      <span>{t(config.textKey)}</span>
    </div>
  );
};

interface AppHeaderProps {
  syncStatus?: "online" | "offline" | "syncing" | "error";
  showSyncStatus?: boolean;
}

const AppHeader = ({ syncStatus = "online", showSyncStatus = true }: AppHeaderProps) => {
  return (
    <header 
      className="bg-app-header text-app-header-foreground px-4 py-3 flex items-center justify-between shadow-sm"
      data-testid="app-header"
    >
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">Tumbuh+</h1>
      </div>
      {showSyncStatus && (
        <div className="flex items-center gap-2">
          <SyncStatus status={syncStatus} />
        </div>
      )}
    </header>
  );
};

export { AppHeader, SyncStatus };
