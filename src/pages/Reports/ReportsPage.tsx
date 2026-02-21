import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AppLayout from "@/components/layout/AppLayout";
import { FileDown, Download, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
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
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("3bulan");
  const [selectedFacility, setSelectedFacility] = useState("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [showExportModal, setShowExportModal] = useState(false);

  const handleGeneratePDF = () => {
    toast({ title: t("reports.pdfSuccess"), description: t("reports.pdfSuccessDesc") });
  };

  const handleExportCSV = () => {
    toast({ title: t("reports.csvSuccess"), description: t("reports.csvSuccessDesc") });
    setShowExportModal(false);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-6" data-testid="reports-page">
        <div>
          <h1 className="text-2xl font-bold">{t("reports.title")}</h1>
          <p className="text-muted-foreground">{t("reports.subtitle")}</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-lg">{t("reports.filterTitle")}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t("reports.period")}</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger data-testid="period-filter"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1bulan">{t("reports.1month")}</SelectItem>
                    <SelectItem value="3bulan">{t("reports.3months")}</SelectItem>
                    <SelectItem value="6bulan">{t("reports.6months")}</SelectItem>
                    <SelectItem value="1tahun">{t("reports.1year")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("reports.facility")}</Label>
                <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                  <SelectTrigger data-testid="facility-filter"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("reports.allFacilities")}</SelectItem>
                    <SelectItem value="puskesmas-a">Puskesmas A</SelectItem>
                    <SelectItem value="puskesmas-b">Puskesmas B</SelectItem>
                    <SelectItem value="posyandu-1">Posyandu 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("reports.ageGroup")}</Label>
                <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                  <SelectTrigger data-testid="age-group-filter"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("reports.allAges")}</SelectItem>
                    <SelectItem value="0-6">0-6</SelectItem>
                    <SelectItem value="6-12">6-12</SelectItem>
                    <SelectItem value="12-24">12-24</SelectItem>
                    <SelectItem value="24-60">24-60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">{t("reports.atRiskChildren")}</p><p className="text-2xl font-bold">23</p></div><AlertTriangle className="h-8 w-8 text-warning" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">{t("reports.followUp14d")}</p><p className="text-2xl font-bold">87%</p></div><TrendingUp className="h-8 w-8 text-success" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">{t("reports.totalMonitored")}</p><p className="text-2xl font-bold">156</p></div><Users className="h-8 w-8 text-primary" /></div></CardContent></Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("reports.trendTitle")}</CardTitle>
            <CardDescription>{t("reports.trendDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBar data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="berisiko" fill="hsl(var(--warning))" name={t("reports.chartAtRisk")} />
                  <Bar dataKey="followUp" fill="hsl(var(--success))" name={t("reports.chartFollowUp")} />
                </RechartsBar>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleGeneratePDF} className="flex-1" size="lg">
            <FileDown className="mr-2 h-4 w-4" />{t("reports.generatePdf")}
          </Button>
          <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1" size="lg" data-testid="export-csv-button">
                <Download className="mr-2 h-4 w-4" />{t("reports.exportCsv")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{t("reports.exportTitle")}</DialogTitle>
                <DialogDescription>{t("reports.exportDesc")}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{t("reports.columnsExported")}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["child_id","dob","sex","date","weight","height","head_circumference","z_scores","facility_code"].map(col => (
                      <Badge key={col} variant="secondary">{col}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setShowExportModal(false)} variant="outline" className="flex-1">{t("common.cancel")}</Button>
                  <Button onClick={handleExportCSV} className="flex-1" data-testid="confirm-export-button">
                    <Download className="mr-2 h-4 w-4" />{t("reports.exportCsv")}
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
