import { useState } from "react";
import { Button } from "./ui/button";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Plus,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
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

interface ITRequestDetailProps {
  request: ITRequest;
  onBack: () => void;
  onEdit: (request: ITRequest) => void;
  onDelete: (id: number) => void;
  onLogout: () => void;
  onNavigateToUsers: () => void;
  menuType?: "horizontal" | "vertical";
  onToggleMenuType?: () => void;
}

interface Document {
  id: number;
  fechaIngreso: string;
  horaIngreso: string;
  archivo: string;
  usuario: string;
}

interface Object {
  id: number;
  tipo: string;
  nombre: string;
  estado: string;
  observacion: string;
  fechaIngreso: string;
  horaIngreso: string;
}

interface ActivityData {
  id: number;
  tipo: string;
  descripcion: string;
  fecha: string;
  usuario: string;
}

export function ITRequestDetail({ request, onBack, onEdit, onDelete, onLogout, onNavigateToUsers, menuType = "horizontal", onToggleMenuType }: ITRequestDetailProps) {
  const [activeTab, setActiveTab] = useState<"info" | "documents" | "objects" | "activity">("info");

  // Safe wrapper for toggle menu
  const handleToggleMenu = () => {
    if (onToggleMenuType) {
      onToggleMenuType();
    }
  };

  // Mock documents
  const documents: Document[] = [
    { id: 1, fechaIngreso: "15/10/2024", horaIngreso: "09:30:15", archivo: "ESPECIFICACION_TECNICA_V1.DOCX", usuario: "Catalina Rojas Pinto" },
    { id: 2, fechaIngreso: "18/10/2024", horaIngreso: "14:22:40", archivo: "DIAGRAMA_FLUJO_PROCESO.PDF", usuario: "Felipe González Miranda" },
    { id: 3, fechaIngreso: "22/10/2024", horaIngreso: "11:15:30", archivo: "CASOS_PRUEBA_UAT.XLSX", usuario: "Javiera Muñoz Bravo" },
    { id: 4, fechaIngreso: "24/10/2024", horaIngreso: "16:45:10", archivo: "EVIDENCIAS_CERTIFICACION.ZIP", usuario: "Matías Silva Contreras" }
  ];

  // Mock objects
  const objects: Object[] = [
    { id: 1, tipo: "PROCEDIMIENTO", nombre: "SP_PROCESAR_VALIDACIONES", estado: "NUEVO", observacion: "MÓDULO PRINCIPAL", fechaIngreso: "15/10/24", horaIngreso: "10:30:00" },
    { id: 2, tipo: "FUNCIÓN", nombre: "FN_CALCULAR_INDICADORES", estado: "MODIFICADO", observacion: "MEJORA PERFORMANCE", fechaIngreso: "18/10/24", horaIngreso: "14:15:20" },
    { id: 3, tipo: "VISTA", nombre: "VW_REPORTE_EJECUTIVO", estado: "NUEVO", observacion: "DASHBOARD ANALYTICS", fechaIngreso: "20/10/24", horaIngreso: "09:00:45" }
  ];

  // Mock activities
  const activities: ActivityData[] = [
    {
      id: 1,
      tipo: "Estado Actualizado",
      descripcion: `Estado cambiado a ${request.estado}`,
      fecha: request.fechaEstado,
      usuario: request.desarrollador
    },
    {
      id: 2,
      tipo: "Documento Adjuntado",
      descripcion: "Se adjuntó archivo EVIDENCIAS_CERTIFICACION.ZIP",
      fecha: "24/10/2024 16:45",
      usuario: "Matías Silva Contreras"
    },
    {
      id: 3,
      tipo: "Solicitud Asignada",
      descripcion: `Solicitud asignada a ${request.desarrollador}`,
      fecha: request.fechaInicio,
      usuario: "Sistema Enlace"
    },
    {
      id: 4,
      tipo: "Solicitud Creada",
      descripcion: `Solicitud creada por ${request.nombreUsuario}`,
      fecha: request.fechaInicio,
      usuario: request.nombreUsuario
    }
  ];

  // Calculate KPIs
  const totalDocumentos = documents.length;
  const totalObjetos = objects.length;
  const objetosNuevos = objects.filter(o => o.estado === "NUEVO").length;
  const objetosModificados = objects.filter(o => o.estado === "MODIFICADO").length;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "TERMINADO":
        return "bg-[#4caf50] text-[#ffffff]";
      case "EN DESARROLLO":
        return "bg-[#2196f3] text-[#ffffff]";
      case "CERTIFICACION":
        return "bg-[#ff9800] text-[#ffffff]";
      case "GESTION CONFIGURACION":
        return "bg-[#337ab9] text-[#ffffff]";
      default:
        return "bg-[#868c94] text-[#ffffff]";
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return "bg-[#ff4444] text-[#ffffff]";
      case "Media":
        return "bg-[#ffc107] text-[#1a2332]";
      case "Baja":
        return "bg-[#4caf50] text-[#ffffff]";
      default:
        return "bg-[#868c94] text-[#ffffff]";
    }
  };

  const handleDelete = () => {
    if (confirm("¿Está seguro que desea eliminar esta solicitud?")) {
      console.log("Delete request:", request.id);
      onDelete(request.id);
      onBack();
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f7f9]">
      {/* Navigation - Conditional based on menu type */}
      {menuType === "vertical" && (
        <AppSidebar
          onLogout={onLogout}
          onNavigateToUsers={onNavigateToUsers}
          onNavigateToITRequests={onBack}
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
            onNavigateToITRequests={onBack}
            currentSection="it-requests"
            onToggleMenu={handleToggleMenu}
          />
        )}
      
        {/* Back Button */}
        <div className="bg-[#ffffff] border-b border-[#e8ebee] px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#003f69] hover:text-[#337ab9] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            <span className="text-sm hidden sm:inline">Volver a Solicitudes Informáticas</span>
            <span className="text-sm sm:hidden">Volver</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-[#285e8e] to-[#337ab9] p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 relative overflow-hidden max-w-7xl mx-auto">
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-[#ffffff]/5" />
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#ffffff]/5" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-6">
              {/* Left: Avatar and Info */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full lg:flex-1">
                {/* Avatar */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#ffffff] border-4 border-[#ffffff]/20 flex items-center justify-center shadow-xl flex-shrink-0">
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-[#285e8e]" strokeWidth={1.5} />
                </div>

                {/* Info */}
                <div className="text-[#ffffff] flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-xl sm:text-2xl">N° {request.nroSolicitud}</h1>
                  </div>
                  <p className="text-[#ffffff]/90 mb-4 max-w-2xl text-sm sm:text-base">{request.titulo}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Solicitante: {request.nombreUsuario}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Desarrollador: {request.desarrollador}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Inicio: {request.fechaInicio}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Término: {request.fechaTermino}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Área: {request.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Ambiente: {request.pasoA}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className={`px-3 py-1 text-xs ${getEstadoColor(request.estado)}`}>
                      {request.estado}
                    </span>
                    <span className={`px-3 py-1 text-xs ${getPrioridadColor(request.prioridad)}`}>
                      Prioridad {request.prioridad}
                    </span>
                    <span className="px-3 py-1 bg-[#ffffff]/10 text-[#ffffff] text-xs">
                      {request.tipoSolicitud}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons - Stack horizontally on mobile, vertically on desktop */}
              <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto flex-wrap lg:flex-nowrap">
                <Button
                  className="h-10 bg-[#ffffff] hover:bg-[#f5f7f9] text-[#285e8e] transition-all duration-300 text-sm px-4 justify-center lg:justify-start flex-1 lg:flex-initial"
                >
                  <Edit className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Editar
                </Button>
                <Button
                  onClick={handleDelete}
                  className="h-10 bg-[#ff4444] hover:bg-[#cc0000] text-[#ffffff] transition-all duration-300 text-sm px-4 justify-center lg:justify-start flex-1 lg:flex-initial"
                >
                  <Trash2 className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Eliminar
                </Button>
                <Button
                  className="h-10 bg-[#ffffff] hover:bg-[#f5f7f9] text-[#285e8e] transition-all duration-300 text-sm px-4 justify-center lg:justify-start flex-1 lg:flex-initial"
                >
                  <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  <span className="hidden sm:inline">Adjuntar Archivo</span>
                  <span className="sm:hidden">Archivo</span>
                </Button>
                <Button
                  className="h-10 bg-[#ffffff] hover:bg-[#f5f7f9] text-[#285e8e] transition-all duration-300 text-sm px-4 justify-center lg:justify-start flex-1 lg:flex-initial"
                >
                  <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Exportar
                </Button>
                <Button
                  className="h-10 bg-[#ffffff] hover:bg-[#f5f7f9] text-[#285e8e] transition-all duration-300 text-sm px-4 justify-center lg:justify-start flex-1 lg:flex-initial"
                >
                  <FileText className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Historial
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Cards - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Total Documentos */}
            <div className="bg-[#ffffff] border border-[#e8ebee] p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#e8f2f7] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                </div>
                <Activity className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
              </div>
              <p className="text-3xl text-[#003f69] mb-1">{totalDocumentos}</p>
              <p className="text-[#868c94] text-sm">Documentos Adjuntos</p>
            </div>

            {/* Total Objetos */}
            <div className="bg-[#ffffff] border border-[#e8ebee] p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#e8f2f7] flex items-center justify-center">
                  <Folder className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                </div>
                <Activity className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
              </div>
              <p className="text-3xl text-[#003f69] mb-1">{totalObjetos}</p>
              <p className="text-[#868c94] text-sm">Objetos de Desarrollo</p>
            </div>

            {/* Objetos Nuevos */}
            <div className="bg-[#ffffff] border-2 border-[#4caf50] p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#e8f5e8] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-[#4caf50]" strokeWidth={1.5} />
                </div>
                <CheckCircle2 className="w-5 h-5 text-[#4caf50]" strokeWidth={1.5} />
              </div>
              <p className="text-3xl text-[#4caf50] mb-1">{objetosNuevos}</p>
              <p className="text-[#868c94] text-sm">Objetos Nuevos</p>
            </div>

            {/* Objetos Modificados */}
            <div className="bg-[#ffffff] border border-[#e8ebee] p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#fff8e1] flex items-center justify-center">
                  <Edit className="w-5 h-5 text-[#ffc107]" strokeWidth={1.5} />
                </div>
                <FileText className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
              </div>
              <p className="text-3xl text-[#003f69] mb-1">{objetosModificados}</p>
              <p className="text-[#868c94] text-sm">Objetos Modificados</p>
            </div>
          </div>

          {/* Tabs - Responsive scrollable */}
          <div className="bg-[#285e8e] flex items-center gap-1 sm:gap-2 mb-0 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === "info"
                  ? "bg-[#ffffff] text-[#003f69]"
                  : "bg-transparent text-[#ffffff] hover:bg-[#337ab9]"
              }`}
            >
              <Activity className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Información</span>
              <span className="sm:hidden">Info</span>
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === "documents"
                  ? "bg-[#ffffff] text-[#003f69]"
                  : "bg-transparent text-[#ffffff] hover:bg-[#337ab9]"
              }`}
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              Documentos
            </button>
            <button
              onClick={() => setActiveTab("objects")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === "objects"
                  ? "bg-[#ffffff] text-[#003f69]"
                  : "bg-transparent text-[#ffffff] hover:bg-[#337ab9]"
              }`}
            >
              <Folder className="w-4 h-4" strokeWidth={1.5} />
              Objetos
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === "activity"
                  ? "bg-[#ffffff] text-[#003f69]"
                  : "bg-transparent text-[#ffffff] hover:bg-[#337ab9]"
              }`}
            >
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              Actividad
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-[#ffffff] border border-[#e8ebee] border-t-0 p-4 sm:p-6">
            {/* INFO TAB - Responsive: 1 col mobile, 2 cols desktop */}
            {activeTab === "info" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Información de Solicitud */}
                <div className="space-y-4">
                  <h3 className="text-[#003f69] flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                    Información de Solicitud
                  </h3>
                  
                  <div className="bg-[#e8f2f7] p-4 space-y-3">
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Número de Solicitud</p>
                      <p className="text-[#003f69]">{request.nroSolicitud}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Tipo de Solicitud</p>
                      <p className="text-[#003f69]">{request.tipoSolicitud}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Estado Actual</p>
                      <span className={`inline-block px-2 py-1 text-xs ${getEstadoColor(request.estado)}`}>
                        {request.estado}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Prioridad</p>
                      <span className={`inline-block px-2 py-1 text-xs ${getPrioridadColor(request.prioridad)}`}>
                        {request.prioridad}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Área</p>
                      <p className="text-[#003f69]">{request.area}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Ambiente</p>
                      <p className="text-[#003f69]">{request.pasoA}</p>
                    </div>
                  </div>
                </div>

                {/* Información de Responsables */}
                <div className="space-y-4">
                  <h3 className="text-[#003f69] flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                    Responsables
                  </h3>
                  
                  <div className="bg-[#e8f2f7] p-4 space-y-4">
                    <div>
                      <p className="text-[#868c94] text-xs mb-2">Solicitante</p>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#337ab9] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#ffffff] text-sm">{getInitials(request.nombreUsuario)}</span>
                        </div>
                        <div>
                          <p className="text-[#003f69] text-sm">{request.nombreUsuario}</p>
                          <p className="text-[#868c94] text-xs">Usuario Solicitante</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[#b8bcc2]" />

                    <div>
                      <p className="text-[#868c94] text-xs mb-2">Desarrollador Asignado</p>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#285e8e] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#ffffff] text-sm">{getInitials(request.desarrollador)}</span>
                        </div>
                        <div>
                          <p className="text-[#003f69] text-sm">{request.desarrollador}</p>
                          <p className="text-[#868c94] text-xs">Analista Programador</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[#b8bcc2]" />

                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Fechas del Proyecto</p>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[#868c94] text-xs">Fecha Inicio:</span>
                          <span className="text-[#003f69] text-sm">{request.fechaInicio}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#868c94] text-xs">Fecha Término:</span>
                          <span className="text-[#003f69] text-sm">{request.fechaTermino}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#868c94] text-xs">Último Cambio:</span>
                          <span className="text-[#003f69] text-sm">{request.fechaEstado}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === "documents" && (
              <div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-[#003f69]">Documentos Adjuntos</h3>
                  <Button className="h-9 bg-[#337ab9] hover:bg-[#285e8e] text-[#ffffff] text-sm px-4 w-full sm:w-auto justify-center">
                    <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Adjuntar Documento
                  </Button>
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[640px]">
                    <thead className="bg-[#e8f2f7] border-b-2 border-[#337ab9]">
                      <tr>
                        <th className="text-center py-3 px-4 text-[#003f69] text-sm">Acción</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Fecha Ingreso</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Hora</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Archivo</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Usuario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.id} className="border-b border-[#e8ebee] hover:bg-[#f5f7f9] transition-colors">
                          <td className="py-3 px-4 text-center">
                            <button className="w-8 h-8 bg-[#e8f2f7] hover:bg-[#337ab9] text-[#337ab9] hover:text-[#ffffff] flex items-center justify-center mx-auto transition-all">
                              <Download className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </td>
                          <td className="py-3 px-4 text-[#003f69] text-sm">{doc.fechaIngreso}</td>
                          <td className="py-3 px-4 text-[#868c94] text-sm">{doc.horaIngreso}</td>
                          <td className="py-3 px-4 text-[#003f69] text-sm">{doc.archivo}</td>
                          <td className="py-3 px-4 text-[#868c94] text-sm">{doc.usuario}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* OBJECTS TAB */}
            {activeTab === "objects" && (
              <div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-[#003f69]">Objetos de Desarrollo</h3>
                  <Button className="h-9 bg-[#337ab9] hover:bg-[#285e8e] text-[#ffffff] text-sm px-4 w-full sm:w-auto justify-center">
                    <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Nuevo Objeto
                  </Button>
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[720px]">
                    <thead className="bg-[#e8f2f7] border-b-2 border-[#337ab9]">
                      <tr>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Tipo</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Nombre</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Estado</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Observación</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Fecha Ingreso</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objects.map((obj) => (
                        <tr key={obj.id} className="border-b border-[#e8ebee] hover:bg-[#f5f7f9] transition-colors">
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-[#e8f2f7] text-[#337ab9] text-xs">
                              {obj.tipo}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#003f69] text-sm">{obj.nombre}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs ${
                              obj.estado === "NUEVO" ? "bg-[#e8f5e8] text-[#4caf50]" :
                              obj.estado === "MODIFICADO" ? "bg-[#fff8e1] text-[#ffc107]" :
                              "bg-[#e8f2f7] text-[#337ab9]"
                            }`}>
                              {obj.estado}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#868c94] text-sm">{obj.observacion}</td>
                          <td className="py-3 px-4 text-[#868c94] text-sm">{obj.fechaIngreso}</td>
                          <td className="py-3 px-4 text-[#868c94] text-sm">{obj.horaIngreso}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ACTIVITY TAB */}
            {activeTab === "activity" && (
              <div>
                <h3 className="text-[#003f69] mb-4">Registro de Actividad</h3>
                
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-[#f5f7f9] hover:bg-[#e8f2f7] transition-colors">
                      <div className="w-10 h-10 bg-[#337ab9] flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-[#ffffff]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[#003f69]">{activity.tipo}</p>
                          <p className="text-[#868c94] text-xs">{activity.fecha}</p>
                        </div>
                        <p className="text-[#868c94] text-sm mb-1">{activity.descripcion}</p>
                        <p className="text-[#337ab9] text-xs">Por: {activity.usuario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}