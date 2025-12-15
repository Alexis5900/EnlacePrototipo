import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import {
  ArrowLeft,
  Save,
  User,
  FileText,
  Building,
  Calendar,
  X,
  AlertCircle,
  Folder
} from "lucide-react";

interface ITRequest {
  id: number;
  nroSolicitud: string;
  titulo: string;
  fechaInicio: string;
  fechaTermino: string;
  estado: string;
  fechaEstado: string;
  nombreUsuario: string;
  desarrollador: string;
  tipoSolicitud: string;
  area: string;
  pasoA: string;
  ambiente: string;
  prioridad: "Alta" | "Media" | "Baja";
}

interface ITRequestFormProps {
  request: ITRequest | null;
  onSave: (data: Omit<ITRequest, 'id' | 'fechaEstado'>) => void;
  onCancel: () => void;
  onLogout: () => void;
  onNavigateToUsers: () => void;
  menuType?: "horizontal" | "vertical";
  onToggleMenuType?: () => void;
}

export function ITRequestForm({ request, onSave, onCancel, onLogout, onNavigateToUsers, menuType = "horizontal", onToggleMenuType }: ITRequestFormProps) {
  const [formData, setFormData] = useState({
    nroSolicitud: request?.nroSolicitud || "",
    titulo: request?.titulo || "",
    fechaInicio: request?.fechaInicio || "",
    fechaTermino: request?.fechaTermino || "",
    estado: request?.estado || "EN DESARROLLO",
    nombreUsuario: request?.nombreUsuario || "",
    desarrollador: request?.desarrollador || "",
    tipoSolicitud: request?.tipoSolicitud || "NUEVO DESARROLLO",
    area: request?.area || "INFORMATICA",
    pasoA: request?.pasoA || "DESARROLLO",
    ambiente: request?.ambiente || "DESARROLLO",
    prioridad: (request?.prioridad || "Media") as "Alta" | "Media" | "Baja"
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
          onNavigateToUsers={onNavigateToUsers}
          onNavigateToITRequests={onCancel}
          currentSection="it-requests"
          onToggleMenu={handleToggleMenu}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for horizontal menu */}
        {menuType === "horizontal" && (
          <AppHeader
            onLogout={onLogout}
            onNavigateToUsers={onNavigateToUsers}
            onNavigateToITRequests={onCancel}
            currentSection="it-requests"
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
                  {request ? "Editar Solicitud" : "Nueva Solicitud"}
                </h1>
                <p className="text-[#868c94] text-sm">
                  {request ? "Modifica la información de la solicitud" : "Completa los datos de la nueva solicitud"}
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
                Guardar Solicitud
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
                <h2 className="text-[#003f69] mb-1">Información de la Solicitud</h2>
                <div className="h-0.5 w-16 bg-[#337ab9]" />
              </div>

              <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Número de Solicitud */}
                  <div className="space-y-2">
                    <Label htmlFor="nroSolicitud" className="text-[#003f69] tracking-wide text-sm">
                      Número de Solicitud *
                    </Label>
                    <div className="relative group">
                      <FileText 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="nroSolicitud"
                        type="text"
                        value={formData.nroSolicitud}
                        onChange={(e) => setFormData({ ...formData, nroSolicitud: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="Ej: 2024000134"
                        required
                      />
                    </div>
                  </div>

                  {/* Prioridad */}
                  <div className="space-y-2">
                    <Label htmlFor="prioridad" className="text-[#003f69] tracking-wide text-sm">
                      Prioridad *
                    </Label>
                    <div className="relative group">
                      <AlertCircle 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300 z-10" 
                        strokeWidth={1.5}
                      />
                      <select
                        id="prioridad"
                        value={formData.prioridad}
                        onChange={(e) => setFormData({ ...formData, prioridad: e.target.value as "Alta" | "Media" | "Baja" })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border border-[#e8ebee] text-[#003f69] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm w-full rounded-md appearance-none"
                        required
                      >
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 2 - Título (full width) */}
                <div className="space-y-2">
                  <Label htmlFor="titulo" className="text-[#003f69] tracking-wide text-sm">
                    Título de la Solicitud *
                  </Label>
                  <Input
                    id="titulo"
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="h-11 px-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                    placeholder="Describe brevemente la solicitud"
                    required
                  />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Tipo de Solicitud */}
                  <div className="space-y-2">
                    <Label htmlFor="tipoSolicitud" className="text-[#003f69] tracking-wide text-sm">
                      Tipo de Solicitud *
                    </Label>
                    <div className="relative group">
                      <Folder 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300 z-10" 
                        strokeWidth={1.5}
                      />
                      <select
                        id="tipoSolicitud"
                        value={formData.tipoSolicitud}
                        onChange={(e) => setFormData({ ...formData, tipoSolicitud: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border border-[#e8ebee] text-[#003f69] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm w-full rounded-md appearance-none"
                        required
                      >
                        <option value="NUEVO DESARROLLO">NUEVO DESARROLLO</option>
                        <option value="CORRECCION DE PROGRAMA">CORRECCION DE PROGRAMA</option>
                        <option value="MEJORA DE PERFORMANCE">MEJORA DE PERFORMANCE</option>
                        <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                        <option value="INCIDENTE">INCIDENTE</option>
                      </select>
                    </div>
                  </div>

                  {/* Área */}
                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-[#003f69] tracking-wide text-sm">
                      Área *
                    </Label>
                    <div className="relative group">
                      <Building 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300 z-10" 
                        strokeWidth={1.5}
                      />
                      <select
                        id="area"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border border-[#e8ebee] text-[#003f69] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm w-full rounded-md appearance-none"
                        required
                      >
                        <option value="INFORMATICA">INFORMATICA</option>
                        <option value="OPERACIONES">OPERACIONES</option>
                        <option value="SINIESTROS">SINIESTROS</option>
                        <option value="COMERCIAL">COMERCIAL</option>
                        <option value="FINANZAS">FINANZAS</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Estado */}
                  <div className="space-y-2">
                    <Label htmlFor="estado" className="text-[#003f69] tracking-wide text-sm">
                      Estado *
                    </Label>
                    <select
                      id="estado"
                      value={formData.estado}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                      className="h-11 px-4 bg-[#ffffff] border border-[#e8ebee] text-[#003f69] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm w-full rounded-md"
                      required
                    >
                      <option value="EN DESARROLLO">EN DESARROLLO</option>
                      <option value="CERTIFICACION">CERTIFICACION</option>
                      <option value="GESTION CONFIGURACION">GESTION CONFIGURACION</option>
                      <option value="TERMINADO">TERMINADO</option>
                      <option value="CANCELADO">CANCELADO</option>
                    </select>
                  </div>

                  {/* Ambiente */}
                  <div className="space-y-2">
                    <Label htmlFor="pasoA" className="text-[#003f69] tracking-wide text-sm">
                      Ambiente / Paso A *
                    </Label>
                    <select
                      id="pasoA"
                      value={formData.pasoA}
                      onChange={(e) => setFormData({ ...formData, pasoA: e.target.value, ambiente: e.target.value })}
                      className="h-11 px-4 bg-[#ffffff] border border-[#e8ebee] text-[#003f69] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm w-full rounded-md"
                      required
                    >
                      <option value="DESARROLLO">DESARROLLO</option>
                      <option value="CERTIFICACION">CERTIFICACION</option>
                      <option value="PRODUCCION">PRODUCCION</option>
                    </select>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e8ebee] my-8" />

                {/* Responsables Section */}
                <div className="mb-6">
                  <h2 className="text-[#003f69] mb-1">Responsables</h2>
                  <div className="h-0.5 w-16 bg-[#337ab9]" />
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Usuario Solicitante */}
                  <div className="space-y-2">
                    <Label htmlFor="nombreUsuario" className="text-[#003f69] tracking-wide text-sm">
                      Usuario Solicitante *
                    </Label>
                    <div className="relative group">
                      <User 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="nombreUsuario"
                        type="text"
                        value={formData.nombreUsuario}
                        onChange={(e) => setFormData({ ...formData, nombreUsuario: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="Nombre del solicitante"
                        required
                      />
                    </div>
                  </div>

                  {/* Desarrollador */}
                  <div className="space-y-2">
                    <Label htmlFor="desarrollador" className="text-[#003f69] tracking-wide text-sm">
                      Desarrollador Asignado *
                    </Label>
                    <div className="relative group">
                      <User 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="desarrollador"
                        type="text"
                        value={formData.desarrollador}
                        onChange={(e) => setFormData({ ...formData, desarrollador: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="Nombre del desarrollador"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Fecha Inicio */}
                  <div className="space-y-2">
                    <Label htmlFor="fechaInicio" className="text-[#003f69] tracking-wide text-sm">
                      Fecha de Inicio
                    </Label>
                    <div className="relative group">
                      <Calendar 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="fechaInicio"
                        type="text"
                        value={formData.fechaInicio}
                        onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="ej: 15/10/24"
                      />
                    </div>
                  </div>

                  {/* Fecha Término */}
                  <div className="space-y-2">
                    <Label htmlFor="fechaTermino" className="text-[#003f69] tracking-wide text-sm">
                      Fecha de Término
                    </Label>
                    <div className="relative group">
                      <Calendar 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#868c94] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        id="fechaTermino"
                        type="text"
                        value={formData.fechaTermino}
                        onChange={(e) => setFormData({ ...formData, fechaTermino: e.target.value })}
                        className="h-11 pl-10 pr-4 bg-[#ffffff] border-[#e8ebee] text-[#003f69] placeholder:text-[#b8bcc2] focus:border-[#337ab9] focus:ring-1 focus:ring-[#337ab9] transition-all duration-300 text-sm"
                        placeholder="ej: 20/10/24 o //"
                      />
                    </div>
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