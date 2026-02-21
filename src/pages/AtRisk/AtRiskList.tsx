import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/ui/risk-badge";
import SLABadge from "@/components/ui/sla-badge";
import { AlertTriangle, Play, CheckCircle, PauseCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const mockAtRiskChildren = [
  { id: "ANK-001", name: "Sari Dewi", age: "24 bulan", village: "Sukamaju", riskReason: { id: "Penurunan HAZ > 0,5 dalam 3 bulan", en: "HAZ decline > 0.5 in 3 months" }, riskLevel: "berisiko" as const, daysToDue: 3, assignedOfficer: "dr. Ani Suryani", lastAction: "2024-11-10" },
  { id: "ANK-003", name: "Putri Indah", age: "36 bulan", village: "Sejahtera", riskReason: { id: "HAZ < -2SD, tidak ada perbaikan 2 bulan", en: "HAZ < -2SD, no improvement in 2 months" }, riskLevel: "stunting" as const, daysToDue: 1, assignedOfficer: "Bidan Siti", lastAction: "2024-11-08" },
  { id: "ANK-005", name: "Maya Sari", age: "30 bulan", village: "Makmur", riskReason: { id: "Penurunan berat badan signifikan", en: "Significant weight decline" }, riskLevel: "berisiko" as const, daysToDue: 7, assignedOfficer: "dr. Budi Hartono", lastAction: "2024-11-05" }
];

const AtRiskList = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [kecamatanFilter, setKecamatanFilter] = useState<string>("all");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [riskTypeFilter, setRiskTypeFilter] = useState<string>("all");

  const handleStartFollowUp = (childId: string) => console.log("Starting follow-up for", childId);
  const handleMarkComplete = (childId: string) => console.log("Marking complete for", childId);
  const handlePostpone = (childId: string) => console.log("Postponing for", childId);

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-4" data-testid="at-risk-list">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{t("tasks.title")}</h1>
          <p className="text-muted-foreground">{t("tasks.subtitle", { count: mockAtRiskChildren.length })}</p>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select value={kecamatanFilter} onValueChange={setKecamatanFilter}>
                <SelectTrigger data-testid="kecamatan-filter"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("tasks.filterAllDistricts")}</SelectItem>
                  <SelectItem value="citeureup">Citeureup</SelectItem>
                  <SelectItem value="cibinong">Cibinong</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger data-testid="age-group-filter"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("tasks.filterAllAges")}</SelectItem>
                  <SelectItem value="6-12">6-12 {language === "id" ? "bulan" : "months"}</SelectItem>
                  <SelectItem value="13-24">13-24 {language === "id" ? "bulan" : "months"}</SelectItem>
                  <SelectItem value="25-36">25-36 {language === "id" ? "bulan" : "months"}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={riskTypeFilter} onValueChange={setRiskTypeFilter}>
                <SelectTrigger data-testid="risk-type-filter"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("tasks.filterAllTypes")}</SelectItem>
                  <SelectItem value="haz-decline">{t("tasks.hazDecline")}</SelectItem>
                  <SelectItem value="weight-decline">{t("tasks.weightDecline")}</SelectItem>
                  <SelectItem value="stunting">{t("tasks.stunting")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {mockAtRiskChildren.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("tasks.emptyTitle")}</h3>
                <p className="text-muted-foreground">{t("tasks.emptyDesc")}</p>
              </CardContent>
            </Card>
          ) : (
            mockAtRiskChildren.map((child) => (
              <Card key={child.id} className="border-l-4 border-l-status-risk" data-testid={`at-risk-item-${child.id}`}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{child.name}</h3>
                          <Badge variant="outline" className="text-xs">{child.id}</Badge>
                          <RiskBadge level={child.riskLevel} />
                        </div>
                        <div className="text-sm text-muted-foreground">{child.age} • {child.village}</div>
                      </div>
                      <SLABadge daysRemaining={child.daysToDue} />
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-status-risk flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">{t("tasks.riskReason")}</div>
                          <div className="text-sm text-muted-foreground">{child.riskReason[language]}</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div>{t("tasks.assignedTo")} {child.assignedOfficer}</div>
                      <div>{t("tasks.lastAction")} {new Date(child.lastAction).toLocaleDateString(language === "id" ? "id-ID" : "en-US")}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => handleStartFollowUp(child.id)} data-testid="start-follow-up">
                        <Play className="h-4 w-4 mr-1" />{t("tasks.startFollowUp")}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleMarkComplete(child.id)} data-testid="mark-complete">
                        <CheckCircle className="h-4 w-4 mr-1" />{t("tasks.markComplete")}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handlePostpone(child.id)} data-testid="postpone">
                        <PauseCircle className="h-4 w-4 mr-1" />{t("tasks.postpone")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AtRiskList;
