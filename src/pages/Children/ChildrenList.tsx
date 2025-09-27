import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/ui/risk-badge";
import { Search, Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for children
const mockChildren = [
  {
    id: "ANK-001",
    name: "Sari Dewi",
    age: "24 bulan",
    ageMonths: 24,
    gender: "Perempuan",
    village: "Sukamaju",
    haz: -1.8,
    waz: -1.2,
    riskLevel: "berisiko" as const,
    lastVisit: "2024-11-10"
  },
  {
    id: "ANK-002", 
    name: "Ahmad Rizki",
    age: "18 bulan",
    ageMonths: 18,
    gender: "Laki-laki",
    village: "Makmur",
    haz: 0.5,
    waz: 0.2,
    riskLevel: "normal" as const,
    lastVisit: "2024-11-08"
  },
  {
    id: "ANK-003",
    name: "Putri Indah",
    age: "36 bulan", 
    ageMonths: 36,
    gender: "Perempuan",
    village: "Sejahtera",
    haz: -2.5,
    waz: -2.8,
    riskLevel: "stunting" as const,
    lastVisit: "2024-11-12"
  },
  {
    id: "ANK-004",
    name: "Budi Santoso",
    age: "12 bulan",
    ageMonths: 12,
    gender: "Laki-laki", 
    village: "Sukamaju",
    haz: 0.8,
    waz: 1.2,
    riskLevel: "normal" as const,
    lastVisit: "2024-11-09"
  },
  {
    id: "ANK-005",
    name: "Maya Sari",
    age: "30 bulan",
    ageMonths: 30,
    gender: "Perempuan",
    village: "Makmur", 
    haz: -2.2,
    waz: -1.9,
    riskLevel: "berisiko" as const,
    lastVisit: "2024-11-11"
  }
];

const ChildrenList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [villageFilter, setVillageFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");

  // Filter children based on search and filters
  const filteredChildren = mockChildren.filter((child) => {
    const matchesSearch = 
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAge = 
      !ageFilter || ageFilter === "all" ||
      (ageFilter === "0-12" && child.ageMonths <= 12) ||
      (ageFilter === "13-24" && child.ageMonths >= 13 && child.ageMonths <= 24) ||
      (ageFilter === "25-36" && child.ageMonths >= 25 && child.ageMonths <= 36) ||
      (ageFilter === "37+" && child.ageMonths >= 37);
    
    const matchesGender = !genderFilter || genderFilter === "all" || child.gender === genderFilter;
    const matchesVillage = !villageFilter || villageFilter === "all" || child.village === villageFilter;
    const matchesRisk = !riskFilter || riskFilter === "all" || child.riskLevel === riskFilter;

    return matchesSearch && matchesAge && matchesGender && matchesVillage && matchesRisk;
  });

  const uniqueVillages = [...new Set(mockChildren.map(child => child.village))];

  return (
    <AppLayout>
      <div className="container mx-auto p-4 space-y-4" data-testid="children-list">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Daftar Anak</h1>
            <p className="text-muted-foreground">
              {filteredChildren.length} dari {mockChildren.length} anak
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau ID anak..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="search-input"
          />
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger data-testid="age-filter">
                  <SelectValue placeholder="Usia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Usia</SelectItem>
                  <SelectItem value="0-12">0-12 bulan</SelectItem>
                  <SelectItem value="13-24">13-24 bulan</SelectItem>
                  <SelectItem value="25-36">25-36 bulan</SelectItem>
                  <SelectItem value="37+">37+ bulan</SelectItem>
                </SelectContent>
              </Select>

              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger data-testid="gender-filter">
                  <SelectValue placeholder="Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>

              <Select value={villageFilter} onValueChange={setVillageFilter}>
                <SelectTrigger data-testId="village-filter">
                  <SelectValue placeholder="Desa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Desa</SelectItem>
                  {uniqueVillages.map(village => (
                    <SelectItem key={village} value={village}>{village}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger data-testId="risk-filter">
                  <SelectValue placeholder="Status Risiko" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>  
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="berisiko">Berisiko</SelectItem>
                  <SelectItem value="stunting">Stunting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Children List */}
        <div className="space-y-3">
          {filteredChildren.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Tidak ada anak yang sesuai dengan kriteria pencarian
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredChildren.map((child) => (
              <Card 
                key={child.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/anak/${child.id}`)}
                data-testid={`child-item-${child.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{child.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {child.id}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Usia:</span> {child.age}
                        </div>
                        <div>
                          <span className="font-medium">Desa:</span> {child.village}
                        </div>
                        <div>
                          <span className="font-medium">HAZ:</span> {child.haz}
                        </div>
                        <div>
                          <span className="font-medium">WAZ:</span> {child.waz}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <RiskBadge level={child.riskLevel} />
                      <span className="text-xs text-muted-foreground">
                        {new Date(child.lastVisit).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Floating Action Button */}
        <Button
          size="lg"
          className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg z-40"
          onClick={() => navigate("/anak/kunjungan-baru")}
          data-testid="add-visit-fab"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </AppLayout>
  );
};

export default ChildrenList;