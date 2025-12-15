import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Lock, User, Shield, ArrowRight, ChevronRight, FileText, CreditCard, Image, Search } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";

interface LoginPageProps {
  onForgotPassword: () => void;
  onLoginSuccess: () => void;
}

export function LoginPage({ onForgotPassword, onLoginSuccess }: LoginPageProps) {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Login attempt:", { rut, password });
    
    // Loading duration matches the progress animation (100% completion)
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 7200); // ~7.2 seconds to ensure 100% completion
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen w-full bg-[#003f69] flex relative">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f4575 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Left side - Premium Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative overflow-hidden border-r border-[#285e8e]/40">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          {/* Top corner geometric */}
          <div className="absolute -top-48 -right-48 w-[500px] h-[500px] border border-[#b8bcc2]/8 rounded-full" />
          <div className="absolute -top-40 -right-40 w-[450px] h-[450px] border border-[#b8bcc2]/5 rounded-full" />
          
          {/* Bottom corner accent */}
          <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] border border-[#285e8e]/20" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] border border-[#285e8e]/15" />
          
          {/* Center diamond */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-[#0f4575]/40 rotate-45" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between py-16 px-12 xl:px-20 w-full">
          {/* Top section */}
          <div>
            {/* Logo & Brand */}
            <div className="mb-14">
              <div className="flex items-end gap-4 mb-6">
                <div className="w-14 h-14 border-2 border-[#c9b07a] bg-[#0f4575] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9b07a]/5 to-transparent" />
                  <Shield className="w-8 h-8 text-[#c9b07a] relative z-10" strokeWidth={1.25} />
                </div>
                <div>
                  <h1 className="text-[#ffffff] text-3xl tracking-[0.25em] mb-1">CHUBB</h1>
                  <div className="h-0.5 w-full bg-[#c9b07a]" />
                </div>
              </div>
              
              <div className="space-y-1.5 mb-5">
                <h2 className="text-[#e8ebee] text-2xl tracking-[0.08em]">
                  Enlace
                </h2>
                <div className="space-y-0.5">
                  <p className="text-[#9ab3c9] text-sm tracking-wide">
                    Tecnología - Integración
                  </p>
                  <p className="text-[#9ab3c9] text-sm tracking-wide">
                    Control de Procesos
                  </p>
                  <p className="text-[#9ab3c9] text-sm tracking-wide">
                    Documentación
                  </p>
                </div>
              </div>
            </div>

            {/* Main message */}
            <div className="max-w-md space-y-6">
              <div>
                <h3 className="text-[#ffffff] text-xl xl:text-2xl leading-tight tracking-wide mb-3">
                  ¿Qué es Enlace?
                </h3>
                <div className="h-px w-16 bg-[#c9b07a] mb-4" />
                <p className="text-[#e8ebee] text-base tracking-wide mb-3">
                  Un modelo de <span className="text-[#c9b07a]">Autogestión, Tecnología y Control en Línea</span>
                </p>
                <p className="text-[#9ab3c9] leading-relaxed tracking-wide text-sm">
                  Un Servicio Integrado de Seguros de Vida, que le permitirá acceder a la misma información y en el mismo momento que los ejecutivos de la Compañía.
                </p>
              </div>

              {/* Services highlights */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[#e8ebee] text-sm tracking-wide uppercase mb-3">
                  Servicios Disponibles
                </h4>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { icon: Search, title: "Consultas", desc: "De clientes y de seguros vendidos" },
                    { icon: FileText, title: "Emisión de Certificados", desc: "Certificados de cobertura disponibles para impresión" },
                    { icon: CreditCard, title: "DPS Web Créditos Hipotecario", desc: "Ingreso en línea de DPS para evaluar seguros" },
                    { icon: Image, title: "Imágenes de Documentos", desc: "Imagen digitalizada de todas las propuestas" }
                  ].map((service, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 group">
                      <div className="w-8 h-8 border border-[#285e8e] bg-[#0f4575] flex items-center justify-center flex-shrink-0 group-hover:border-[#c9b07a] transition-all duration-300">
                        <service.icon className="w-4 h-4 text-[#6a9bc7] group-hover:text-[#c9b07a] transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h5 className="text-[#e8ebee] text-sm tracking-wide mb-0.5">
                          {service.title}
                        </h5>
                        <p className="text-[#9ab3c9] text-xs tracking-wide leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom info */}
          <div className="border-t border-[#285e8e]/40 pt-6">
            <p className="text-[#868c94] text-xs tracking-wide">
              Sistema exclusivo para corredores y ejecutivos autorizados de CHUBB
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-[55%] xl:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="w-full max-w-[520px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <div className="flex items-end gap-3 mb-4">
              <div className="w-12 h-12 border-2 border-[#c9b07a] bg-[#0f4575] flex items-center justify-center">
                <Shield className="w-7 h-7 text-[#c9b07a]" strokeWidth={1.25} />
              </div>
              <div>
                <h1 className="text-[#ffffff] text-2xl tracking-[0.25em]">CHUBB</h1>
                <div className="h-0.5 w-full bg-[#c9b07a]" />
              </div>
            </div>
            <div className="mt-3">
              <h2 className="text-[#e8ebee] text-xl tracking-wide mb-1">Enlace</h2>
              <p className="text-[#9ab3c9] text-sm">Tecnología - Integración</p>
            </div>
          </div>

          {/* Login card */}
          <div className="bg-[#0f4575] border border-[#285e8e] relative shadow-2xl">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#b8bcc2]/15" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#b8bcc2]/15" />
            
            <div className="p-8 xl:p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#ffffff] text-xl tracking-wide">
                    Acceso al Sistema
                  </h2>
                  <div className="h-6 w-px bg-[#285e8e]" />
                </div>
                <p className="text-[#9ab3c9] tracking-wide text-sm">
                  Ingrese sus credenciales para acceder a Enlace
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* RUT field */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="rut" 
                    className="text-[#e8ebee] tracking-wide text-sm"
                  >
                    Ingrese RUT
                  </Label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9b07a] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                    <User 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a9bc7] group-focus-within:text-[#c9b07a] transition-colors duration-300" 
                      strokeWidth={1.5}
                    />
                    <Input
                      id="rut"
                      type="text"
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      className="h-12 pl-11 pr-4 bg-[#003f69] border-[#285e8e] text-[#ffffff] placeholder:text-[#868c94] focus:border-[#c9b07a] focus:bg-[#0f4575] transition-all duration-300 text-sm"
                      placeholder="Sin puntos, guión ni dígito verificador"
                      required
                    />
                  </div>
                  <p className="text-xs text-[#868c94] tracking-wide">
                    Ejemplo: 12345678 (sin puntos, guión y DV)
                  </p>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label 
                      htmlFor="password" 
                      className="text-[#e8ebee] tracking-wide text-sm"
                    >
                      Ingrese Clave
                    </Label>
                    <button
                      type="button"
                      className="text-xs text-[#c9b07a] hover:text-[#a68d56] transition-colors tracking-wide flex items-center gap-1 group"
                      onClick={onForgotPassword}
                    >
                      ¿Olvidó su contraseña?
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9b07a] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                    <Lock 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a9bc7] group-focus-within:text-[#c9b07a] transition-colors duration-300" 
                      strokeWidth={1.5}
                    />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-11 pr-4 bg-[#003f69] border-[#285e8e] text-[#ffffff] placeholder:text-[#868c94] focus:border-[#c9b07a] focus:bg-[#0f4575] transition-all duration-300 text-sm"
                      placeholder="Ingrese su clave de acceso"
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#c9b07a] hover:bg-[#a68d56] text-[#003f69] transition-all duration-300 tracking-wide text-sm group relative overflow-hidden shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
                      Ingresar
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </span>
                  </Button>
                </div>
              </form>

              {/* Info section */}
              <div className="mt-8 pt-6 border-t border-[#285e8e]">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-[#c9b07a] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-[#e8ebee] text-sm tracking-wide mb-0.5">
                        Acceso Seguro
                      </h4>
                      <p className="text-[#9ab3c9] text-xs tracking-wide leading-relaxed">
                        Toda la información transmitida está cifrada con los más altos estándares de seguridad
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center pt-3">
                    <p className="text-sm text-[#9ab3c9] tracking-wide mb-2">
                      ¿Necesita asistencia técnica?
                    </p>
                    <button className="text-[#c9b07a] hover:text-[#a68d56] transition-colors tracking-wide text-sm inline-flex items-center gap-2 group">
                      Contactar Soporte
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-center gap-6 text-xs">
              <button className="text-[#868c94] hover:text-[#9ab3c9] transition-colors tracking-wide">
                Términos de Uso
              </button>
              <div className="w-px h-3 bg-[#285e8e]" />
              <button className="text-[#868c94] hover:text-[#9ab3c9] transition-colors tracking-wide">
                Privacidad
              </button>
              <div className="w-px h-3 bg-[#285e8e]" />
              <button className="text-[#868c94] hover:text-[#9ab3c9] transition-colors tracking-wide">
                Seguridad
              </button>
            </div>
            <p className="text-center text-xs text-[#868c94] tracking-wide">
              © 2025 CHUBB. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}