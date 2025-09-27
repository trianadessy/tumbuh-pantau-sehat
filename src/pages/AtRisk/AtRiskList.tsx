import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/ui/risk-badge";
import { AlertTriangle, Clock, Play, CheckCircle, PauseCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock at-risk children data
const mockAtRiskChildren = [
  {
    id: "ANK-001",
    name: "Sari Dewi",
    age: "24 bulan",
    village: "Sukamaju",
    riskReason: "Penurunan HAZ > 0,5 dalam 3 bulan",
    riskLevel: "berisiko" as const,
    daysToDue: 3,
    assignedOfficer: "dr. Ani Suryani",
    lastAction: "2024-11-10"
  },
  {
    id: "ANK-003",
    name: "Putri Indah", 
    age: "36 bulan",
    village: "Sejahtera",
    riskReason: "HAZ < -2SD, tidak ada perbaikan 2 bulan",
    riskLevel: "stunting" as const,
    daysToDue: 1,
    assignedOfficer: "Bidan Siti",
    lastAction: "2024-11-08"
  },
  {
    id: "ANK-005",
    name: "Maya Sari",
    age: "30 bulan", 
    village: "Makmur",
    riskReason: "Penurunan berat badan signifikan",
    riskLevel: "berisiko" as const,
    daysToDue: 7,
    assignedOfficer: "dr. Budi Hartono",
    lastAction: "2024-11-05"
  }
];

const AtRiskList = () => {
  const navigate = useNavigate();
  const [kecamatanFilter, setKecamatanFilter] = useState<string>("all");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [riskTypeFilter, setRiskTypeFilter] = useState<string>("all");

  const getSLABadgeColor = (days: number) => {
    if (days <= 1) return "bg-destructive text-destructive-foreground";
    if (days <= 3) return "bg-warning text-warning-foreground";
    return "bg-muted text-muted-foreground";
  };

  const handleStartFollowUp = (childId: string) => {
    // Mock follow-up action
    console.log("Starting follow-up for", childId);
  };

  const handleMarkComplete = (childId: string) => {
    // Mock completion action  
    console.log("Marking complete for", childId);
  };

  const handlePostpone = (childId: string) => {
    // Mock postpone action
    console.log("Postponing for", childId);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-4" data-testid="at-risk-list">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">At-Risk Minggu Ini</h1>
          <p className="text-muted-foreground">
            {mockAtRiskChildren.length} anak memerlukan tindak lanjut
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select value={kecamatanFilter} onValueChange={setKecamatanFilter}>
                <SelectTrigger data-testid="kecamatan-filter">
                  <SelectValue placeholder="Kecamatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kecamatan</SelectItem>
                  <SelectItem value="citeureup">Citeureup</SelectItem>
                  <SelectItem value="cibinong">Cibinong</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger data-testid="age-group-filter">
                  <SelectValue placeholder="Kelompok Usia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Usia</SelectItem>
                  <SelectItem value="6-12">6-12 bulan</SelectItem>
                  <SelectItem value="13-24">13-24 bulan</SelectItem>
                  <SelectItem value="25-36">25-36 bulan</SelectItem>
                </SelectContent>
              </Select>

              <Select value={riskTypeFilter} onValueChange={setRiskTypeFilter}>
                <SelectTrigger data-testid="risk-type-filter">
                  <SelectValue placeholder="Jenis Risiko" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="haz-decline">Penurunan HAZ</SelectItem>
                  <SelectItem value="weight-decline">Penurunan Berat</SelectItem>
                  <SelectItem value="stunting">Stunting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* At-Risk Children List */ }
        <div className="space-y-3">
          {mockAtRiskChildren.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Belum ada anak berisiko minggu ini</h3>
                <p className="text-muted-foreground">
                  Tidak ada anak yang memerlukan tindak lanjut dalam periode ini
                </p>
              </CardContent>
            </Card>
          ) : (
            mockAtRiskChildren.map((child) => (
              <Card 
                key={child.id}
                className="border-l-4 border-l-status-risk"
                data-testid={`at-risk-item-${child.id}`}
              >
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Header Info */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{child.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {child.id}
                          </Badge>
                          <RiskBadge level={child.riskLevel} />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {child.age} • {child.village}
                        </div>
                      </div>
                      
                      <Badge 
                        className={`${getSLABadgeColor(child.daysToDue)} flex items-center gap-1`}
                        data-testid="sla-badge"
                      >
                        <Clock className="h-3 w-3" />
                        {child.daysToDue} hari
                      </Badge>
                    </div>

                    {/* Risk Reason */}
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-status-risk flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">Alasan Berisiko:</div>
                          <div className="text-sm text-muted-foreground">{child.riskReason}</div>
                        </div>
                      </div>
                    </div>

                    {/* Assignment Info */}
                    <div className="text-xs text-muted-foreground">
                      <div>Penanggung jawab: {child.assignedOfficer}</div>
                      <div>Tindakan terakhir: {new Date(child.lastAction).toLocaleDateString('id-ID')}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleStartFollowUp(child.id)}
                        data-testid="start-follow-up"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Mulai Tindak Lanjut
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleMarkComplete(child.id)}
                        data-testid="mark-complete"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Tandai Selesai
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handlePostpone(child.id)}
                        data-testid="postpone"
                      >
                        <PauseCircle className="h-4 w-4 mr-1" />
                        Tunda
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