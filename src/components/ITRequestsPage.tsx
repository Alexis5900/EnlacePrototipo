import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText,
  Plus,
  Search, 
  Edit, 
  Trash2,
  LogOut,
  Eye,
  AlertCircle,
  Table,
  LayoutGrid,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle2,
  Calendar,
  User,
  List
} from "lucide-react";
import { ITRequestDetail } from "./ITRequestDetail";
import { ITRequestForm } from "./ITRequestForm";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from "recharts";

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

interface ITRequestsPageProps {
  onLogout: () => void;
  onNavigateToUsers: () => void;
  menuType?: "horizontal" | "vertical";
  onToggleMenuType?: () => void;
}

export function ITRequestsPage({ 
  onLogout, 
  onNavigateToUsers,
  menuType = "horizontal",
  onToggleMenuType
}: ITRequestsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "list" | "listview" | "dashboard">("list");
  const [selectedRequest, setSelectedRequest] = useState<ITRequest | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Safe wrapper for toggle menu
  const handleToggleMenu = () => {
    if (onToggleMenuType) {
      onToggleMenuType();
    }
  };

  // Mock data
  const [requests] = useState<ITRequest[]>([
    {
      id: 1,
      nroSolicitud: "REQ-2024-4587",
      titulo: "Implementación de módulo de validación de datos en sistema de gestión",
      fechaInicio: "15/10/24",
      fechaTermino: "//",
      estado: "GESTION CONFIGURACION",
      fechaEstado: "24/10/24",
      nombreUsuario: "Catalina Rojas Pinto",
      desarrollador: "Felipe González Miranda",
      tipoSolicitud: "CORRECCION DE PROGRAMA",
      area: "INFORMATICA",
      pasoA: "PRODUCCION",
      ambiente: "Ninguno",
      prioridad: "Alta"
    },
    {
      id: 2,
      nroSolicitud: "REQ-2024-3291",
      titulo: "Ajustes en módulo de reportería ejecutiva y dashboard analítico",
      fechaInicio: "27/03/24",
      fechaTermino: "15/04/24",
      estado: "TERMINADO",
      fechaEstado: "15/04/24",
      nombreUsuario: "Javiera Muñoz Bravo",
      desarrollador: "Matías Silva Contreras",
      tipoSolicitud: "CORRECCION DE PROGRAMA",
      area: "INFORMATICA",
      pasoA: "CERTIFICACION",
      ambiente: "CORPORATIVO",
      prioridad: "Media"
    },
    {
      id: 3,
      nroSolicitud: "REQ-2024-3845",
      titulo: "Desarrollo de nuevo dashboard comercial para área de ventas",
      fechaInicio: "05/05/24",
      fechaTermino: "//",
      estado: "EN DESARROLLO",
      fechaEstado: "10/05/24",
      nombreUsuario: "Ignacio Torres Espinoza",
      desarrollador: "Camila Fernández Lagos",
      tipoSolicitud: "NUEVO DESARROLLO",
      area: "INFORMATICA",
      pasoA: "DESARROLLO",
      ambiente: "DESARROLLO",
      prioridad: "Alta"
    },
    {
      id: 4,
      nroSolicitud: "REQ-2024-4123",
      titulo: "Corrección de errores en módulo de procesamiento de siniestros",
      fechaInicio: "12/06/24",
      fechaTermino: "20/06/24",
      estado: "TERMINADO",
      fechaEstado: "20/06/24",
      nombreUsuario: "Antonia Castro Reyes",
      desarrollador: "Diego Vargas Parra",
      tipoSolicitud: "CORRECCION DE PROGRAMA",
      area: "INFORMATICA",
      pasoA: "PRODUCCION",
      ambiente: "CORPORATIVO",
      prioridad: "Baja"
    },
    {
      id: 5,
      nroSolicitud: "REQ-2024-4678",
      titulo: "Integración con servicio externo para validación automática de documentos",
      fechaInicio: "18/07/24",
      fechaTermino: "//",
      estado: "EN DESARROLLO",
      fechaEstado: "25/07/24",
      nombreUsuario: "Lucas Pérez Morales",
      desarrollador: "Sofía Ramírez Díaz",
      tipoSolicitud: "NUEVO DESARROLLO",
      area: "INFORMATICA",
      pasoA: "DESARROLLO",
      ambiente: "DESARROLLO",
      prioridad: "Alta"
    },
    {
      id: 6,
      nroSolicitud: "REQ-2024-4892",
      titulo: "Optimización de rendimiento en consultas de base de datos principal",
      fechaInicio: "02/08/24",
      fechaTermino: "10/08/24",
      estado: "CERTIFICACION",
      fechaEstado: "10/08/24",
      nombreUsuario: "Emilia Sánchez Vera",
      desarrollador: "Maximiliano Ortiz Navarro",
      tipoSolicitud: "MEJORA DE PERFORMANCE",
      area: "INFORMATICA",
      pasoA: "CERTIFICACION",
      ambiente: "CERTIFICACION",
      prioridad: "Media"
    }
  ]);

  // Calculate KPIs
  const totalSolicitudes = requests.length;
  const enDesarrollo = requests.filter(r => r.estado === "EN DESARROLLO").length;
  const terminadas = requests.filter(r => r.estado === "TERMINADO").length;
  const altaPrioridad = requests.filter(r => r.prioridad === "Alta").length;

  const filteredRequests = requests.filter(request =>
    request.nroSolicitud.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.desarrollador.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Prepare chart data - Solicitudes por Estado
  const estadoData = requests.reduce((acc, req) => {
    acc[req.estado] = (acc[req.estado] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const estadoChartData = Object.entries(estadoData)
    .map(([estado, cantidad]) => ({ estado, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad);

  // Prepare chart data - Distribución por Prioridad
  const prioridadDistribution = requests.reduce((acc, req) => {
    acc[req.prioridad] = (acc[req.prioridad] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const prioridadPieData = Object.entries(prioridadDistribution).map(([name, value]) => {
    const total = requests.length;
    const percentage = ((value / total) * 100).toFixed(1);
    return { name: `${name}: ${percentage}%`, value, percentage: parseFloat(percentage) };
  });

  const COLORS = ['#003f69', '#285e8e', '#337ab9', '#c9b07a'];

  const handleViewDetail = (request: ITRequest) => {
    setSelectedRequest(request);
  };

  const handleDeleteRequest = (id: number) => {
    if (confirm("¿Está seguro que desea eliminar esta solicitud?")) {
      // Logic to delete request
      console.log("Delete request:", id);
    }
  };

  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Get status color
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "TERMINADO":
        return "bg-[#e8f5e9] text-[#4caf50]";
      case "EN DESARROLLO":
        return "bg-[#e3f2fd] text-[#2196f3]";
      case "CERTIFICACION":
        return "bg-[#fff8e1] text-[#f57c00]";
      case "GESTION CONFIGURACION":
        return "bg-[#e8f2f7] text-[#337ab9]";
      default:
        return "bg-[#f5f5f5] text-[#757575]";
    }
  };

  if (selectedRequest) {
    return (
      <ITRequestDetail 
        request={selectedRequest} 
        onBack={() => setSelectedRequest(null)}
        onEdit={(request) => {
          // Handle edit action
          console.log("Edit request:", request);
        }}
        onDelete={(id) => {
          handleDeleteRequest(id);
          setSelectedRequest(null);
        }}
        onLogout={onLogout}
        onNavigateToUsers={onNavigateToUsers}
        menuType={menuType}
        onToggleMenuType={onToggleMenuType}
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#f5f7f9]">
      {/* Navigation - Conditional based on menu type */}
      {menuType === "vertical" && (
        <AppSidebar
          onLogout={onLogout}
          onNavigateToUsers={onNavigateToUsers}
          onNavigateToITRequests={() => {}}
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
            onNavigateToITRequests={() => {}}
            currentSection="it-requests"
            onToggleMenu={handleToggleMenu}
          />
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-full">
            {/* Page Header with Icon */}
            <div className="mb-4">
              <div className="flex items-start gap-3 flex-wrap">
                {/* Icon */}
                <div className="w-10 h-10 bg-[#337ab9] flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5 text-[#ffffff]" strokeWidth={2} />
                </div>
                
                {/* Title & Subtitle */}
                <div className="flex-1 min-w-[200px]">
                  <h1 className="text-[#1a2332] text-xl tracking-wide mb-0.5">
                    Solicitudes Informáticas
                  </h1>
                  <p className="text-[#6b7280] text-sm tracking-wide">
                    Gestiona las solicitudes de desarrollo y soporte técnico
                  </p>
                </div>

                {/* Add Button */}
                <Button
                  className="h-9 bg-[#337ab9] hover:bg-[#285e8e] text-[#ffffff] transition-all duration-300 tracking-wide text-sm group px-5 shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-2" strokeWidth={2.5} />
                  Nueva Solicitud
                </Button>
              </div>
            </div>

            {/* KPI Cards - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 mb-4 sm:mb-3">
              {/* Total Solicitudes */}
              <div className="bg-[#ffffff] border-l-4 border-[#337ab9] shadow-sm p-3 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-xs tracking-wide mb-1">Total Solicitudes</p>
                    <p className="text-[#003f69] text-2xl">{totalSolicitudes}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#e8f2f7] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* En Desarrollo */}
              <div className="bg-[#ffffff] border-l-4 border-[#2196f3] shadow-sm p-3 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-xs tracking-wide mb-1">En Desarrollo</p>
                    <p className="text-[#003f69] text-2xl">{enDesarrollo}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#e3f2fd] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#2196f3]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Terminadas */}
              <div className="bg-[#ffffff] border-l-4 border-[#4caf50] shadow-sm p-3 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-xs tracking-wide mb-1">Terminadas</p>
                    <p className="text-[#003f69] text-2xl">{terminadas}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#e8f5e9] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#4caf50]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Alta Prioridad */}
              <div className="bg-[#ffffff] border-l-4 border-[#ff4444] shadow-sm p-3 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-xs tracking-wide mb-1">Alta Prioridad</p>
                    <p className="text-[#003f69] text-2xl">{altaPrioridad}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#ffebee] flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-[#ff4444]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters & View Toggle - Responsive */}
            <div className="bg-[#ffffff] border border-[#e8ebee] shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
                {/* Search and filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-1">
                  {/* Search */}
                  <div className="flex-1 w-full sm:max-w-md">
                    <div className="relative group">
                      <Search 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] group-focus-within:text-[#337ab9] transition-colors duration-300" 
                        strokeWidth={1.5}
                      />
                      <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-9 pl-10 pr-4 bg-[#f9fafb] border-[#e8ebee] text-[#1a2332] placeholder:text-[#9ca3af] focus:border-[#337ab9] focus:bg-[#ffffff] transition-all duration-300 text-sm"
                        placeholder="Buscar por número, título, usuario o desarrollador..."
                      />
                    </div>
                  </div>

                  {/* Filter dropdowns - Hidden on mobile */}
                  <select className="hidden sm:block h-9 px-3 bg-[#f9fafb] border border-[#e8ebee] text-[#1a2332] text-sm hover:border-[#337ab9] transition-all duration-300 focus:bg-[#ffffff] focus:border-[#337ab9]">
                    <option>Todos los Estados</option>
                    <option>En Desarrollo</option>
                    <option>Terminado</option>
                    <option>Certificación</option>
                  </select>

                  <select className="hidden sm:block h-9 px-3 bg-[#f9fafb] border border-[#e8ebee] text-[#1a2332] text-sm hover:border-[#337ab9] transition-all duration-300 focus:bg-[#ffffff] focus:border-[#337ab9]">
                    <option>Todas las Prioridades</option>
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>

                  {/* Filters button */}
                  <Button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-9 bg-[#f9fafb] hover:bg-[#e8ebee] text-[#1a2332] border border-[#e8ebee] transition-all duration-300 text-sm px-3 sm:px-4 w-full sm:w-auto justify-center"
                  >
                    <Filter className="w-4 h-4 sm:mr-2" strokeWidth={1.5} />
                    <span className="hidden sm:inline">Filtros Avanzados</span>
                    <span className="sm:hidden">Filtros</span>
                  </Button>
                </div>

                {/* View toggles and export */}
                <div className="flex items-center gap-2 w-full lg:w-auto">
                  {/* View mode toggles */}
                  <div className="flex items-center border border-[#e8ebee] overflow-hidden shadow-sm flex-1 lg:flex-initial">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`h-9 px-2 sm:px-3 flex-1 lg:flex-initial transition-all duration-300 ${
                        viewMode === "list"
                          ? "bg-[#337ab9] text-[#ffffff]"
                          : "bg-[#ffffff] text-[#6b7280] hover:bg-[#f9fafb]"
                      }`}
                      title="Vista grilla"
                    >
                      <Table className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => setViewMode("cards")}
                      className={`h-9 px-2 sm:px-3 flex-1 lg:flex-initial border-l border-[#e8ebee] transition-all duration-300 ${
                        viewMode === "cards"
                          ? "bg-[#337ab9] text-[#ffffff]"
                          : "bg-[#ffffff] text-[#6b7280] hover:bg-[#f9fafb]"
                      }`}
                      title="Vista de tarjetas"
                    >
                      <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => setViewMode("listview")}
                      className={`h-9 px-2 sm:px-3 flex-1 lg:flex-initial border-l border-[#e8ebee] transition-all duration-300 ${
                        viewMode === "listview"
                          ? "bg-[#337ab9] text-[#ffffff]"
                          : "bg-[#ffffff] text-[#6b7280] hover:bg-[#f9fafb]"
                      }`}
                      title="Vista lista"
                    >
                      <List className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => setViewMode("dashboard")}
                      className={`h-9 px-2 sm:px-3 flex-1 lg:flex-initial border-l border-[#e8ebee] transition-all duration-300 ${
                        viewMode === "dashboard"
                          ? "bg-[#337ab9] text-[#ffffff]"
                          : "bg-[#ffffff] text-[#6b7280] hover:bg-[#f9fafb]"
                      }`}
                      title="Vista dashboard"
                    >
                      <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Export button - Icon only on mobile */}
                  <Button className="h-9 bg-[#ffffff] hover:bg-[#f9fafb] text-[#1a2332] border border-[#e8ebee] hover:border-[#337ab9] transition-all duration-300 text-sm px-3 sm:px-4 shadow-sm flex-shrink-0">
                    <Download className="w-4 h-4 sm:mr-2" strokeWidth={1.5} />
                    <span className="hidden sm:inline">Exportar</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4">
              <p className="text-[#6b7280] text-sm tracking-wide">
                Mostrando <span className="text-[#1a2332]">{filteredRequests.length}</span> de <span className="text-[#1a2332]">{requests.length}</span> solicitudes
              </p>
            </div>

            {/* DASHBOARD VIEW - Responsive: 1 col mobile, 2 cols desktop */}
            {viewMode === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Solicitudes por Estado Chart */}
                <div className="bg-[#ffffff] border border-[#e8ebee] shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                    <h3 className="text-[#1a2332]">Solicitudes por Estado</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={estadoChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8ebee" />
                      <XAxis 
                        dataKey="estado" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fill: '#1a2332', fontSize: 11 }}
                      />
                      <YAxis tick={{ fill: '#1a2332', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e8ebee',
                          borderRadius: '4px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Bar dataKey="cantidad" fill="#337ab9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Distribución por Prioridad Pie Chart */}
                <div className="bg-[#ffffff] border border-[#e8ebee] shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <PieChart className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                    <h3 className="text-[#1a2332]">Distribución por Prioridad</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={prioridadPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percentage }) => `${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {prioridadPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e8ebee',
                          borderRadius: '4px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '12px' }}
                        iconType="circle"
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* CARDS VIEW - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="bg-[#ffffff] border border-[#e8ebee] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    {/* Header - Simple y profesional */}
                    <div className="h-14 bg-[#337ab9] relative">
                      {/* Status badge */}
                      <div className="absolute top-2.5 left-3">
                        <span className={`text-xs tracking-wide px-2 py-0.5 shadow-sm ${
                          request.estado === "TERMINADO" ? "bg-[#4caf50] text-[#ffffff]" :
                          request.estado === "EN DESARROLLO" ? "bg-[#2196f3] text-[#ffffff]" :
                          request.estado === "CERTIFICACION" ? "bg-[#ff9800] text-[#ffffff]" :
                          "bg-[#868c94] text-[#ffffff]"
                        }`}>
                          {request.estado}
                        </span>
                      </div>
                      
                      {/* Priority badge */}
                      <div className="absolute top-2.5 right-3">
                        <span className={`text-xs tracking-wide px-2 py-0.5 shadow-sm ${
                          request.prioridad === "Alta" ? "bg-[#ff4444] text-[#ffffff]" :
                          request.prioridad === "Media" ? "bg-[#ffc107] text-[#1a2332]" :
                          "bg-[#4caf50] text-[#ffffff]"
                        }`}>
                          {request.prioridad}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* Solicitud Number */}
                      <div className="mb-2 pb-2 border-b border-[#e8ebee]">
                        <p className="text-[#9ca3af] text-xs tracking-wide mb-0.5">N° Solicitud</p>
                        <p className="text-[#1a2332] text-sm">{request.nroSolicitud}</p>
                      </div>

                      {/* Title */}
                      <h3 className="text-[#1a2332] text-sm mb-3 line-clamp-2 min-h-[2.5rem]">{request.titulo}</h3>

                      {/* Info */}
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-start gap-2 text-xs">
                          <User className="w-3.5 h-3.5 text-[#6b7280] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[#9ca3af] text-xs">Solicitante</p>
                            <p className="text-[#1a2332] text-xs truncate">{request.nombreUsuario}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <User className="w-3.5 h-3.5 text-[#6b7280] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[#9ca3af] text-xs">Desarrollador</p>
                            <p className="text-[#1a2332] text-xs truncate">{request.desarrollador}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-[#6b7280] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[#9ca3af] text-xs">Fecha Inicio</p>
                            <p className="text-[#1a2332] text-xs">{request.fechaInicio}</p>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-[#e8ebee] mb-3" />

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-[#f9fafb] border border-[#e8ebee] p-2">
                          <p className="text-[#9ca3af] text-xs tracking-wide mb-0.5">Tipo</p>
                          <p className="text-[#1a2332] text-xs truncate">{request.tipoSolicitud}</p>
                        </div>
                        <div className="bg-[#f9fafb] border border-[#e8ebee] p-2">
                          <p className="text-[#9ca3af] text-xs tracking-wide mb-0.5">Ambiente</p>
                          <p className="text-[#1a2332] text-xs">{request.pasoA}</p>
                        </div>
                      </div>

                      {/* Action button */}
                      <button
                        onClick={() => handleViewDetail(request)}
                        className="w-full h-8 bg-[#337ab9] text-[#ffffff] hover:bg-[#285e8e] transition-all duration-300 text-xs tracking-wide flex items-center justify-center gap-2 mt-auto"
                      >
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* GRID VIEW (TABLE) */}
            {viewMode === "list" && (
              <div className="bg-[#ffffff] border border-[#e8ebee] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px]">
                    <thead className="bg-[#f8fafb] border-b-2 border-[#337ab9]">
                      <tr>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[120px] min-w-[120px]">Acciones</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm w-[130px] min-w-[130px]">N° Solicitud</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm min-w-[250px]">Título</th>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[160px] min-w-[160px]">Estado</th>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[100px] min-w-[100px]">Prioridad</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm min-w-[180px]">Solicitante</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm min-w-[180px]">Desarrollador</th>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[110px] min-w-[110px]">Fecha Inicio</th>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[120px] min-w-[120px]">Fecha Término</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request, index) => (
                        <tr 
                          key={request.id} 
                          className={`border-b border-[#e8ebee] hover:bg-[#f8fafb] transition-colors cursor-pointer ${
                            index % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#fafbfc]'
                          }`}
                          onClick={() => handleViewDetail(request)}
                        >
                          <td className="py-3 px-4 text-center w-[120px] min-w-[120px]">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetail(request);
                                }}
                                className="w-8 h-8 border border-[#e8ebee] hover:border-[#337ab9] hover:bg-[#e8f2f7] text-[#6b7280] hover:text-[#337ab9] transition-all duration-300 flex items-center justify-center"
                                title="Ver detalle"
                              >
                                <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="w-8 h-8 border border-[#e8ebee] hover:border-[#337ab9] hover:bg-[#e8f2f7] text-[#6b7280] hover:text-[#337ab9] transition-all duration-300 flex items-center justify-center"
                                title="Editar"
                              >
                                <Edit className="w-3.5 h-3.5" strokeWidth={1.5} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteRequest(request.id);
                                }}
                                className="w-8 h-8 border border-[#e8ebee] hover:border-[#ff4444] hover:bg-[#ffebee] text-[#6b7280] hover:text-[#ff4444] transition-all duration-300 flex items-center justify-center"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#1a2332] text-sm w-[130px] min-w-[130px]">{request.nroSolicitud}</td>
                          <td className="py-3 px-4 text-[#1a2332] text-sm min-w-[250px]" title={request.titulo}>
                            {request.titulo}
                          </td>
                          <td className="py-3 px-4 text-center w-[160px] min-w-[160px]">
                            <span className={`inline-block px-3 py-1 text-xs whitespace-nowrap ${getEstadoColor(request.estado)}`}>
                              {request.estado}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center w-[100px] min-w-[100px]">
                            <span className={`inline-block px-3 py-1 text-xs whitespace-nowrap ${
                              request.prioridad === "Alta" ? "bg-[#ffebee] text-[#ff4444]" :
                              request.prioridad === "Media" ? "bg-[#fff8e1] text-[#f57c00]" :
                              "bg-[#e8f5e9] text-[#4caf50]"
                            }`}>
                              {request.prioridad}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#6b7280] text-sm min-w-[180px]">{request.nombreUsuario}</td>
                          <td className="py-3 px-4 text-[#6b7280] text-sm min-w-[180px]">{request.desarrollador}</td>
                          <td className="py-3 px-4 text-center text-[#6b7280] text-sm w-[110px] min-w-[110px]">{request.fechaInicio}</td>
                          <td className="py-3 px-4 text-center text-[#6b7280] text-sm w-[120px] min-w-[120px]">{request.fechaTermino}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Footer */}
                <div className="px-6 py-4 bg-[#f8fafb] border-t border-[#e8ebee]">
                  <p className="text-[#6b7280] text-sm">
                    Mostrando {filteredRequests.length} de {requests.length} registros
                  </p>
                </div>
              </div>
            )}

            {/* LIST VIEW */}
            {viewMode === "listview" && (
              <div className="space-y-2">
                {filteredRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="bg-[#ffffff] border border-[#e8ebee] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => handleViewDetail(request)}
                  >
                    <div className="p-3">
                      <div className="flex items-center gap-3">
                        {/* Actions - Primero a la izquierda */}
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetail(request);
                            }}
                            className="h-7 px-2.5 border border-[#e8ebee] text-[#6b7280] hover:border-[#337ab9] hover:bg-[#e8f2f7] hover:text-[#337ab9] transition-all duration-300 flex items-center justify-center gap-1 text-xs"
                            title="Ver Detalle"
                          >
                            <Eye className="w-3 h-3" strokeWidth={1.5} />
                            Ver
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="h-7 px-2.5 border border-[#e8ebee] text-[#6b7280] hover:border-[#337ab9] hover:bg-[#e8f2f7] hover:text-[#337ab9] transition-all duration-300 flex items-center justify-center gap-1 text-xs"
                            title="Editar"
                          >
                            <Edit className="w-3 h-3" strokeWidth={1.5} />
                            Editar
                          </button>
                        </div>

                        {/* Icon */}
                        <div className="w-12 h-12 bg-[#e8f2f7] border border-[#337ab9] flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1.5">
                            <div className="flex-1 min-w-0 mr-3">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <p className="text-[#9ca3af] text-xs">N° {request.nroSolicitud}</p>
                                <span className={`text-xs tracking-wide px-2 py-0.5 ${
                                  request.prioridad === "Alta" ? "bg-[#ffebee] text-[#ff4444]" :
                                  request.prioridad === "Media" ? "bg-[#fff8e1] text-[#f57c00]" :
                                  "bg-[#e8f5e9] text-[#4caf50]"
                                }`}>
                                  {request.prioridad}
                                </span>
                              </div>
                              <h3 className="text-[#1a2332] text-sm mb-0.5 line-clamp-1">{request.titulo}</h3>
                              <p className="text-[#6b7280] text-xs">{request.tipoSolicitud}</p>
                            </div>
                            
                            {/* Status Badge */}
                            <span className={`text-xs tracking-wide px-2.5 py-0.5 flex-shrink-0 ${getEstadoColor(request.estado)}`}>
                              {request.estado}
                            </span>
                          </div>

                          {/* Contact & Location Info */}
                          <div className="grid grid-cols-3 gap-3 text-xs">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <User className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <div className="min-w-0">
                                <p className="text-[#9ca3af] text-xs">Solicitante</p>
                                <p className="text-[#1a2332] text-xs truncate">{request.nombreUsuario}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 min-w-0">
                              <User className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <div className="min-w-0">
                                <p className="text-[#9ca3af] text-xs">Desarrollador</p>
                                <p className="text-[#1a2332] text-xs truncate">{request.desarrollador}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 min-w-0">
                              <Calendar className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <div className="min-w-0">
                                <p className="text-[#9ca3af] text-xs">Ambiente</p>
                                <p className="text-[#1a2332] text-xs">{request.pasoA}</p>
                              </div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="grid grid-cols-3 gap-3 mt-1.5 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-[#6b7280]">Inicio: {request.fechaInicio}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-[#6b7280]">Término: {request.fechaTermino}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FileText className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-[#6b7280]">Área: {request.area}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}