import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Phone, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    pin: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - navigate to role selection
    navigate("/peran");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* App Branding */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Tumbuh+</h1>
          <p className="text-muted-foreground">
            Sistem Monitoring Pertumbuhan dan Deteksi Stunting
          </p>
        </div>

        {/* Login Form */}
        <Card data-testid="login-form">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>
              Masukkan nomor HP dan PIN untuk mengakses aplikasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor HP</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    required
                    data-testid="phone-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin">PIN</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pin"
                    name="pin"
                    type="password"
                    placeholder="Masukkan PIN 6 digit"
                    value={formData.pin}
                    onChange={handleChange}
                    className="pl-10"
                    maxLength={6}
                    required
                    data-testid="pin-input"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                data-testid="login-button"
              >
                Masuk
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Belum punya akses?</p>
              <p>Hubungi administrator Puskesmas setempat</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;