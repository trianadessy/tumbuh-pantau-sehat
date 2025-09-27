import { AppHeader } from "./AppHeader";
import BottomNav from "./BottomNav";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  syncStatus?: "online" | "offline" | "syncing" | "error";
  showSyncStatus?: boolean;
  className?: string;
}

const AppLayout = ({ 
  children, 
  syncStatus = "online", 
  showSyncStatus = true,
  className 
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader syncStatus={syncStatus} showSyncStatus={showSyncStatus} />
      
      <main 
        className={cn("flex-1 pb-16", className)}
        data-testid="main-content"
      >
        {children}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default AppLayout;