import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw, Check, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfidenceScore from "@/components/ui/confidence-score";
import { useLanguage } from "@/i18n/LanguageContext";

interface AnthropometricMeasurements {
  weight: number;
  height: number;
  bodyLength: number;
  headCircumference: number;
  upperArmCircumference: number;
  confidence: number;
}

interface AnthropometricCameraProps {
  onMeasurementsDetected: (measurements: AnthropometricMeasurements) => void;
  onClose: () => void;
}

const AnthropometricCamera = ({ onMeasurementsDetected, onClose }: AnthropometricCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [measurements, setMeasurements] = useState<AnthropometricMeasurements | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({ variant: "destructive", title: t("anthro.cameraError"), description: t("anthro.cameraErrorDesc") });
    }
  }, [toast, t]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsProcessing(true);
    setProcessingStep(t("anthro.capturing"));

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    try {
      setProcessingStep(t("anthro.detecting"));
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessingStep(t("anthro.measuring"));
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStep(t("anthro.calculating"));

      const mockMeasurements: AnthropometricMeasurements = {
        weight: Math.round((Math.random() * 5 + 10) * 10) / 10,
        height: Math.round((Math.random() * 20 + 70) * 10) / 10,
        bodyLength: Math.round((Math.random() * 15 + 65) * 10) / 10,
        headCircumference: Math.round((Math.random() * 5 + 42) * 10) / 10,
        upperArmCircumference: Math.round((Math.random() * 3 + 12) * 10) / 10,
        confidence: Math.round(Math.random() * 20 + 75)
      };

      setMeasurements(mockMeasurements);
      setProcessingStep(t("anthro.done"));
      toast({ title: t("anthro.successTitle"), description: t("anthro.successDesc", { confidence: mockMeasurements.confidence }) });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({ variant: "destructive", title: t("anthro.processError"), description: t("anthro.processErrorDesc") });
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  }, [toast, t]);

  const handleConfirm = () => {
    if (measurements) {
      onMeasurementsDetected(measurements);
      stopCamera();
      onClose();
    }
  };

  const handleRetake = () => {
    setMeasurements(null);
    setProcessingStep("");
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="bg-background border-b p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t("anthro.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("anthro.positionPatient")}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>
      </div>

      <div className="flex-1 relative">
        <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-48 h-80 border-2 border-primary/60 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
              <div className="text-white text-sm font-medium bg-primary/80 px-3 py-1 rounded-full mb-4">{t("anthro.positionGuide")}</div>
              <div className="w-8 h-8 rounded-full border-2 border-white/80 mb-2"></div>
              <div className="w-6 h-16 border border-white/60 rounded mb-2"></div>
              <div className="flex gap-2">
                <div className="w-4 h-12 border border-white/60 rounded"></div>
                <div className="w-4 h-12 border border-white/60 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Card className="mx-4">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <div className="text-center">
                    <p className="font-medium">{processingStep}</p>
                    <p className="text-sm text-muted-foreground">{t("anthro.pleaseWait")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {measurements && (
        <div className="bg-background border-t p-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{t("anthro.results")}</CardTitle>
              <ConfidenceScore score={measurements.confidence} />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{t("anthro.weight")}</span><span className="font-medium">{measurements.weight} kg</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t("anthro.height")}</span><span className="font-medium">{measurements.height} cm</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t("anthro.bodyLength")}</span><span className="font-medium">{measurements.bodyLength} cm</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t("anthro.headCirc")}</span><span className="font-medium">{measurements.headCircumference} cm</span></div>
                <div className="flex justify-between col-span-2"><span className="text-muted-foreground">{t("anthro.armCirc")}</span><span className="font-medium">{measurements.upperArmCircumference} cm</span></div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={handleRetake} className="flex-1"><RotateCcw className="h-4 w-4 mr-2" />{t("anthro.retake")}</Button>
                <Button onClick={handleConfirm} className="flex-1"><Check className="h-4 w-4 mr-2" />{t("anthro.use")}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {cameraActive && !measurements && (
        <div className="bg-background border-t p-4">
          <Button onClick={captureAndAnalyze} disabled={isProcessing} size="lg" className="w-full">
            {isProcessing ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Camera className="h-5 w-5 mr-2" />}
            {isProcessing ? t("anthro.processing") : t("anthro.captureAnalyze")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnthropometricCamera;
