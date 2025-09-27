import { Wifi, WifiOff, Cloud, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SyncStatusProps {
  status: "online" | "offline" | "syncing" | "error";
  className?: string;
}

const SyncStatus = ({ status, className }: SyncStatusProps) => {
  const statusConfig = {
    online: { 
      icon: Wifi, 
      text: "Online", 
      bgColor: "bg-sync-online",
      textColor: "text-white",
      animate: false
    },
    offline: { 
      icon: WifiOff, 
      text: "Offline", 
      bgColor: "bg-sync-offline",
      textColor: "text-white",
      animate: false
    },
    syncing: { 
      icon: Loader2, 
      text: "Menyinkronkan", 
      bgColor: "bg-sync-syncing",
      textColor: "text-white",
      animate: true
    },
    error: { 
      icon: WifiOff, 
      text: "Gagal Sinkron", 
      bgColor: "bg-sync-error",
      textColor: "text-white",
      animate: false
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
      config.bgColor,
      config.textColor,
      className
    )}>
      <Icon 
        size={12} 
        className={config.animate ? "animate-spin" : ""} 
      />
      <span>{config.text}</span>
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