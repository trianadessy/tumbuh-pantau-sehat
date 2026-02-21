import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/components/layout/AppLayout";
import { User, Building2, Eye, Trash2, HardDrive, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

interface FacilitySettings {
  facilityName: string;
  facilityCode: string;
  address: string;
  contactPerson: string;
  phone: string;
}

const Settings = () => {
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();

  const [facilitySettings, setFacilitySettings] = useState<FacilitySettings>({
    facilityName: "Puskesmas Citeureup",
    facilityCode: "PKM-CTR-001",
    address: "Jl. Raya Citeureup No. 123, Bogor",
    contactPerson: "dr. Ani Suryani",
    phone: "0251-8234567"
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    largeText: false,
    highContrast: false,
  });

  const [storageInfo] = useState({ usedSpace: "2.3 MB", totalEntries: 147, pendingSync: 3 });

  const handleFacilityChange = (field: keyof FacilitySettings, value: string) => {
    setFacilitySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveFacility = () => {
    toast({ title: t("settings.facilitySaved"), description: t("settings.facilitySavedDesc") });
  };

  const handleSaveAccessibility = () => {
    toast({ title: t("settings.preferencesSaved"), description: t("settings.preferencesSavedDesc") });
  };

  const handleClearCache = () => {
    toast({ title: t("settings.cacheCleared"), description: t("settings.cacheClearedDesc") });
  };

  const handleLogout = () => {
    toast({ title: t("settings.logoutSuccess"), description: t("settings.logoutDesc"), variant: "destructive" });
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6" data-testid="settings-page">
        <div>
          <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
          <p className="text-muted-foreground">{t("settings.subtitle")}</p>
        </div>

        {/* Facility Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <CardTitle>{t("settings.facilityProfile")}</CardTitle>
            </div>
            <CardDescription>{t("settings.facilityProfileDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facility-name">{t("settings.facilityName")}</Label>
                <Input id="facility-name" value={facilitySettings.facilityName} onChange={(e) => handleFacilityChange("facilityName", e.target.value)} data-testid="facility-name-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facility-code">{t("settings.facilityCode")}</Label>
                <Input id="facility-code" value={facilitySettings.facilityCode} onChange={(e) => handleFacilityChange("facilityCode", e.target.value)} data-testid="facility-code-input" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">{t("settings.address")}</Label>
                <Input id="address" value={facilitySettings.address} onChange={(e) => handleFacilityChange("address", e.target.value)} data-testid="address-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-person">{t("settings.contactPerson")}</Label>
                <Input id="contact-person" value={facilitySettings.contactPerson} onChange={(e) => handleFacilityChange("contactPerson", e.target.value)} data-testid="contact-person-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("settings.phone")}</Label>
                <Input id="phone" value={facilitySettings.phone} onChange={(e) => handleFacilityChange("phone", e.target.value)} data-testid="phone-input" />
              </div>
            </div>
            <Button onClick={handleSaveFacility} data-testid="save-facility-button">{t("settings.saveFacility")}</Button>
          </CardContent>
        </Card>

        {/* Language & Accessibility */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <CardTitle>{t("settings.langAccessibility")}</CardTitle>
            </div>
            <CardDescription>{t("settings.langAccessibilityDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language">{t("settings.language")}</Label>
              <Select value={language} onValueChange={(val) => setLanguage(val as "id" | "en")}>
                <SelectTrigger data-testid="language-select"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">{t("lang.id")}</SelectItem>
                  <SelectItem value="en">{t("lang.en")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.largeText")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.largeTextDesc")}</p>
                </div>
                <Switch checked={accessibilitySettings.largeText} onCheckedChange={(checked) => setAccessibilitySettings(prev => ({ ...prev, largeText: checked }))} data-testid="large-text-switch" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.highContrast")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.highContrastDesc")}</p>
                </div>
                <Switch checked={accessibilitySettings.highContrast} onCheckedChange={(checked) => setAccessibilitySettings(prev => ({ ...prev, highContrast: checked }))} data-testid="high-contrast-switch" />
              </div>
            </div>

            <Button onClick={handleSaveAccessibility} data-testid="save-accessibility-button">{t("settings.savePreferences")}</Button>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              <CardTitle>{t("settings.storage")}</CardTitle>
            </div>
            <CardDescription>{t("settings.storageDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">{storageInfo.usedSpace}</div>
                <div className="text-xs text-muted-foreground">{t("settings.usedSpace")}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-accent">{storageInfo.totalEntries}</div>
                <div className="text-xs text-muted-foreground">{t("settings.totalEntries")}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-warning">{storageInfo.pendingSync}</div>
                <div className="text-xs text-muted-foreground">{t("settings.pendingSync")}</div>
              </div>
            </div>
            <Separator />
            <Button variant="outline" onClick={handleClearCache} className="w-full" data-testid="clear-cache-button">
              <Trash2 className="mr-2 h-4 w-4" />{t("settings.clearCache")}
            </Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="border-destructive/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>{t("settings.account")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleLogout} className="w-full" data-testid="logout-button">
              <LogOut className="mr-2 h-4 w-4" />{t("settings.logout")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
