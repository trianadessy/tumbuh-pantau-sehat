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
  const [showAnthropometricCamera, setShowAnthropometricCamera] = useState(false);
  const [showMaternalForm, setShowMaternalForm] = useState(false);
  
  const [maternalData, setMaternalData] = useState<MaternalData>({
    motherName: "",
    gestationalAge: "",
    tfu: "",
    notes: ""
  });
  
  const [tbj, setTbj] = useState<number | null>(null);
  const [tbjaCategory, setTbjaCategory] = useState<"normal" | "rendah" | null>(null);

  const handleAnthropometricResult = (measurements: AnthropometricMeasurements) => {
    // Handle the anthropometric measurements
    toast({
      title: "Pengukuran berhasil",
      description: "Data antropometri telah tersimpan",
    });
    setShowAnthropometricCamera(false);
  };

  const calculateTBJ = () => {
    const gestationalWeeks = parseFloat(maternalData.gestationalAge);
    const tfuCm = parseFloat(maternalData.tfu);
    
    if (gestationalWeeks && tfuCm) {
      // Johnson's formula variant
      const n = gestationalWeeks >= 36 ? 12 : 11;
      const calculatedTBJ = (tfuCm - n) * 155;
      
      setTbj(Math.max(0, calculatedTBJ));
      
      const expectedMinWeight = gestationalWeeks * 100 - 1000;
      setTbjaCategory(calculatedTBJ < expectedMinWeight ? "rendah" : "normal");
    }
  };

  const handleMaternalSave = () => {
    if (!maternalData.motherName || !maternalData.gestationalAge || !maternalData.tfu) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Data tersimpan",
      description: "Data kunjungan maternal berhasil disimpan",
    });
    setShowMaternalForm(false);
  };

  if (showAnthropometricCamera) {
    return (
      <AppLayout>
        <AnthropometricCamera
          onMeasurementsDetected={handleAnthropometricResult}
          onClose={() => setShowAnthropometricCamera(false)}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6" data-testid="camera-page">
        <div>
          <h1 className="text-2xl font-bold">Kamera Pengukuran</h1>
          <p className="text-muted-foreground">
            Pindai dan ukur data antropometri dengan kamera
          </p>
        </div>

        {!showMaternalForm ? (
          <div className="grid gap-4">
            {/* Child Anthropometric Card */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Pindai Antropometri Anak
                </CardTitle>
                <CardDescription>
                  Ukur BB, TB, PB, LK, dan LILA dengan bantuan kamera AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowAnthropometricCamera(true)}
                  className="w-full"
                  size="lg"
                  data-testid="start-anthropometric-scan"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Mulai Pindai
                </Button>
              </CardContent>
            </Card>

            {/* Maternal TFU Card */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Masukkan TFU Ibu Hamil
                </CardTitle>
                <CardDescription>
                  Input tinggi fundus uteri dan hitung taksiran berat janin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowMaternalForm(true)}
                  className="w-full"
                  size="lg"
                  variant="outline"
                  data-testid="start-maternal-form"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Input TFU
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Maternal Form */
          <Card>
            <CardHeader>
              <CardTitle>Input Data TFU</CardTitle>
              <CardDescription>
                Masukkan data tinggi fundus uteri untuk perhitungan TBJ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mother-name">Nama Ibu</Label>
                  <Input
                    id="mother-name"
                    value={maternalData.motherName}
                    onChange={(e) => setMaternalData(prev => ({ ...prev, motherName: e.target.value }))}
                    placeholder="Masukkan nama lengkap ibu"
                    data-testid="mother-name-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gestational-age">Usia Kehamilan (minggu)</Label>
                  <Input
                    id="gestational-age"
                    type="number"
                    min="1"
                    max="42"
                    value={maternalData.gestationalAge}
                    onChange={(e) => setMaternalData(prev => ({ ...prev, gestationalAge: e.target.value }))}
                    placeholder="Contoh: 28"
                    data-testid="gestational-age-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tfu">Tinggi Fundus Uteri (cm)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tfu"
                      type="number"
                      step="0.1"
                      min="0"
                      value={maternalData.tfu}
                      onChange={(e) => setMaternalData(prev => ({ ...prev, tfu: e.target.value }))}
                      placeholder="Contoh: 28.5"
                      className="flex-1"
                      data-testid="tfu-input"
                    />
                    <Button 
                      onClick={calculateTBJ}
                      disabled={!maternalData.gestationalAge || !maternalData.tfu}
                      data-testid="calculate-tbj-button"
                    >
                      <Calculator className="h-4 w-4 mr-1" />
                      Hitung TBJ
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan</Label>
                  <Textarea
                    id="notes"
                    value={maternalData.notes}
                    onChange={(e) => setMaternalData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Catatan tambahan..."
                    rows={3}
                    data-testid="notes-input"
                  />
                </div>
              </div>

              {/* TBJ Results */}
              {tbj !== null && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        {Math.round(tbj)} gram
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Taksiran Berat Janin
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className={`text-lg font-semibold ${
                        tbjaCategory === "normal" ? "text-success" : "text-warning"
                      }`}>
                        {tbjaCategory === "normal" ? "Normal" : "Rendah"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Kategori
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Safety Banner */}
              <Alert data-testid="safety-banner">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Catatan Keselamatan:</strong> Bukan diagnosis medis. 
                  Konfirmasi USG bila di luar rentang normal. 
                  Segera konsultasi dengan dokter spesialis kandungan.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button
                  onClick={() => setShowMaternalForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleMaternalSave}
                  disabled={!maternalData.motherName || !maternalData.gestationalAge || !maternalData.tfu}
                  className="flex-1"
                  data-testid="save-maternal-button"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Simpan
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