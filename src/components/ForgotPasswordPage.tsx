import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Shield, ArrowRight, ArrowLeft, User, Mail } from "lucide-react";

interface ForgotPasswordPageProps {
  onBack: () => void;
}

export function ForgotPasswordPage({ onBack }: ForgotPasswordPageProps) {
  const [rut, setRut] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Password recovery request for RUT:", rut);
  };

  return (
    <div className="min-h-screen w-full bg-[#003f69] flex relative">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f4575 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content wrapper */}
      <div className="w-full flex items-center justify-center p-6 lg:p-12 relative">
        <div className="w-full max-w-[600px]">
          {/* Logo header */}
          <div className="mb-12">
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
              <div className="space-y-0.5">
                <p className="text-[#9ab3c9] text-sm tracking-wide">Tecnología - Integración</p>
                <p className="text-[#9ab3c9] text-sm tracking-wide">Control de Procesos</p>
                <p className="text-[#9ab3c9] text-sm tracking-wide">Documentación</p>
              </div>
            </div>
          </div>

          {/* Recovery card */}
          <div className="bg-[#0f4575] border border-[#285e8e] relative shadow-2xl">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#b8bcc2]/15" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#b8bcc2]/15" />
            
            <div className="p-8 xl:p-10">
              {/* Back button */}
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#9ab3c9] hover:text-[#c9b07a] transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
                <span className="text-sm tracking-wide">Volver al inicio de sesión</span>
              </button>

              {/* Header */}
              <div className="mb-8 text-center">
                <h2 className="text-[#ffffff] text-xl tracking-wide mb-2">
                  RECUPERAR CONTRASEÑA
                </h2>
                <div className="h-px w-24 bg-[#c9b07a] mx-auto" />
              </div>

              {!isSubmitted ? (
                <>
                  {/* Instructions */}
                  <div className="mb-8 text-center">
                    <p className="text-[#9ab3c9] tracking-wide text-sm leading-relaxed">
                      Ingrese su RUT ejecutivo para recibir una clave provisoria en su correo electrónico registrado
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* RUT field */}
                    <div className="space-y-2">
                      <Label 
                        htmlFor="rut-recovery" 
                        className="text-[#e8ebee] tracking-wide text-sm"
                      >
                        RUT EJECUTIVO (SIN PTOS, GUIÓN Y DV)
                      </Label>
                      <div className="relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9b07a] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                        <User 
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a9bc7] group-focus-within:text-[#c9b07a] transition-colors duration-300" 
                          strokeWidth={1.5}
                        />
                        <Input
                          id="rut-recovery"
                          type="text"
                          value={rut}
                          onChange={(e) => setRut(e.target.value)}
                          className="h-12 pl-11 pr-4 bg-[#003f69] border-[#285e8e] text-[#ffffff] placeholder:text-[#868c94] focus:border-[#c9b07a] focus:bg-[#0f4575] transition-all duration-300 text-sm"
                          placeholder="Ejemplo: 12345678"
                          required
                        />
                      </div>
                    </div>

                    {/* Info message */}
                    <div className="bg-[#003f69] border border-[#285e8e] p-4 rounded-sm">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-[#c9b07a] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <p className="text-[#9ab3c9] text-xs tracking-wide leading-relaxed">
                          Haz clic en <span className="text-[#c9b07a]">"CONTINUAR"</span> y te enviaremos una clave provisoria a tu correo electrónico registrado
                        </p>
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full h-12 bg-[#c9b07a] hover:bg-[#a68d56] text-[#003f69] transition-all duration-300 tracking-wide text-sm group relative overflow-hidden shadow-lg hover:shadow-xl"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
                          Continuar
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                        </span>
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success message */
                <div className="text-center py-6">
                  <div className="w-16 h-16 border-2 border-[#c9b07a] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-[#c9b07a]" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-[#ffffff] text-lg tracking-wide mb-3">
                    Solicitud Enviada
                  </h3>
                  <div className="h-px w-16 bg-[#c9b07a] mx-auto mb-6" />
                  
                  <div className="space-y-4 mb-8">
                    <p className="text-[#e8ebee] tracking-wide text-sm">
                      Se ha enviado una clave provisoria al correo electrónico asociado al RUT <span className="text-[#c9b07a]">{rut}</span>
                    </p>
                    <p className="text-[#9ab3c9] text-sm tracking-wide leading-relaxed">
                      Por favor, revise su bandeja de entrada y la carpeta de spam. La clave provisoria llegará en los próximos minutos.
                    </p>
                  </div>

                  <div className="bg-[#003f69] border border-[#285e8e] p-4 rounded-sm mb-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-4 h-4 text-[#c9b07a] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <p className="text-[#9ab3c9] text-xs tracking-wide leading-relaxed text-left">
                        Por seguridad, se recomienda cambiar su clave provisoria una vez que ingrese al sistema
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={onBack}
                    className="w-full h-12 bg-[#285e8e] hover:bg-[#337ab9] text-[#ffffff] transition-all duration-300 tracking-wide text-sm group"
                  >
                    <span className="flex items-center justify-center gap-2 uppercase">
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
                      Volver al Login
                    </span>
                  </Button>
                </div>
              )}

              {/* Support section */}
              {!isSubmitted && (
                <div className="mt-8 pt-6 border-t border-[#285e8e]">
                  <div className="text-center">
                    <p className="text-sm text-[#9ab3c9] tracking-wide mb-2">
                      ¿No tienes acceso a tu correo registrado?
                    </p>
                    <button className="text-[#c9b07a] hover:text-[#a68d56] transition-colors tracking-wide text-sm inline-flex items-center gap-2 group">
                      Contactar Soporte Técnico
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              )}
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
