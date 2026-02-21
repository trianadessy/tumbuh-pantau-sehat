import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Stethoscope, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

type Role = "kader" | "tenaga-gizi" | null;

const RoleSelection = () => {
  const navigate = useNavigate();
  const { t, tArray } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const roles = [
    {
      id: "kader" as const,
      title: t("auth.kader"),
      description: t("auth.kaderDesc"),
      icon: Users,
      features: tArray("auth.kaderFeatures")
    },
    {
      id: "tenaga-gizi" as const,
      title: t("auth.nutritionist"),
      description: t("auth.nutritionistDesc"),
      icon: Stethoscope,
      features: tArray("auth.nutritionistFeatures")
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem("userRole", selectedRole);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{t("auth.selectRole")}</h1>
          <p className="text-muted-foreground">{t("auth.selectRoleDesc")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <Card key={role.id} className={cn("cursor-pointer transition-all hover:shadow-md", isSelected && "ring-2 ring-primary bg-primary/5")} onClick={() => setSelectedRole(role.id)} data-testid={`role-${role.id}`}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button onClick={handleContinue} disabled={!selectedRole} size="lg" className="min-w-[200px]" data-testid="continue-button">
            {t("common.continue")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
