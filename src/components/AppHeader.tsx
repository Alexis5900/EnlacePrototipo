import { Shield, LogOut, ChevronDown, Users, FileText, ShieldCheck, Settings, Laptop, AlertTriangle, RefreshCw, Calculator, FileEdit, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface AppHeaderProps {
  onLogout: () => void;
  onNavigateToUsers: () => void;
  onNavigateToITRequests: () => void;
  currentSection: "users" | "it-requests";
  onToggleMenu: () => void;
}

export function AppHeader({ 
  onLogout, 
  onNavigateToUsers, 
  onNavigateToITRequests,
  currentSection,
  onToggleMenu
}: AppHeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleMenuItemClick = (action: () => void) => {
    setOpenMenu(null);
    action();
  };

  return (
    <nav className="bg-[#0f4575] border-b border-[#285e8e] relative shadow-md z-40">{/* Increased z-index */}
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003f69]/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-end gap-3">
              <div className="w-10 h-10 border-2 border-[#c9b07a] bg-[#003f69] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#c9b07a]" strokeWidth={1.25} />
              </div>
              <div>
                <h1 className="text-[#ffffff] text-xl tracking-[0.25em]">CHUBB</h1>
                <div className="h-0.5 w-full bg-[#c9b07a]" />
              </div>
            </div>
            
            <div className="h-8 w-px bg-[#285e8e]" />
            
            <div>
              <h2 className="text-[#e8ebee] tracking-wide">Enlace</h2>
              <p className="text-[#9ab3c9] text-xs tracking-wide">Sistema de Gestión</p>
            </div>
          </div>

          {/* Menu Items with Dropdowns */}
          <div className="flex items-center gap-4">
            <div ref={menuRef} className="flex items-center gap-1">
              {/* Administración Menu */}
              <div className="relative">
                <button 
                  onClick={() => handleMenuClick("administracion")}
                  onMouseEnter={() => setOpenMenu("administracion")}
                  className={`px-5 py-2.5 transition-all duration-300 tracking-wide text-sm relative overflow-hidden group flex items-center gap-2 ${
                    currentSection === "users"
                      ? "text-[#ffffff] bg-[#285e8e] border border-[#337ab9]"
                      : "text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e]"
                  }`}
                >
                  <span className="relative z-10">Administración</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openMenu === "administracion" ? "rotate-180" : ""
                    }`} 
                  />
                  {currentSection === "users" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c9b07a]" />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  onMouseLeave={() => setOpenMenu(null)}
                  className={`absolute top-full left-0 mt-0 w-64 bg-[#337ab9] border border-[#285e8e] shadow-2xl transition-all duration-300 origin-top z-50 ${
                    openMenu === "administracion" 
                      ? "opacity-100 scale-y-100 visible" 
                      : "opacity-0 scale-y-0 invisible"
                  }`}
                >
                  <div className="p-2">
                    <button
                      onClick={() => handleMenuItemClick(onNavigateToUsers)}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <Users className="w-4 h-4" strokeWidth={1.5} />
                      <span>Administración de Usuarios</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <FileText className="w-4 h-4" strokeWidth={1.5} />
                      <span>Gestión de Pólizas</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                      <span>Roles y Permisos</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <Settings className="w-4 h-4" strokeWidth={1.5} />
                      <span>Configuración del Sistema</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Solicitudes Menu */}
              <div className="relative">
                <button 
                  onClick={() => handleMenuClick("solicitudes")}
                  onMouseEnter={() => setOpenMenu("solicitudes")}
                  className={`px-5 py-2.5 transition-all duration-300 tracking-wide text-sm relative overflow-hidden group flex items-center gap-2 ${
                    currentSection === "it-requests"
                      ? "text-[#ffffff] bg-[#285e8e] border border-[#337ab9]"
                      : "text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e]"
                  }`}
                >
                  <span className="relative z-10">Solicitudes</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openMenu === "solicitudes" ? "rotate-180" : ""
                    }`} 
                  />
                  {currentSection === "it-requests" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c9b07a]" />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  onMouseLeave={() => setOpenMenu(null)}
                  className={`absolute top-full left-0 mt-0 w-64 bg-[#337ab9] border border-[#285e8e] shadow-2xl transition-all duration-300 origin-top z-50 ${
                    openMenu === "solicitudes" 
                      ? "opacity-100 scale-y-100 visible" 
                      : "opacity-0 scale-y-0 invisible"
                  }`}
                >
                  <div className="p-2">
                    <button
                      onClick={() => handleMenuItemClick(onNavigateToITRequests)}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <Laptop className="w-4 h-4" strokeWidth={1.5} />
                      <span>Solicitudes Informáticas</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />
                      <span>Solicitudes de Siniestros</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
                      <span>Solicitudes de Renovación</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <Calculator className="w-4 h-4" strokeWidth={1.5} />
                      <span>Solicitudes de Cotización</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-4 py-3 text-[#e8ebee] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 tracking-wide text-sm border-l-2 border-transparent hover:border-[#c9b07a] flex items-center gap-3"
                    >
                      <FileEdit className="w-4 h-4" strokeWidth={1.5} />
                      <span>Solicitudes de Modificación</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-[#285e8e] ml-2" />

            {/* Toggle Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMenu();
              }}
              className="px-3 py-2 text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-300 flex items-center gap-2 border border-transparent hover:border-[#337ab9]"
              title="Cambiar a menú vertical"
            >
              <Menu className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-xs tracking-wide">Menú Vertical</span>
            </button>

            <div className="h-8 w-px bg-[#285e8e]" />

            {/* User info & Logout */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[#e8ebee] text-sm tracking-wide">Admin User</p>
                <p className="text-[#9ab3c9] text-xs">Administrador</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-[#9ab3c9] hover:text-[#c9b07a] hover:bg-[#285e8e] transition-all duration-300 group"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}