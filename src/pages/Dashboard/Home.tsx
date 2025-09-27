import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/components/layout/AppLayout";
import { SyncStatus } from "@/components/layout/AppHeader";
import { 
  Plus, 
  Search, 
  AlertTriangle, 
  Download, 
  RefreshCw, 
  Calendar,
  TrendingUp,
  Users,
  Camera
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [syncStatus, setSyncStatus] = useState<"online" | "offline" | "syncing" | "error">("online");
  const [lastSync] = useState("12 Nov 2024, 14:30");

  const handleSync = async () => {
    setSyncStatus("syncing");
    
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus("online");
      toast({
        title: "Sinkronisasi selesai",
        description: "3 entri berhasil disinkronkan ke server",
      });
    }, 2000);
  };

  const quickActions = [
    {
      title: "Pindai",
      description: "Pengukuran kamera",
      icon: Camera,
      color: "bg-primary",
      textColor: "text-primary-foreground",
      action: () => navigate("/camera"),
      testId: "quick-action-camera"
    },
    {
      title: "Cari Kasus",
      description: "Riwayat anak",
      icon: Search,
      color: "bg-accent",
      textColor: "text-accent-foreground",
      action: () => navigate("/anak"),
      testId: "quick-action-search"
    },
    {
      title: "Ekspor e-PPGBM",
      description: "Unduh laporan",
      icon: Download,
      color: "bg-secondary",
      textColor: "text-secondary-foreground",
      action: () => navigate("/reports"),
      testId: "quick-action-export"
    },
    {
      title: "Sinkronkan",
      description: "Sinkron data",
      icon: RefreshCw,
      color: "bg-muted",
      textColor: "text-muted-foreground",
      action: handleSync,
      testId: "quick-action-sync"
    }
  ];

  const stats = [
    { label: "Anak Dipantau", value: "156", icon: Users, color: "text-primary" },
    { label: "% Tindak Lanjut ≤14 Hari", value: "87%", icon: TrendingUp, color: "text-success" },
    { label: "Flag Aktif", value: "23", icon: AlertTriangle, color: "text-warning" }
  ];

  return (
    <AppLayout syncStatus={syncStatus}>
      <div className="container mx-auto p-4 space-y-6" data-testid="home-page">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Selamat Datang</h1>
          <p className="text-muted-foreground">
            Pantau pertumbuhan anak dan deteksi dini risiko stunting
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-4">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={action.action}
                  data-testid={action.testId}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className={`h-5 w-5 ${action.textColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-tight">
                          {action.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sync Status Card */}
        <Card data-testid="sync-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Status Sinkronisasi</CardTitle>
              <SyncStatus status={syncStatus} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Terakhir disinkronkan:</span>
              <span className="font-medium">{lastSync}</span>
            </div>
            
            <Button 
              onClick={handleSync}
              disabled={syncStatus === "syncing"}
              className="w-full"
              data-testid="sync-button"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
              {syncStatus === "syncing" ? "Menyinkronkan..." : "Sinkronkan Sekarang"}
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-status-risk/20 bg-status-risk/5" data-testid="notifications">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-status-risk flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-sm">Perhatian</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  3 anak berisiko menunggu tindak lanjut dalam 14 hari ke depan
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-status-risk hover:text-status-risk/80 mt-2"
                  onClick={() => navigate("/tasks")}
                >
                  Lihat Detail →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Home;