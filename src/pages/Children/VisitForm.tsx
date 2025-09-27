import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/components/layout/AppLayout";
import ConfidenceScore from "@/components/ui/confidence-score";
import RiskBadge from "@/components/ui/risk-badge";
import { Camera, Save, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MeasurementData {
  weight: string;
  height: string;
  headCircumference: string;
}

interface ZScores {
  haz: number;
  waz: number;
  wlz: number;
}

interface ChildInfo {
  name: string;
  id: string;
  visitDate: string;
  facility: string;
}

const VisitForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOffline] = useState(true); // Mock offline state
  const [confidenceScore] = useState(85);
  
  const [childInfo, setChildInfo] = useState<ChildInfo>({
    name: "",
    id: "",
    visitDate: new Date().toISOString().split('T')[0],
    facility: "Puskesmas Citeureup"
  });

  const [measurements, setMeasurements] = useState<MeasurementData>({
    weight: "",
    height: "",
    headCircumference: ""
  });

  // Mock calculated results
  const [results] = useState<ZScores & { percentile: number; status: "normal" | "berisiko" | "stunting" }>({
    haz: -1.8,
    waz: -1.2,
    wlz: -0.5,
    percentile: 25,
    status: "berisiko"
  });

  const handleChildInfoChange = (field: keyof ChildInfo, value: string) => {
    setChildInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleMeasurementChange = (field: keyof MeasurementData, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Mock save to offline queue
    toast({
      title: "Data tersimpan",
      description: "Tersimpan di antrian. Akan disinkronkan saat online",
    });
    
    // Navigate back to children list
    navigate("/anak");
  };

  const isFormValid = childInfo.name && childInfo.id && measurements.weight && measurements.height;

  return (
    <AppLayout syncStatus="offline">
      <div className="container mx-auto p-4 space-y-6" data-testid="visit-form">
        {/* Offline Banner */}
        {isOffline && (
          <div className="bg-sync-offline text-white p-3 rounded-lg flex items-center gap-2">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">Mode offline aktif</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kunjungan Baru</h1>
            <p className="text-muted-foreground">Input data pengukuran anak</p>
          </div>
        </div>

        {/* Child Identity Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Identitas Anak</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="child-name">Nama Anak</Label>
                <Input
                  id="child-name"
                  value={childInfo.name}
                  onChange={(e) => handleChildInfoChange("name", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  data-testid="child-name-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="child-id">ID Anak</Label>
                <Input
                  id="child-id"
                  value={childInfo.id}
                  onChange={(e) => handleChildInfoChange("id", e.target.value)}
                  placeholder="ANK-001"
                  data-testid="child-id-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visit-date">Tanggal Kunjungan</Label>
                <Input
                  id="visit-date"
                  type="date"
                  value={childInfo.visitDate}
                  onChange={(e) => handleChildInfoChange("visitDate", e.target.value)}
                  data-testid="visit-date-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facility">Fasilitas Kesehatan</Label>
                <Input
                  id="facility"
                  value={childInfo.facility}
                  onChange={(e) => handleChildInfoChange("facility", e.target.value)}
                  data-testid="facility-input"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Measurement Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pengukuran</CardTitle>
            <CardDescription>
              Input hasil pengukuran dengan bantuan panduan kamera
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight">Berat Badan (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={measurements.weight}
                onChange={(e) => handleMeasurementChange("weight", e.target.value)}
                placeholder="0.0"
                data-testid="weight-input"
              />
            </div>

            {/* Height with Camera Guide */}
            <div className="space-y-2">
              <Label htmlFor="height">Tinggi Badan (cm)</Label>
              <div className="flex gap-2">
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  value={measurements.height}
                  onChange={(e) => handleMeasurementChange("height", e.target.value)}
                  placeholder="0.0"
                  className="flex-1"
                  data-testid="height-input"
                />
                <Button 
                  variant="outline" 
                  className="px-3"
                  data-testid="height-camera-button"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Gunakan panduan kamera untuk pengukuran yang akurat
              </p>
            </div>

            {/* Head Circumference with Camera Guide */}
            <div className="space-y-2">
              <Label htmlFor="head-circumference">Lingkar Kepala (cm)</Label>
              <div className="flex gap-2">
                <Input
                  id="head-circumference"
                  type="number"
                  step="0.1"
                  value={measurements.headCircumference}
                  onChange={(e) => handleMeasurementChange("headCircumference", e.target.value)}
                  placeholder="0.0"
                  className="flex-1"
                  data-testid="head-circumference-input"
                />
                <Button 
                  variant="outline" 
                  className="px-3"
                  data-testid="head-camera-button"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="pt-4">
              <ConfidenceScore score={confidenceScore} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1">
                Perbaiki
              </Button>
              <Button 
                className="flex-1"
                disabled={!isFormValid}
                data-testid="confirm-measurement-button"
              >
                Konfirmasi
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {isFormValid && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hasil Otomatis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Z-Scores */}
              <div>
                <h4 className="font-medium mb-3">Z-Score</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{results.haz}</div>
                    <div className="text-xs text-muted-foreground">HAZ</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{results.waz}</div>
                    <div className="text-xs text-muted-foreground">WAZ</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{results.wlz}</div>
                    <div className="text-xs text-muted-foreground">WLZ</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Percentile & Status */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Persentil WHO</div>
                  <div className="text-lg font-semibold">{results.percentile}%</div>
                </div>
                <RiskBadge level={results.status} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <div className="pb-4">
          <Button
            onClick={handleSave}
            disabled={!isFormValid}
            size="lg" 
            className="w-full"
            data-testid="save-button"
          >
            <Save className="mr-2 h-4 w-4" />
            Simpan
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default VisitForm;