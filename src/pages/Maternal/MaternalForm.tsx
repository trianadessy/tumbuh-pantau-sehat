import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/components/layout/AppLayout";
import { AlertTriangle, Calculator, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MaternalData {
  motherName: string;
  gestationalAge: string; // in weeks
  tfu: string; // Tinggi Fundus Uteri in cm
  visitDate: string;
  notes: string;
}

const MaternalForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MaternalData>({
    motherName: "",
    gestationalAge: "",
    tfu: "",
    visitDate: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const [tbj, setTbj] = useState<number | null>(null); // Taksiran Berat Janin
  const [tbjaCategory, setTbjaCategory] = useState<"normal" | "rendah" | null>(null);

  const handleInputChange = (field: keyof MaternalData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTBJ = () => {
    const gestationalWeeks = parseFloat(formData.gestationalAge);
    const tfuCm = parseFloat(formData.tfu);
    
    if (gestationalWeeks && tfuCm) {
      // Simplified TBJ calculation (Johnson's formula variant)
      // TBJ = (TFU - n) x 155 where n = 12 if vertex above spina ischiadica, 11 if below
      // Simplified here for demo
      const n = gestationalWeeks >= 36 ? 12 : 11;
      const calculatedTBJ = (tfuCm - n) * 155;
      
      setTbj(Math.max(0, calculatedTBJ));
      
      // Categorize based on gestational age norms (simplified)
      const expectedMinWeight = gestationalWeeks * 100 - 1000; // Very simplified
      setTbjaCategory(calculatedTBJ < expectedMinWeight ? "rendah" : "normal");
    }
  };

  const handleSave = () => {
    if (!formData.motherName || !formData.gestationalAge || !formData.tfu) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // Mock save to database
    toast({
      title: "Data tersimpan",
      description: "Data kunjungan maternal berhasil disimpan",
    });
  };

  const isFormValid = formData.motherName && formData.gestationalAge && formData.tfu;

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6" data-testid="maternal-form">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Monitoring Maternal</h1>
          <p className="text-muted-foreground">
            Input data kunjungan ibu hamil dan perhitungan TBJ
          </p>
        </div>

        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Data Kunjungan Ibu Hamil</CardTitle>
            <CardDescription>
              Masukkan data pengukuran dan informasi kunjungan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mother-name">Nama Ibu</Label>
                <Input
                  id="mother-name"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange("motherName", e.target.value)}
                  placeholder="Masukkan nama lengkap ibu"
                  data-testid="mother-name-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visit-date">Tanggal Kunjungan</Label>
                <Input
                  id="visit-date"
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => handleInputChange("visitDate", e.target.value)}
                  data-testid="visit-date-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gestational-age">Usia Kehamilan (minggu)</Label>
                <Input
                  id="gestational-age"
                  type="number"
                  min="1"
                  max="42"
                  value={formData.gestationalAge}
                  onChange={(e) => handleInputChange("gestationalAge", e.target.value)}
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
                    value={formData.tfu}
                    onChange={(e) => handleInputChange("tfu", e.target.value)}
                    placeholder="Contoh: 28.5"
                    className="flex-1"
                    data-testid="tfu-input"
                  />
                  <Button 
                    onClick={calculateTBJ}
                    disabled={!formData.gestationalAge || !formData.tfu}
                    data-testid="calculate-tbj-button"
                  >
                    <Calculator className="h-4 w-4 mr-1" />
                    Hitung TBJ
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Kunjungan</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Catatan tambahan, keluhan, atau observasi..."
                rows={3}
                data-testid="notes-input"
              />
            </div>
          </CardContent>
        </Card>

        {/* TBJ Results */}
        {tbj !== null && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hasil Perhitungan TBJ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">
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

              {/* Safety Banner */}
              <Alert data-testid="safety-banner">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Catatan Keselamatan:</strong> Ini bukan diagnosis medis. 
                  Konfirmasi dengan pemeriksaan USG jika hasil di luar rentang normal. 
                  Segera konsultasi dengan dokter spesialis kandungan.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Sample Data Display */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">
              Contoh Data (Demo)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div><strong>Nama:</strong> Ibu Sari Dewi</div>
              <div><strong>Usia Kehamilan:</strong> 28 minggu</div>
              <div><strong>TFU:</strong> 28 cm</div>
              <div><strong>TBJ Terhitung:</strong> ~2,480 gram (Normal)</div>
              <div><strong>Catatan:</strong> Kondisi ibu dan janin baik, tidak ada keluhan</div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="pb-4">
          <Button
            onClick={handleSave}
            disabled={!isFormValid}
            size="lg"
            className="w-full"
            data-testid="save-maternal-button"
          >
            <Save className="mr-2 h-4 w-4" />
            Simpan Data Kunjungan
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default MaternalForm;