import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/components/layout/AppLayout";
import { 
  User, 
  Building2, 
  Globe, 
  Eye, 
  Trash2, 
  HardDrive,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FacilitySettings {
  facilityName: string;
  facilityCode: string;
  address: string;
  contactPerson: string;
  phone: string;
}

interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  language: string;
}

const Settings = () => {
  const { toast } = useToast();
  
  const [facilitySettings, setFacilitySettings] = useState<FacilitySettings>({
    facilityName: "Puskesmas Citeureup",
    facilityCode: "PKM-CTR-001",
    address: "Jl. Raya Citeureup No. 123, Bogor",
    contactPerson: "dr. Ani Suryani",
    phone: "0251-8234567"
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    largeText: false,
    highContrast: false,
    language: "id"
  });

  const [storageInfo] = useState({
    usedSpace: "2.3 MB",
    totalEntries: 147,
    pendingSync: 3
  });

  const handleFacilityChange = (field: keyof FacilitySettings, value: string) => {
    setFacilitySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAccessibilityChange = (field: keyof AccessibilitySettings, value: string | boolean) => {
    setAccessibilitySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveFacility = () => {
    toast({
      title: "Pengaturan tersimpan",
      description: "Informasi fasilitas berhasil diperbarui",
    });
  };

  const handleSaveAccessibility = () => {
    toast({
      title: "Preferensi disimpan", 
      description: "Pengaturan aksesibilitas berhasil diperbarui",
    });
  };

  const handleClearCache = () => {
    toast({
      title: "Cache dibersihkan",
      description: "Data cache aplikasi berhasil dihapus",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Keluar berhasil",
      description: "Anda akan diarahkan ke halaman login",
      variant: "destructive"
    });
    // Redirect logic would go here
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6" data-testid="settings-page">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Pengaturan</h1>
          <p className="text-muted-foreground">
            Kelola profil fasilitas dan preferensi aplikasi
          </p>
        </div>

        {/* Facility Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <CardTitle>Profil Fasilitas</CardTitle>
            </div>
            <CardDescription>
              Informasi fasilitas kesehatan dan kontak penanggung jawab
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facility-name">Nama Fasilitas</Label>
                <Input
                  id="facility-name"
                  value={facilitySettings.facilityName}
                  onChange={(e) => handleFacilityChange("facilityName", e.target.value)}
                  data-testid="facility-name-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facility-code">Kode Faskes</Label>
                <Input
                  id="facility-code"
                  value={facilitySettings.facilityCode}
                  onChange={(e) => handleFacilityChange("facilityCode", e.target.value)}
                  data-testid="facility-code-input"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  value={facilitySettings.address}
                  onChange={(e) => handleFacilityChange("address", e.target.value)}
                  data-testid="address-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-person">Penanggung Jawab</Label>
                <Input
                  id="contact-person"
                  value={facilitySettings.contactPerson}
                  onChange={(e) => handleFacilityChange("contactPerson", e.target.value)}
                  data-testid="contact-person-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={facilitySettings.phone}
                  onChange={(e) => handleFacilityChange("phone", e.target.value)}
                  data-testid="phone-input"
                />
              </div>
            </div>

            <Button 
              onClick={handleSaveFacility}
              data-testid="save-facility-button"
            >
              Simpan Profil Fasilitas
            </Button>
          </CardContent>
        </Card>

        {/* Language & Accessibility */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <CardTitle>Bahasa & Aksesibilitas</CardTitle>
            </div>
            <CardDescription>
              Preferensi tampilan dan kemudahan akses aplikasi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language">Bahasa</Label>
              <Select 
                value={accessibilitySettings.language} 
                onValueChange={(value) => handleAccessibilityChange("language", value)}
              >
                <SelectTrigger data-testid="language-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Teks Besar</Label>
                  <p className="text-sm text-muted-foreground">
                    Perbesar ukuran teks untuk kemudahan membaca
                  </p>
                </div>
                <Switch
                  checked={accessibilitySettings.largeText}
                  onCheckedChange={(checked) => handleAccessibilityChange("largeText", checked)}
                  data-testid="large-text-switch"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Kontras Tinggi</Label>
                  <p className="text-sm text-muted-foreground">
                    Tingkatkan kontras warna untuk visibilitas yang lebih baik
                  </p>
                </div>
                <Switch
                  checked={accessibilitySettings.highContrast}
                  onCheckedChange={(checked) => handleAccessibilityChange("highContrast", checked)}
                  data-testid="high-contrast-switch"
                />
              </div>
            </div>

            <Button 
              onClick={handleSaveAccessibility}
              data-testid="save-accessibility-button"
            >
              Simpan Preferensi
            </Button>
          </CardContent>
        </Card>

        {/* Storage Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              <CardTitle>Status Penyimpanan Lokal</CardTitle>
            </div>
            <CardDescription>
              Informasi penggunaan ruang penyimpanan offline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">{storageInfo.usedSpace}</div>
                <div className="text-xs text-muted-foreground">Ruang Terpakai</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-accent">{storageInfo.totalEntries}</div>
                <div className="text-xs text-muted-foreground">Total Entri</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-warning">{storageInfo.pendingSync}</div>
                <div className="text-xs text-muted-foreground">Menunggu Sinkron</div>
              </div>
            </div>

            <Separator />

            <Button 
              variant="outline" 
              onClick={handleClearCache}
              className="w-full"
              data-testid="clear-cache-button"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Bersihkan Cache Aplikasi
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-destructive/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Akun</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="w-full"
              data-testid="logout-button"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Keluar dari Aplikasi
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;