import { Shield, LogOut, ChevronDown, ChevronRight, Users, FileText, ShieldCheck, Settings, Laptop, AlertTriangle, RefreshCw, Calculator, FileEdit, Menu } from "lucide-react";
import { useState } from "react";

interface AppSidebarProps {
  onLogout: () => void;
  onNavigateToUsers: () => void;
  onNavigateToITRequests: () => void;
  currentSection: "users" | "it-requests";
  onToggleMenu: () => void;
}

export function AppSidebar({ 
  onLogout, 
  onNavigateToUsers, 
  onNavigateToITRequests,
  currentSection,
  onToggleMenu
}: AppSidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(
    currentSection === "users" ? "administracion" : "solicitudes"
  );

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <aside className="w-72 bg-[#0f4575] border-r border-[#285e8e] relative shadow-2xl flex flex-col h-screen">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003f69]/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo & Brand Section */}
        <div className="p-6 border-b border-[#285e8e]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 border-2 border-[#c9b07a] bg-[#003f69] flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#c9b07a]" strokeWidth={1.25} />
            </div>
            <div className="flex-1">
              <h1 className="text-[#ffffff] text-xl tracking-[0.25em]">CHUBB</h1>
              <div className="h-0.5 w-full bg-[#c9b07a]" />
            </div>
          </div>
          <div>
            <h2 className="text-[#e8ebee] tracking-wide text-lg">Enlace</h2>
            <p className="text-[#9ab3c9] text-xs tracking-wide">Sistema de Gestión</p>
          </div>
        </div>

        {/* Toggle Menu Button */}
        <div className="px-6 py-3 border-b border-[#285e8e]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMenu();
            }}
            className="w-full px-4 py-2 bg-[#285e8e] hover:bg-[#337ab9] text-[#e8ebee] hover:text-[#ffffff] transition-all duration-300 flex items-center justify-center gap-2 border border-[#337ab9]"
            title="Cambiar a menú horizontal"
          >
            <Menu className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-xs tracking-wide">Menú Horizontal</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Administración Section */}
          <div className="mb-2">
            <button
              onClick={() => toggleMenu("administracion")}
              className={`w-full px-6 py-3 text-left flex items-center justify-between transition-all duration-300 ${
                currentSection === "users"
                  ? "bg-[#285e8e] text-[#ffffff] border-l-4 border-[#c9b07a]"
                  : "text-[#e8ebee] hover:bg-[#285e8e] hover:text-[#ffffff] border-l-4 border-transparent"
              }`}
            >
              <span className="tracking-wide">Administración</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  expandedMenu === "administracion" ? "rotate-180" : ""
                }`}
              />
            </button>
            
            {/* Submenu */}
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                expandedMenu === "administracion" 
                  ? "max-h-96 opacity-100" 
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-[#003f69]/30 py-2">
                <button
                  onClick={onNavigateToUsers}
                  className={`w-full px-6 pl-12 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
                    currentSection === "users"
                      ? "text-[#ffffff] bg-[#337ab9] border-l-4 border-[#c9b07a]"
                      : "text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] border-l-4 border-transparent"
                  }`}
                >
                  <Users className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Administración de Usuarios</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full px-6 pl-12 py-3 text-left flex items-center gap-3 text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 border-l-4 border-transparent"
                >
                  <FileText className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Gestión de Pólizas</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full px-6 pl-12 py-3 text-left flex items-center gap-3 text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 border-l-4 border-transparent"
                >
                  <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Roles y Permisos</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full px-6 pl-12 py-3 text-left flex items-center gap-3 text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 border-l-4 border-transparent"
                >
                  <Settings className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Configuración del Sistema</span>
                </button>
              </div>
            </div>
          </div>

          {/* Solicitudes Section */}
          <div className="mb-2">
            <button
              onClick={() => toggleMenu("solicitudes")}
              className={`w-full px-6 py-3 text-left flex items-center justify-between transition-all duration-300 ${
                currentSection === "it-requests"
                  ? "bg-[#285e8e] text-[#ffffff] border-l-4 border-[#c9b07a]"
                  : "text-[#e8ebee] hover:bg-[#285e8e] hover:text-[#ffffff] border-l-4 border-transparent"
              }`}
            >
              <span className="tracking-wide">Solicitudes</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  expandedMenu === "solicitudes" ? "rotate-180" : ""
                }`}
              />
            </button>
            
            {/* Submenu */}
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                expandedMenu === "solicitudes" 
                  ? "max-h-[32rem] opacity-100" 
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-[#003f69]/30 py-2">
                <button
                  onClick={onNavigateToITRequests}
                  className={`w-full px-6 pl-12 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
                    currentSection === "it-requests"
                      ? "text-[#ffffff] bg-[#337ab9] border-l-4 border-[#c9b07a]"
                      : "text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] border-l-4 border-transparent"
                  }`}
                >
                  <Laptop className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Solicitudes Informáticas</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full px-6 pl-12 py-3 text-left flex items-center gap-3 text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 border-l-4 border-transparent"
                >
                  <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Solicitudes de Siniestros</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full px-6 pl-12 py-3 text-left flex items-center gap-3 text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 border-l-4 border-transparent"
                >
                  <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Solicitudes de Renovación</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full px-6 pl-12 py-3 text-left flex items-center gap-3 text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 border-l-4 border-transparent"
                >
                  <Calculator className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Solicitudes de Cotización</span>
                </button>
                <button
                  onClick={() => {}}
                  className="w-full px-6 pl-12 py-3 text-left flex items-center gap-3 text-[#9ab3c9] hover:text-[#ffffff] hover:bg-[#285e8e] transition-all duration-200 border-l-4 border-transparent"
                >
                  <FileEdit className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Solicitudes de Modificación</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* User info & Logout - Footer */}
        <div className="p-6 border-t border-[#285e8e] bg-[#003f69]/20">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[#e8ebee] text-sm tracking-wide">Admin User</p>
              <p className="text-[#9ab3c9] text-xs">Administrador</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2.5 text-[#9ab3c9] hover:text-[#c9b07a] hover:bg-[#285e8e] transition-all duration-300 group border border-transparent hover:border-[#c9b07a]"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}