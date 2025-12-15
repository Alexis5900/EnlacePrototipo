import { useEffect, useState } from "react";
import { Shield, Lock, CheckCircle2, Database, Key } from "lucide-react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Verificando RUT", icon: Key },
    { label: "Validando credenciales", icon: Lock },
    { label: "Cargando sistema Enlace", icon: Database },
    { label: "Acceso concedido", icon: CheckCircle2 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 0.7; // Reduced from 1.5 to make it slower and reach 100%
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress > 20) setCurrentStep(1);
    if (progress > 40) setCurrentStep(2);
    if (progress > 65) setCurrentStep(3);
    if (progress >= 95) setCurrentStep(4);
  }, [progress]);

  return (
    <div className="min-h-screen w-full bg-[#003f69] flex items-center justify-center p-3 sm:p-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f4575 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Geometric background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] border border-[#285e8e]/20 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] border border-[#0f4575]/40 rotate-45" />
      </div>

      {/* Loading card - Compact version */}
      <div className="relative w-full max-w-[520px] bg-[#0f4575] border border-[#285e8e] shadow-2xl">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#b8bcc2]/15" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#b8bcc2]/15" />
        
        <div className="p-6 sm:p-8">
          {/* Animated icon - Smaller */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              {/* Outer rotating ring */}
              <svg className="w-28 h-28 sm:w-32 sm:h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 4s linear infinite' }}>
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  stroke="#285e8e"
                  strokeWidth="1.5"
                  strokeDasharray="12 6"
                  className="sm:hidden"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#285e8e"
                  strokeWidth="1.5"
                  strokeDasharray="12 6"
                  className="hidden sm:block"
                />
              </svg>

              {/* Orbiting dots */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                {[0, 90, 180, 270].map((deg, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                    style={{
                      animation: `spin 3s linear infinite`,
                      animationDelay: `${idx * 0.2}s`
                    }}
                  >
                    <div 
                      className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#c9b07a]"
                      style={{
                        top: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: 0.4 + (idx * 0.15),
                        boxShadow: '0 0 8px rgba(201, 176, 122, 0.5)'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Center shield with glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#c9b07a]/20 blur-2xl scale-150" />
                  
                  {/* Shield container */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 border-2 border-[#c9b07a] bg-[#003f69] flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 sm:w-9 sm:h-9 text-[#c9b07a]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Progress circle */}
              <svg className="w-28 h-28 sm:w-32 sm:h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  stroke="#c9b07a"
                  strokeWidth="2.5"
                  strokeDasharray={`${progress * 3.14} 314`}
                  strokeLinecap="round"
                  className="transition-all duration-300 sm:hidden"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(201, 176, 122, 0.6))' }}
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#c9b07a"
                  strokeWidth="2.5"
                  strokeDasharray={`${progress * 3.52} 352`}
                  strokeLinecap="round"
                  className="transition-all duration-300 hidden sm:block"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(201, 176, 122, 0.6))' }}
                />
              </svg>
            </div>
          </div>

          {/* Title - Compact */}
          <div className="mb-5 text-center">
            <h2 className="text-[#ffffff] text-xl sm:text-2xl mb-2 tracking-wide">
              Autenticación en Proceso
            </h2>
            <p className="text-[#9ab3c9] text-sm tracking-wide">
              Estableciendo conexión segura con Enlace CHUBB
            </p>
          </div>

          {/* Progress bar - Compact */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#e8ebee] text-sm tracking-wide">
                Progreso de autenticación
              </span>
              <span className="text-[#c9b07a] tracking-wider tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative h-2 bg-[#003f69] border border-[#285e8e] overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-[#c9b07a] transition-all duration-300"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 12px rgba(201, 176, 122, 0.5)'
                }}
              />
            </div>
          </div>

          {/* Security badges - Compact */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-[#003f69] border border-[#285e8e] p-3 flex items-center gap-2.5">
              <div className="w-9 h-9 border border-[#285e8e] bg-[#0f4575] flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-[#c9b07a]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[#e8ebee] text-xs sm:text-sm tracking-wide mb-0.5">Cifrado SSL</p>
                <p className="text-[#9ab3c9] text-xs tracking-wide">TLS 1.3 - 256 bits</p>
              </div>
            </div>
            <div className="bg-[#003f69] border border-[#285e8e] p-3 flex items-center gap-2.5">
              <div className="w-9 h-9 border border-[#285e8e] bg-[#0f4575] flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-[#c9b07a]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[#e8ebee] text-xs sm:text-sm tracking-wide mb-0.5">Acceso Seguro</p>
                <p className="text-[#9ab3c9] text-xs tracking-wide">Verificación dual</p>
              </div>
            </div>
          </div>

          {/* Validation steps - Compact */}
          <div className="space-y-2.5">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 border transition-all duration-500 ${
                    isActive 
                      ? 'bg-[#003f69] border-[#c9b07a]/40 shadow-lg' 
                      : isCompleted 
                        ? 'bg-[#003f69]/50 border-[#285e8e]' 
                        : 'bg-transparent border-[#0f4575]'
                  }`}
                >
                  <div className={`w-9 h-9 border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    isActive 
                      ? 'border-[#c9b07a] bg-[#0f4575]' 
                      : isCompleted 
                        ? 'border-[#6a9bc7] bg-[#0f4575]' 
                        : 'border-[#285e8e] bg-[#003f69]'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#4ade80]" strokeWidth={2} />
                    ) : (
                      <StepIcon className={`w-4.5 h-4.5 transition-colors duration-500 ${
                        isActive ? 'text-[#c9b07a]' : 'text-[#6a9bc7]'
                      }`} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm tracking-wide transition-colors duration-500 ${
                      isActive 
                        ? 'text-[#ffffff]' 
                        : isCompleted 
                          ? 'text-[#9ab3c9]' 
                          : 'text-[#868c94]'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                  {isActive && (
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#c9b07a] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-[#c9b07a] rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-[#c9b07a] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer message - Compact */}
          <div className="mt-5 pt-5 border-t border-[#285e8e] text-center">
            <p className="text-[#9ab3c9] text-xs sm:text-sm tracking-wide">
              Por favor, espere mientras validamos su identidad
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}