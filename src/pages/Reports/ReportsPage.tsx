import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AppLayout from "@/components/layout/AppLayout";
import { BarChart, FileDown, Download, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart as RechartsBar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar } from "recharts";

const mockChartData = [
  { month: "Jan", berisiko: 12, followUp: 10 },
  { month: "Feb", berisiko: 15, followUp: 13 },
  { month: "Mar", berisiko: 8, followUp: 8 },
  { month: "Apr", berisiko: 11, followUp: 9 },
  { month: "Mei", berisiko: 13, followUp: 11 },
  { month: "Jun", berisiko: 7, followUp: 7 },
];

const ReportsPage = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("3bulan");
  const [selectedFacility, setSelectedFacility] = useState("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [showExportModal, setShowExportModal] = useState(false);

  const handleGeneratePDF = () => {
    toast({
      title: "PDF berhasil dibuat",
      description: "Laporan PDF telah diunduh",
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "CSV berhasil diekspor",
      description: "Data e-PPGBM telah diunduh dalam format CSV",
    });
    setShowExportModal(false);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6" data-testid="reports-page">
        <div>
          <h1 className="text-2xl font-bold">Laporan</h1>
          <p className="text-muted-foreground">
            Analisis data pertumbuhan dan tindak lanjut
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Laporan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Periode</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger data-testid="period-filter">
                    <SelectValue placeholder="Pilih periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1bulan">1 Bulan Terakhir</SelectItem>
                    <SelectItem value="3bulan">3 Bulan Terakhir</SelectItem>
                    <SelectItem value="6bulan">6 Bulan Terakhir</SelectItem>
                    <SelectItem value="1tahun">1 Tahun Terakhir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fasilitas</Label>
                <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                  <SelectTrigger data-testid="facility-filter">
                    <SelectValue placeholder="Pilih fasilitas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Fasilitas</SelectItem>
                    <SelectItem value="puskesmas-a">Puskesmas A</SelectItem>
                    <SelectItem value="puskesmas-b">Puskesmas B</SelectItem>
                    <SelectItem value="posyandu-1">Posyandu 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Kelompok Usia</Label>
                <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                  <SelectTrigger data-testid="age-group-filter">
                    <SelectValue placeholder="Pilih kelompok usia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Usia</SelectItem>
                    <SelectItem value="0-6">0-6 Bulan</SelectItem>
                    <SelectItem value="6-12">6-12 Bulan</SelectItem>
                    <SelectItem value="12-24">12-24 Bulan</SelectItem>
                    <SelectItem value="24-60">24-60 Bulan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Anak Berisiko</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Follow-up ≤14 Hari</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Anak Dipantau</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Tren Anak Berisiko dan Tindak Lanjut</CardTitle>
            <CardDescription>
              Jumlah anak berisiko dan yang mendapat tindak lanjut per bulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBar data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="berisiko" fill="hsl(var(--warning))" name="Anak Berisiko" />
                  <Bar dataKey="followUp" fill="hsl(var(--success))" name="Tindak Lanjut" />
                </RechartsBar>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Export Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleGeneratePDF} className="flex-1" size="lg">
            <FileDown className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>

          <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1" size="lg" data-testid="export-csv-button">
                <Download className="mr-2 h-4 w-4" />
                Ekspor CSV e-PPGBM
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ekspor Data e-PPGBM</DialogTitle>
                <DialogDescription>
                  Data akan diekspor sesuai format standar e-PPGBM
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Kolom yang akan diekspor:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="secondary">child_id</Badge>
                    <Badge variant="secondary">dob</Badge>
                    <Badge variant="secondary">sex</Badge>
                    <Badge variant="secondary">date</Badge>
                    <Badge variant="secondary">weight</Badge>
                    <Badge variant="secondary">height</Badge>
                    <Badge variant="secondary">head_circumference</Badge>
                    <Badge variant="secondary">z_scores</Badge>
                    <Badge variant="secondary">facility_code</Badge>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Total records:</strong> 156 anak</p>
                  <p><strong>Period:</strong> {selectedPeriod === "3bulan" ? "3 Bulan Terakhir" : selectedPeriod}</p>
                  <p><strong>Format:</strong> CSV (UTF-8)</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowExportModal(false)} 
                    variant="outline" 
                    className="flex-1"
                  >
                    Batal
                  </Button>
                  <Button 
                    onClick={handleExportCSV}
                    className="flex-1"
                    data-testid="confirm-export-button"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Ekspor CSV
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;