import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Briefcase,
  Calendar,
  X,
  FileText
} from "lucide-react";

interface User {
  id: number;
  rut: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  perfil: string;
  estado: "Activo" | "Inactivo";
  ubicacion: string;
  departamento: string;
  ticketsAsignados: number;
  fechaIngreso: string;
}

interface UserFormProps {
  user: User | null;
  onSave: (data: Omit<User, 'id'>) => void;
  onCancel: () => void;
  onLogout: () => void;
  onNavigateToITRequests: () => void;
  menuType?: "horizontal" | "vertical";
  onToggleMenuType?: () => void;
}

export function UserForm({ user, onSave, onCancel, onLogout, onNavigateToITRequests, menuType = "horizontal", onToggleMenuType }: UserFormProps) {
  const [formData, setFormData] = useState({
    rut: user?.rut || "",
    nombre: user?.nombre || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    empresa: user?.empresa || "CHUBB Seguros",
    perfil: user?.perfil || "Usuario",
    estado: (user?.estado || "Activo") as "Activo" | "Inactivo",
    ubicacion: user?.ubicacion || "",
    departamento: user?.departamento || "Tecnología",
    ticketsAsignados: user?.ticketsAsignados || 0,
    fechaIngreso: user?.fechaIngreso || ""
  });

  // Safe wrapper for toggle menu
  const handleToggleMenu = () => {
    if (onToggleMenuType) {
      onToggleMenuType();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="flex h-screen bg-[#f5f7f9]">
      {/* Navigation - Conditional based on menu type */}
      {menuType === "vertical" && (
        <AppSidebar
          onLogout={onLogout}
          onNavigateToUsers={onCancel}
          onNavigateToITRequests={onNavigateToITRequests}
          currentSection="users"
          onToggleMenu={handleToggleMenu}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for horizontal menu */}
        {menuType === "horizontal" && (
          <AppHeader
            onLogout={onLogout}
            onNavigateToUsers={onCancel}
            onNavigateToITRequests={onNavigateToITRequests}
            currentSection="users"
            onToggleMenu={handleToggleMenu}
          />
        )}
        
        {/* Form Header */}
        <div className="bg-[#ffffff] border-b border-[#e8ebee] px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="w-10 h-10 bg-[#337ab9] hover:bg-[#285e8e] text-[#ffffff] flex items-center justify-center transition-all duration-300"
                title="Volver"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <div>
                <h1 className="text-[#003f69] text-xl">
                  {user ? "Editar Usuario" : "Nuevo Usuario"}
                </h1>
                <p className="text-[#868c94] text-sm">
                  {user ? "Modifica la información del usuario" : "Completa los datos del nuevo usuario"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={onCancel}
                className="h-10 bg-[#ffffff] hover:bg-[#f5f7f9] text-[#868c94] border border-[#e8ebee] transition-all duration-300 tracking-wide text-sm px-6"
              >
                <X className="w-4 h-4 mr-2" strokeWidth={2} />
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                className="h-10 bg-[#337ab9] hover:bg-[#285e8e] text-[#ffffff] transition-all duration-300 tracking-wide text-sm px-6"
              >
                <Save className="w-4 h-4 mr-2" strokeWidth={2} />
                Guardar Usuario
              </Button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Main Card */}
            <div className="bg-[#ffffff] border border-[#e8ebee] p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-[#003f69] mb-1">Información Personal</h2>
                <div className="h-0.5 w-16 bg-[#337ab9]" />
              </div>

              <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* RUT */}
                  <div className="space-y-2">
                    <Label htmlFor="rut" className="text-[#003f69] tracking-wide text-sm">
                      Documento / RUT *
                    </Label>
                    <div className="relative group">
                      <User 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="rut"
                        type="text"
                        value={formData.rut}
                        onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="Ingresa el documento"
                        required
                      />
                    </div>
                  </div>

                  {/* Nombre */}
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-[#003f69] tracking-wide text-sm">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="h-11 px-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                      placeholder="Ingresa el nombre completo"
                      required
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#003f69] tracking-wide text-sm">
                      Correo Electrónico *
                    </Label>
                    <div className="relative group">
                      <Mail 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="correo@chubb.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-[#003f69] tracking-wide text-sm">
                      Teléfono *
                    </Label>
                    <div className="relative group">
                      <Phone 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="telefono"
                        type="text"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="+54 11 1234-5678"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Empresa */}
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-[#003f69] tracking-wide text-sm">
                      Empresa
                    </Label>
                    <div className="relative group">
                      <Building 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="empresa"
                        type="text"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="CHUBB Seguros"
                      />
                    </div>
                  </div>

                  {/* Perfil */}
                  <div className="space-y-2">
                    <Label htmlFor="perfil" className="text-[#003f69] tracking-wide text-sm">
                      Perfil de Acceso *
                    </Label>
                    <select
                      id="perfil"
                      value={formData.perfil}
                      onChange={(e) => setFormData({ ...formData, perfil: e.target.value })}
                      className="h-11 px-4 bg-[#ffffff] border border-[#e8ebee] text-[#003f69] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm w-full rounded-md"
                      required
                    >
                      <option value="Usuario">Usuario</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Departamento */}
                  <div className="space-y-2">
                    <Label htmlFor="departamento" className="text-[#003f69] tracking-wide text-sm">
                      Departamento *
                    </Label>
                    <div className="relative group">
                      <Briefcase 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <select
                        id="departamento"
                        value={formData.departamento}
                        onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border border-[#e8ebee] text-[#003f69] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm w-full rounded-md appearance-none"
                        required
                      >
                        <option value="Tecnología">Tecnología</option>
                        <option value="Operaciones">Operaciones</option>
                        <option value="Siniestros">Siniestros</option>
                        <option value="Recursos Humanos">Recursos Humanos</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Finanzas">Finanzas</option>
                        <option value="Legal">Legal</option>
                      </select>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="space-y-2">
                    <Label htmlFor="ubicacion" className="text-[#003f69] tracking-wide text-sm">
                      Ubicación / Oficina
                    </Label>
                    <div className="relative group">
                      <MapPin 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="ubicacion"
                        type="text"
                        value={formData.ubicacion}
                        onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="Oficina Central, Buenos Aires"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e8ebee] my-8" />

                {/* Additional Info Section */}
                <div className="mb-6">
                  <h2 className="text-[#003f69] mb-1">Información Adicional</h2>
                  <div className="h-0.5 w-16 bg-[#337ab9]" />
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Tickets Asignados */}
                  <div className="space-y-2">
                    <Label htmlFor="ticketsAsignados" className="text-[#003f69] tracking-wide text-sm">
                      Tickets Asignados
                    </Label>
                    <div className="relative group">
                      <FileText 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="ticketsAsignados"
                        type="number"
                        min="0"
                        value={formData.ticketsAsignados}
                        onChange={(e) => setFormData({ ...formData, ticketsAsignados: parseInt(e.target.value) || 0 })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Fecha Ingreso */}
                  <div className="space-y-2">
                    <Label htmlFor="fechaIngreso" className="text-[#003f69] tracking-wide text-sm">
                      Fecha de Ingreso
                    </Label>
                    <div className="relative group">
                      <Calendar 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="fechaIngreso"
                        type="text"
                        value={formData.fechaIngreso}
                        onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="ej: Ene 2024"
                      />
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="space-y-2">
                    <Label htmlFor="estado" className="text-[#003f69] tracking-wide text-sm">
                      Estado de Cuenta
                    </Label>
                    <select
                      id="estado"
                      value={formData.estado}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.value as "Activo" | "Inactivo" })}
                      className="h-11 px-4 bg-[#ffffff] border border-[#e8ebee] text-[#003f69] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm w-full rounded-md"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Footer */}
            <div className="mt-4 text-center">
              <p className="text-[#868c94] text-sm">
                Los campos marcados con * son obligatorios
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}