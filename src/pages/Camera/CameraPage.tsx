import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/components/layout/AppLayout";
import AnthropometricCamera from "@/components/camera/AnthropometricCamera";
import { Camera, Calculator, AlertTriangle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

interface AnthropometricMeasurements {
  weight: number;
  height: number;
  bodyLength: number;
  headCircumference: number;
  upperArmCircumference: number;
  confidence: number;
}

interface MaternalData {
  motherName: string;
  gestationalAge: string;
  tfu: string;
  notes: string;
}

const CameraPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showAnthropometricCamera, setShowAnthropometricCamera] = useState(false);
  const [showMaternalForm, setShowMaternalForm] = useState(false);
  const [maternalData, setMaternalData] = useState<MaternalData>({ motherName: "", gestationalAge: "", tfu: "", notes: "" });
  const [tbj, setTbj] = useState<number | null>(null);
  const [tbjaCategory, setTbjaCategory] = useState<"normal" | "rendah" | null>(null);

  const handleAnthropometricResult = (measurements: AnthropometricMeasurements) => {
    toast({ title: t("camera.measurementSuccess"), description: t("camera.measurementSavedDesc") });
    setShowAnthropometricCamera(false);
  };

  const calculateTBJ = () => {
    const gestationalWeeks = parseFloat(maternalData.gestationalAge);
    const tfuCm = parseFloat(maternalData.tfu);
    if (gestationalWeeks && tfuCm) {
      const n = gestationalWeeks >= 36 ? 12 : 11;
      const calculatedTBJ = (tfuCm - n) * 155;
      setTbj(Math.max(0, calculatedTBJ));
      const expectedMinWeight = gestationalWeeks * 100 - 1000;
      setTbjaCategory(calculatedTBJ < expectedMinWeight ? "rendah" : "normal");
    }
  };

  const handleMaternalSave = () => {
    if (!maternalData.motherName || !maternalData.gestationalAge || !maternalData.tfu) {
      toast({ title: t("camera.incompleteData"), description: t("camera.incompleteDataDesc"), variant: "destructive" });
      return;
    }
    toast({ title: t("camera.dataSaved"), description: t("camera.maternalSavedDesc") });
    setShowMaternalForm(false);
  };

  if (showAnthropometricCamera) {
    return (
      <AppLayout>
        <AnthropometricCamera onMeasurementsDetected={handleAnthropometricResult} onClose={() => setShowAnthropometricCamera(false)} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6" data-testid="camera-page">
        <div>
          <h1 className="text-2xl font-bold">{t("camera.title")}</h1>
          <p className="text-muted-foreground">{t("camera.subtitle")}</p>
        </div>

        {!showMaternalForm ? (
          <div className="grid gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Camera className="h-5 w-5" />{t("camera.childScanTitle")}</CardTitle>
                <CardDescription>{t("camera.childScanDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowAnthropometricCamera(true)} className="w-full" size="lg" data-testid="start-anthropometric-scan">
                  <Camera className="mr-2 h-4 w-4" />{t("camera.startScan")}
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" />{t("camera.maternalTitle")}</CardTitle>
                <CardDescription>{t("camera.maternalDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowMaternalForm(true)} className="w-full" size="lg" variant="outline" data-testid="start-maternal-form">
                  <Calculator className="mr-2 h-4 w-4" />{t("camera.inputTfu")}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{t("camera.tfuFormTitle")}</CardTitle>
              <CardDescription>{t("camera.tfuFormDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mother-name">{t("camera.motherName")}</Label>
                  <Input id="mother-name" value={maternalData.motherName} onChange={(e) => setMaternalData(prev => ({ ...prev, motherName: e.target.value }))} placeholder={t("camera.motherNamePlaceholder")} data-testid="mother-name-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gestational-age">{t("camera.gestationalAge")}</Label>
                  <Input id="gestational-age" type="number" min="1" max="42" value={maternalData.gestationalAge} onChange={(e) => setMaternalData(prev => ({ ...prev, gestationalAge: e.target.value }))} placeholder={t("camera.gestationalAgePlaceholder")} data-testid="gestational-age-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tfu">{t("camera.tfuLabel")}</Label>
                  <div className="flex gap-2">
                    <Input id="tfu" type="number" step="0.1" min="0" value={maternalData.tfu} onChange={(e) => setMaternalData(prev => ({ ...prev, tfu: e.target.value }))} placeholder={t("camera.tfuPlaceholder")} className="flex-1" data-testid="tfu-input" />
                    <Button onClick={calculateTBJ} disabled={!maternalData.gestationalAge || !maternalData.tfu} data-testid="calculate-tbj-button">
                      <Calculator className="h-4 w-4 mr-1" />{t("camera.calculateTbj")}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">{t("camera.notes")}</Label>
                  <Textarea id="notes" value={maternalData.notes} onChange={(e) => setMaternalData(prev => ({ ...prev, notes: e.target.value }))} placeholder={t("camera.notesPlaceholder")} rows={3} data-testid="notes-input" />
                </div>
              </div>

              {tbj !== null && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">{Math.round(tbj)} gram</div>
                      <div className="text-sm text-muted-foreground">{t("camera.efw")}</div>
                    </div>
                    <div className="space-y-1">
                      <div className={`text-lg font-semibold ${tbjaCategory === "normal" ? "text-success" : "text-warning"}`}>
                        {tbjaCategory === "normal" ? t("camera.normal") : t("camera.low")}
                      </div>
                      <div className="text-sm text-muted-foreground">{t("camera.category")}</div>
                    </div>
                  </div>
                </div>
              )}

              <Alert data-testid="safety-banner">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>{t("camera.safetyNote")}</strong> {t("camera.safetyBanner")}
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button onClick={() => setShowMaternalForm(false)} variant="outline" className="flex-1">{t("common.cancel")}</Button>
                <Button onClick={handleMaternalSave} disabled={!maternalData.motherName || !maternalData.gestationalAge || !maternalData.tfu} className="flex-1" data-testid="save-maternal-button">
                  <Save className="mr-2 h-4 w-4" />{t("common.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default CameraPage;
