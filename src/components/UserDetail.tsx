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
  AlertCircle
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

interface UserDetailProps {
  user: User;
  onBack: () => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onLogout: () => void;
  onNavigateToITRequests: () => void;
  menuType?: "horizontal" | "vertical";
  onToggleMenuType?: () => void;
}

interface TicketData {
  id: number;
  titulo: string;
  tipo: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: "Abierto" | "En Proceso" | "Cerrado";
  fechaCreacion: string;
  fechaCierre?: string;
}

interface ActivityData {
  id: number;
  tipo: string;
  descripcion: string;
  fecha: string;
  usuario: string;
}

export function UserDetail({ user, onBack, onEdit, onDelete, onLogout, onNavigateToITRequests, menuType = "horizontal", onToggleMenuType }: UserDetailProps) {
  const [activeTab, setActiveTab] = useState<"info" | "tickets" | "activity" | "stats">("info");

  // Safe wrapper for toggle menu
  const handleToggleMenu = () => {
    if (onToggleMenuType) {
      onToggleMenuType();
    }
  };

  // Mock data for tickets
  const tickets: TicketData[] = [
    {
      id: 1,
      titulo: "Instalación de suite ofimática en equipo nuevo",
      tipo: "Software",
      prioridad: "Media",
      estado: "Cerrado",
      fechaCreacion: "15/10/2024",
      fechaCierre: "18/10/2024"
    },
    {
      id: 2,
      titulo: "Fallo en equipo multifunción departamental",
      tipo: "Hardware",
      prioridad: "Alta",
      estado: "Abierto",
      fechaCreacion: "20/10/2024"
    },
    {
      id: 3,
      titulo: "Solicitud de permisos para carpeta de red compartida",
      tipo: "Accesos",
      prioridad: "Baja",
      estado: "En Proceso",
      fechaCreacion: "22/10/2024"
    }
  ];

  // Mock data for activity
  const activities: ActivityData[] = [
    {
      id: 1,
      tipo: "Ticket Creado",
      descripcion: "Se creó el ticket #2: Fallo en equipo multifunción departamental",
      fecha: "20/10/2024 14:30",
      usuario: user.nombre
    },
    {
      id: 2,
      tipo: "Ticket Cerrado",
      descripcion: "Se cerró el ticket #1: Instalación de suite ofimática en equipo nuevo",
      fecha: "18/10/2024 16:45",
      usuario: "Equipo Soporte TI"
    },
    {
      id: 3,
      tipo: "Perfil Actualizado",
      descripcion: "Se actualizó el número de teléfono corporativo",
      fecha: "15/10/2024 09:20",
      usuario: "Admin User"
    },
    {
      id: 4,
      tipo: "Usuario Registrado",
      descripcion: "Usuario registrado exitosamente en el sistema",
      fecha: "01/01/2024 10:00",
      usuario: "Sistema"
    }
  ];

  // Calculate KPIs
  const totalTickets = tickets.length;
  const ticketsCerrados = tickets.filter(t => t.estado === "Cerrado").length;
  const ticketsPendientes = tickets.filter(t => t.estado !== "Cerrado").length;
  const ticketsAlta = tickets.filter(t => t.prioridad === "Alta").length;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleDelete = () => {
    if (confirm("¿Está seguro que desea eliminar este usuario?")) {
      onDelete(user.id);
      onBack();
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f7f9]">
      {/* Navigation - Conditional based on menu type */}
      {menuType === "vertical" && (
        <AppSidebar
          onLogout={onLogout}
          onNavigateToUsers={onBack}
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
            onNavigateToUsers={onBack}
            onNavigateToITRequests={onNavigateToITRequests}
            currentSection="users"
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
            <span className="text-sm hidden sm:inline">Volver a Administración de Usuarios</span>
            <span className="text-sm sm:hidden">Volver</span>
          </button>
        </div>

        {/* Scrollable content */}
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
                  <span className="text-[#285e8e] text-3xl sm:text-4xl">{getInitials(user.nombre)}</span>
                </div>

                {/* Info */}
                <div className="text-[#ffffff] flex-1">
                  <h1 className="text-2xl sm:text-3xl mb-2">{user.nombre}</h1>
                  <p className="text-[#ffffff]/80 mb-4">{user.perfil} • {user.empresa}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Documento: {user.rut}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Ingreso: {user.fechaIngreso}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">{user.telefono}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">Departamento: {user.departamento}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#ffffff]/60" strokeWidth={1.5} />
                      <span className="text-[#ffffff]/90">{user.ubicacion}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className={`px-3 py-1 text-xs ${
                      user.estado === "Activo"
                        ? "bg-[#337ab9] text-[#ffffff]"
                        : "bg-[#868c94] text-[#ffffff]"
                    }`}>
                      {user.estado}
                    </span>
                    <span className="px-3 py-1 bg-[#ffffff]/10 text-[#ffffff] text-xs">
                      {user.ticketsAsignados} Tickets Asignados
                    </span>
                    <span className="px-3 py-1 bg-[#ffffff]/10 text-[#ffffff] text-xs">
                      {user.departamento}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons - Stack horizontally on mobile, vertically on desktop */}
              <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto flex-wrap lg:flex-nowrap">
                <Button
                  onClick={() => onEdit(user)}
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
                  <span className="hidden sm:inline">Nuevo Ticket</span>
                  <span className="sm:hidden">Ticket</span>
                </Button>
                <Button
                  className="h-10 bg-[#ffffff] hover:bg-[#f5f7f9] text-[#285e8e] transition-all duration-300 text-sm px-4 justify-center lg:justify-start flex-1 lg:flex-initial"
                >
                  <FileText className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Historial
                </Button>
                <Button
                  className="h-10 bg-[#ffffff] hover:bg-[#f5f7f9] text-[#285e8e] transition-all duration-300 text-sm px-4 justify-center lg:justify-start flex-1 lg:flex-initial"
                >
                  <Calendar className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Accesos
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Cards - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Total Tickets */}
            <div className="bg-[#ffffff] border border-[#e8ebee] p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#e8f2f7] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                </div>
                <Activity className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
              </div>
              <p className="text-3xl text-[#003f69] mb-1">{user.ticketsAsignados}</p>
              <p className="text-[#868c94] text-sm">Tickets Asignados</p>
            </div>

            {/* Tickets Cerrados */}
            <div className="bg-[#ffffff] border border-[#e8ebee] p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#e8f5e8] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#4caf50]" strokeWidth={1.5} />
                </div>
                <Activity className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
              </div>
              <p className="text-3xl text-[#4caf50] mb-1">{ticketsCerrados}</p>
              <p className="text-[#868c94] text-sm">Tickets Cerrados</p>
            </div>

            {/* Tickets Pendientes */}
            <div className="bg-[#ffffff] border-2 border-[#ffc107] p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#fff8e1] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#ffc107]" strokeWidth={1.5} />
                </div>
                <AlertCircle className="w-5 h-5 text-[#ffc107]" strokeWidth={1.5} />
              </div>
              <p className="text-3xl text-[#ffc107] mb-1">{ticketsPendientes}</p>
              <p className="text-[#868c94] text-sm">Tickets Pendientes</p>
            </div>

            {/* Tickets Alta Prioridad */}
            <div className="bg-[#ffffff] border border-[#e8ebee] p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#ffe8e8] flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#ff4444]" strokeWidth={1.5} />
                </div>
                <FileText className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
              </div>
              <p className="text-3xl text-[#003f69] mb-1">{ticketsAlta}</p>
              <p className="text-[#868c94] text-sm">Alta Prioridad</p>
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
              onClick={() => setActiveTab("tickets")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === "tickets"
                  ? "bg-[#ffffff] text-[#003f69]"
                  : "bg-transparent text-[#ffffff] hover:bg-[#337ab9]"
              }`}
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              Tickets
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
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === "stats"
                  ? "bg-[#ffffff] text-[#003f69]"
                  : "bg-transparent text-[#ffffff] hover:bg-[#337ab9]"
              }`}
            >
              <Activity className="w-4 h-4" strokeWidth={1.5} />
              Estadísticas
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-[#ffffff] border border-[#e8ebee] border-t-0 p-4 sm:p-6">
            {/* INFO TAB - Responsive: 1 col mobile, 2 cols desktop */}
            {activeTab === "info" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Información de Cuenta */}
                <div className="space-y-4">
                  <h3 className="text-[#003f69] flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                    Información de Cuenta
                  </h3>
                  
                  <div className="bg-[#e8f2f7] p-4 space-y-3">
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Perfil de Acceso</p>
                      <p className="text-[#003f69]">{user.perfil}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Estado de Cuenta</p>
                      <p className={`${user.estado === "Activo" ? "text-[#4caf50]" : "text-[#868c94]"}`}>
                        {user.estado}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Fecha de Ingreso</p>
                      <p className="text-[#003f69]">{user.fechaIngreso}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Empresa</p>
                      <p className="text-[#003f69]">{user.empresa}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Departamento</p>
                      <p className="text-[#003f69]">{user.departamento}</p>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="space-y-4">
                  <h3 className="text-[#003f69] flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                    Información de Contacto
                  </h3>
                  
                  <div className="bg-[#e8f2f7] p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#337ab9] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#ffffff]">{getInitials(user.nombre)}</span>
                      </div>
                      <div>
                        <p className="text-[#003f69]">{user.nombre}</p>
                        <p className="text-[#868c94] text-sm">{user.rut}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Email Corporativo</p>
                      <p className="text-[#003f69]">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Teléfono</p>
                      <p className="text-[#003f69]">{user.telefono}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] text-xs mb-1">Ubicación</p>
                      <p className="text-[#003f69]">{user.ubicacion}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TICKETS TAB - Responsive table */}
            {activeTab === "tickets" && (
              <div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-[#003f69]">Historial de Tickets</h3>
                  <Button className="h-9 bg-[#337ab9] hover:bg-[#285e8e] text-[#ffffff] text-sm px-4 w-full sm:w-auto justify-center">
                    <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Nuevo Ticket
                  </Button>
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[640px]">
                    <thead className="bg-[#e8f2f7] border-b-2 border-[#337ab9]">
                      <tr>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">ID</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Título</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Tipo</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Prioridad</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Estado</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Fecha Creación</th>
                        <th className="text-left py-3 px-4 text-[#003f69] text-sm">Fecha Cierre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.id} className="border-b border-[#e8ebee] hover:bg-[#f5f7f9] transition-colors">
                          <td className="py-3 px-4 text-[#003f69] text-sm">#{ticket.id}</td>
                          <td className="py-3 px-4 text-[#003f69] text-sm">{ticket.titulo}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-[#e8f2f7] text-[#337ab9] text-xs">
                              {ticket.tipo}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs ${
                              ticket.prioridad === "Alta" ? "bg-[#ffebee] text-[#ff4444]" :
                              ticket.prioridad === "Media" ? "bg-[#fff8e1] text-[#ffc107]" :
                              "bg-[#e8f5e8] text-[#4caf50]"
                            }`}>
                              {ticket.prioridad}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs ${
                              ticket.estado === "Cerrado" ? "bg-[#e8f5e8] text-[#4caf50]" :
                              ticket.estado === "En Proceso" ? "bg-[#fff8e1] text-[#ffc107]" :
                              "bg-[#e3f2fd] text-[#2196f3]"
                            }`}>
                              {ticket.estado}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#868c94] text-sm">{ticket.fechaCreacion}</td>
                          <td className="py-3 px-4 text-[#868c94] text-sm">{ticket.fechaCierre || "-"}</td>
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

            {/* STATS TAB - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
            {activeTab === "stats" && (
              <div>
                <h3 className="text-[#003f69] mb-4">Estadísticas del Usuario</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div className="bg-[#e8f2f7] p-6 text-center">
                    <FileText className="w-8 h-8 text-[#337ab9] mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-3xl text-[#003f69] mb-2">{user.ticketsAsignados}</p>
                    <p className="text-[#868c94] text-sm">Total de Tickets</p>
                  </div>
                  <div className="bg-[#e8f5e8] p-6 text-center">
                    <CheckCircle2 className="w-8 h-8 text-[#4caf50] mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-3xl text-[#4caf50] mb-2">{ticketsCerrados}</p>
                    <p className="text-[#868c94] text-sm">Tickets Resueltos</p>
                  </div>
                  <div className="bg-[#fff8e1] p-6 text-center">
                    <Clock className="w-8 h-8 text-[#ffc107] mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-3xl text-[#ffc107] mb-2">{ticketsPendientes}</p>
                    <p className="text-[#868c94] text-sm">Tickets Pendientes</p>
                  </div>
                </div>

                <div className="mt-6 p-4 sm:p-6 bg-[#f5f7f9]">
                  <h4 className="text-[#003f69] mb-4">Información Adicional</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#868c94] mb-1">Fecha de Ingreso</p>
                      <p className="text-[#003f69]">{user.fechaIngreso}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] mb-1">Estado de Cuenta</p>
                      <p className={`${user.estado === "Activo" ? "text-[#4caf50]" : "text-[#868c94]"}`}>
                        {user.estado}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#868c94] mb-1">Perfil de Acceso</p>
                      <p className="text-[#003f69]">{user.perfil}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] mb-1">Departamento</p>
                      <p className="text-[#003f69]">{user.departamento}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] mb-1">Ubicación</p>
                      <p className="text-[#003f69]">{user.ubicacion}</p>
                    </div>
                    <div>
                      <p className="text-[#868c94] mb-1">Tickets Asignados</p>
                      <p className="text-[#003f69]">{user.ticketsAsignados}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}