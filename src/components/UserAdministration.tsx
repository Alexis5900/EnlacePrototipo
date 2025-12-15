import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  User, 
  Mail, 
  Phone,
  LogOut,
  Table,
  LayoutGrid,
  Filter,
  Download,
  MapPin,
  Briefcase,
  Calendar,
  BarChart3,
  PieChart,
  FileText,
  Users,
  UserCheck,
  UserX,
  List,
  Eye
} from "lucide-react";
import { UserForm } from "./UserForm";
import { UserDetail } from "./UserDetail";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from "recharts";

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

interface UserAdministrationProps {
  onLogout: () => void;
  onNavigateToITRequests: () => void;
  menuType?: "horizontal" | "vertical";
  onToggleMenuType?: () => void;
}

export function UserAdministration({ 
  onLogout, 
  onNavigateToITRequests,
  menuType = "horizontal",
  onToggleMenuType
}: UserAdministrationProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "cards" | "listview" | "dashboard">("list");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Safe wrapper for toggle menu
  const handleToggleMenu = () => {
    if (onToggleMenuType) {
      onToggleMenuType();
    }
  };

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      rut: "18745623-9",
      nombre: "Martina Valenzuela Ortiz",
      email: "mvalenzuela@empresademo.cl",
      telefono: "+56 2 2456 7890",
      empresa: "CHUBB Seguros",
      perfil: "Administrador",
      estado: "Activo",
      ubicacion: "Oficina Principal, Santiago",
      departamento: "Tecnología",
      ticketsAsignados: 12,
      fechaIngreso: "Ene 2024"
    },
    {
      id: 2,
      rut: "17892345-K",
      nombre: "Sebastián Ramírez Flores",
      email: "sramirez@empresademo.cl",
      telefono: "+56 2 2567 8901",
      empresa: "CHUBB Seguros",
      perfil: "Usuario",
      estado: "Activo",
      ubicacion: "Oficina Principal, Santiago",
      departamento: "Operaciones",
      ticketsAsignados: 8,
      fechaIngreso: "Mar 2024"
    },
    {
      id: 3,
      rut: "19234567-1",
      nombre: "Valentina Cortés Medina",
      email: "vcortes@empresademo.cl",
      telefono: "+56 2 2678 9012",
      empresa: "CHUBB Seguros",
      perfil: "Usuario",
      estado: "Activo",
      ubicacion: "Sucursal Concepción",
      departamento: "Siniestros",
      ticketsAsignados: 15,
      fechaIngreso: "Sep 2024"
    },
    {
      id: 4,
      rut: "16543210-7",
      nombre: "Benjamín Soto Vargas",
      email: "bsoto@empresademo.cl",
      telefono: "+56 2 2789 0123",
      empresa: "CHUBB Seguros",
      perfil: "Supervisor",
      estado: "Activo",
      ubicacion: "Oficina Principal, Santiago",
      departamento: "Soporte Técnico",
      ticketsAsignados: 20,
      fechaIngreso: "Feb 2024"
    },
    {
      id: 5,
      rut: "15678901-2",
      nombre: "Isidora Núñez Pizarro",
      email: "inunez@empresademo.cl",
      telefono: "+56 2 2890 1234",
      empresa: "CHUBB Seguros",
      perfil: "Usuario",
      estado: "Inactivo",
      ubicacion: "Sucursal Valparaíso",
      departamento: "Ventas",
      ticketsAsignados: 3,
      fechaIngreso: "Dic 2023"
    },
    {
      id: 6,
      rut: "20123456-8",
      nombre: "Tomás Fuentes Contreras",
      email: "tfuentes@empresademo.cl",
      telefono: "+56 2 2901 2345",
      empresa: "CHUBB Seguros",
      perfil: "Usuario",
      estado: "Activo",
      ubicacion: "Sucursal Viña del Mar",
      departamento: "Atención al Cliente",
      ticketsAsignados: 11,
      fechaIngreso: "Abr 2024"
    }
  ]);

  // Calculate KPIs
  const totalUsuarios = users.length;
  const usuariosActivos = users.filter(u => u.estado === "Activo").length;
  const usuariosInactivos = users.filter(u => u.estado === "Inactivo").length;
  const totalTickets = users.reduce((sum, u) => sum + u.ticketsAsignados, 0);

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.rut.includes(searchTerm) ||
    user.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Prepare chart data - Users by Department
  const departmentData = users.reduce((acc, user) => {
    acc[user.departamento] = (acc[user.departamento] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = Object.entries(departmentData)
    .map(([departamento, cantidad]) => ({ departamento, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad);

  // Prepare chart data - Distribution by Profile
  const profileDistribution = users.reduce((acc, user) => {
    acc[user.perfil] = (acc[user.perfil] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const profilePieData = Object.entries(profileDistribution).map(([name, value]) => {
    const total = users.length;
    const percentage = ((value / total) * 100).toFixed(1);
    return { name: `${name}: ${percentage}%`, value, percentage: parseFloat(percentage) };
  });

  const COLORS = ['#003f69', '#285e8e', '#337ab9', '#c9b07a'];

  const handleDeleteUser = (id: number) => {
    if (confirm("¿Está seguro que desea eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveUser = (user: User) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === user.id ? user : u));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setShowForm(false);
  };

  const handleViewDetail = (user: User) => {
    setSelectedUser(user);
  };

  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (showForm) {
    return (
      <UserForm
        user={editingUser}
        onSave={handleSaveUser}
        onCancel={() => {
          setShowForm(false);
          setEditingUser(null);
        }}
        onLogout={onLogout}
        onNavigateToITRequests={onNavigateToITRequests}
        menuType={menuType}
        onToggleMenuType={onToggleMenuType}
      />
    );
  }

  if (selectedUser) {
    return (
      <UserDetail 
        user={selectedUser} 
        onBack={() => setSelectedUser(null)}
        onEdit={(user) => {
          setEditingUser(user);
          setSelectedUser(null);
          setShowForm(true);
        }}
        onDelete={(id) => {
          handleDeleteUser(id);
          setSelectedUser(null);
        }}
        onLogout={onLogout}
        onNavigateToITRequests={onNavigateToITRequests}
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
          onNavigateToUsers={() => {}}
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
            onNavigateToUsers={() => {}}
            onNavigateToITRequests={onNavigateToITRequests}
            currentSection="users"
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
                  <Shield className="w-5 h-5 text-[#ffffff]" strokeWidth={2} />
                </div>
                
                {/* Title & Subtitle */}
                <div className="flex-1 min-w-[200px]">
                  <h1 className="text-[#1a2332] text-xl tracking-wide mb-0.5">
                    Administración de Usuarios
                  </h1>
                  <p className="text-[#6b7280] text-sm tracking-wide">
                    Gestiona usuarios, roles y permisos del sistema
                  </p>
                </div>

                {/* Add Button */}
                <Button
                  onClick={() => {
                    setEditingUser(null);
                    setShowForm(true);
                  }}
                  className="h-9 bg-[#337ab9] hover:bg-[#285e8e] text-[#ffffff] transition-all duration-300 tracking-wide text-sm group px-5 shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-2" strokeWidth={2.5} />
                  Nuevo Usuario
                </Button>
              </div>
            </div>

            {/* KPI Cards - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 mb-4 sm:mb-3">
              {/* Total Usuarios */}
              <div className="bg-[#ffffff] border-l-4 border-[#337ab9] shadow-sm p-3 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-xs tracking-wide mb-1">Total Usuarios</p>
                    <p className="text-[#003f69] text-2xl">{totalUsuarios}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#e8f2f7] flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Usuarios Activos */}
              <div className="bg-[#ffffff] border-l-4 border-[#4caf50] shadow-sm p-3 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-xs tracking-wide mb-1">Usuarios Activos</p>
                    <p className="text-[#003f69] text-2xl">{usuariosActivos}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#e8f5e9] flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-[#4caf50]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Usuarios Inactivos */}
              <div className="bg-[#ffffff] border-l-4 border-[#ff9800] shadow-sm p-3 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-xs tracking-wide mb-1">Usuarios Inactivos</p>
                    <p className="text-[#003f69] text-2xl">{usuariosInactivos}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#fff3e0] flex items-center justify-center">
                    <UserX className="w-5 h-5 text-[#ff9800]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Total Tickets */}
              <div className="bg-[#ffffff] border-l-4 border-[#c9b07a] shadow-sm p-3 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-xs tracking-wide mb-1">Tickets Asignados</p>
                    <p className="text-[#003f69] text-2xl">{totalTickets}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#f9f6f0] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#c9b07a]" strokeWidth={1.5} />
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
                        placeholder="Buscar por nombre, email, RUT o departamento..."
                      />
                    </div>
                  </div>

                  {/* Filter dropdowns - Hidden on mobile */}
                  <select className="hidden sm:block h-9 px-3 bg-[#f9fafb] border border-[#e8ebee] text-[#1a2332] text-sm hover:border-[#337ab9] transition-all duration-300 focus:bg-[#ffffff] focus:border-[#337ab9]">
                    <option>Todos los Estados</option>
                    <option>Activo</option>
                    <option>Inactivo</option>
                  </select>

                  <select className="hidden sm:block h-9 px-3 bg-[#f9fafb] border border-[#e8ebee] text-[#1a2332] text-sm hover:border-[#337ab9] transition-all duration-300 focus:bg-[#ffffff] focus:border-[#337ab9]">
                    <option>Todos los Perfiles</option>
                    <option>Administrador</option>
                    <option>Supervisor</option>
                    <option>Usuario</option>
                  </select>

                  {/* Filters button */}
                  <Button 
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
                Mostrando <span className="text-[#1a2332]">{filteredUsers.length}</span> de <span className="text-[#1a2332]">{users.length}</span> usuarios
              </p>
            </div>

            {/* DASHBOARD VIEW - Responsive: 1 col mobile, 2 cols desktop */}
            {viewMode === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Users by Department Chart */}
                <div className="bg-[#ffffff] border border-[#e8ebee] shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                    <h3 className="text-[#1a2332]">Usuarios por Departamento</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8ebee" />
                      <XAxis 
                        dataKey="departamento" 
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

                {/* Distribution by Profile Pie Chart */}
                <div className="bg-[#ffffff] border border-[#e8ebee] shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <PieChart className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                    <h3 className="text-[#1a2332]">Distribución por Perfil</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={profilePieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percentage }) => `${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {profilePieData.map((entry, index) => (
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
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-[#ffffff] border border-[#e8ebee] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    {/* Header - Simple y profesional */}
                    <div className="h-16 bg-[#337ab9] relative">
                      {/* Status badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs tracking-wide px-2 py-0.5 shadow-sm ${
                          user.estado === "Activo" 
                            ? "bg-[#4caf50] text-[#ffffff]" 
                            : "bg-[#ff9800] text-[#ffffff]"
                        }`}>
                          {user.estado}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* Avatar y User Info - Layout horizontal */}
                      <div className="flex items-start gap-3 mb-3 pb-3 border-b border-[#e8ebee]">
                        {/* Avatar */}
                        <div className="w-14 h-14 bg-[#e8f2f7] border border-[#337ab9] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#337ab9] text-sm">{getInitials(user.nombre)}</span>
                        </div>
                        
                        {/* Nombre y Perfil */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#1a2332] mb-0.5 text-sm leading-tight">{user.nombre}</h3>
                          <p className="text-[#337ab9] text-xs tracking-wide">{user.perfil}</p>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3.5 h-3.5 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[#6b7280] truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="w-3.5 h-3.5 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[#6b7280]">{user.telefono}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[#6b7280] truncate">{user.ubicacion}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Briefcase className="w-3.5 h-3.5 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[#6b7280]">{user.departamento}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-[#e8ebee] mb-3" />

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-[#f9fafb] border border-[#e8ebee] p-2">
                          <p className="text-[#9ca3af] text-xs tracking-wide mb-0.5">Tickets</p>
                          <p className="text-[#1a2332] text-sm">{user.ticketsAsignados}</p>
                        </div>
                        <div className="bg-[#f9fafb] border border-[#e8ebee] p-2">
                          <p className="text-[#9ca3af] text-xs tracking-wide mb-0.5">Ingreso</p>
                          <p className="text-[#1a2332] text-xs">{user.fechaIngreso}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => handleViewDetail(user)}
                          className="flex-1 h-8 bg-[#337ab9] text-[#ffffff] hover:bg-[#285e8e] transition-all duration-300 text-xs tracking-wide"
                        >
                          Ver Detalle
                        </button>
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowForm(true);
                          }}
                          className="h-8 px-2.5 border border-[#e8ebee] text-[#6b7280] hover:border-[#337ab9] hover:bg-[#f9fafb] hover:text-[#337ab9] transition-all duration-300"
                          title="Editar"
                        >
                          <Edit className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="h-8 px-2.5 border border-[#e8ebee] text-[#6b7280] hover:border-[#ff4444] hover:bg-[#ffebee] hover:text-[#ff4444] transition-all duration-300"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* GRID VIEW (TABLE) */}
            {viewMode === "list" && (
              <div className="bg-[#ffffff] border border-[#e8ebee] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px]">
                    <thead className="bg-[#f8fafb] border-b-2 border-[#337ab9]">
                      <tr>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[120px] min-w-[120px]">Acciones</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm min-w-[180px]">Nombre</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm w-[130px] min-w-[130px]">RUT</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm min-w-[200px]">Email</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm w-[130px] min-w-[130px]">Teléfono</th>
                        <th className="text-left py-3 px-4 text-[#1a2332] text-sm w-[150px] min-w-[150px]">Departamento</th>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[140px] min-w-[140px]">Perfil</th>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[100px] min-w-[100px]">Estado</th>
                        <th className="text-center py-3 px-4 text-[#1a2332] text-sm w-[80px] min-w-[80px]">Tickets</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr 
                          key={user.id} 
                          className={`border-b border-[#e8ebee] hover:bg-[#f8fafb] transition-colors cursor-pointer ${
                            index % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#fafbfc]'
                          }`}
                          onClick={() => handleViewDetail(user)}
                        >
                          <td className="py-3 px-4 text-center w-[120px] min-w-[120px]">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetail(user);
                                }}
                                className="w-8 h-8 border border-[#e8ebee] hover:border-[#337ab9] hover:bg-[#e8f2f7] text-[#6b7280] hover:text-[#337ab9] transition-all duration-300 flex items-center justify-center"
                                title="Ver detalle"
                              >
                                <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingUser(user);
                                  setShowForm(true);
                                }}
                                className="w-8 h-8 border border-[#e8ebee] hover:border-[#337ab9] hover:bg-[#e8f2f7] text-[#6b7280] hover:text-[#337ab9] transition-all duration-300 flex items-center justify-center"
                                title="Editar"
                              >
                                <Edit className="w-3.5 h-3.5" strokeWidth={1.5} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteUser(user.id);
                                }}
                                className="w-8 h-8 border border-[#e8ebee] hover:border-[#ff4444] hover:bg-[#ffebee] text-[#6b7280] hover:text-[#ff4444] transition-all duration-300 flex items-center justify-center"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#1a2332] text-sm min-w-[180px]">{user.nombre}</td>
                          <td className="py-3 px-4 text-[#6b7280] text-sm w-[130px] min-w-[130px]">{user.rut}</td>
                          <td className="py-3 px-4 text-[#6b7280] text-sm min-w-[200px]">{user.email}</td>
                          <td className="py-3 px-4 text-[#6b7280] text-sm w-[130px] min-w-[130px]">{user.telefono}</td>
                          <td className="py-3 px-4 text-[#6b7280] text-sm w-[150px] min-w-[150px]">{user.departamento}</td>
                          <td className="py-3 px-4 text-center w-[140px] min-w-[140px]">
                            <span className="inline-block px-3 py-1 bg-[#e8f2f7] text-[#337ab9] text-xs whitespace-nowrap">
                              {user.perfil}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center w-[100px] min-w-[100px]">
                            <span className={`inline-block px-3 py-1 text-xs whitespace-nowrap ${
                              user.estado === "Activo" 
                                ? "bg-[#e8f5e9] text-[#4caf50]" 
                                : "bg-[#fff3e0] text-[#ff9800]"
                            }`}>
                              {user.estado}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-[#1a2332] text-sm w-[80px] min-w-[80px]">{user.ticketsAsignados}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Footer */}
                <div className="px-6 py-4 bg-[#f8fafb] border-t border-[#e8ebee]">
                  <p className="text-[#6b7280] text-sm">
                    Mostrando {filteredUsers.length} de {users.length} registros
                  </p>
                </div>
              </div>
            )}

            {/* LIST VIEW */}
            {viewMode === "listview" && (
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="bg-[#ffffff] border border-[#e8ebee] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => handleViewDetail(user)}
                  >
                    <div className="p-3">
                      <div className="flex items-center gap-3">
                        {/* Actions - Primero a la izquierda */}
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingUser(user);
                              setShowForm(true);
                            }}
                            className="h-7 px-2.5 border border-[#e8ebee] text-[#6b7280] hover:border-[#337ab9] hover:bg-[#e8f2f7] hover:text-[#337ab9] transition-all duration-300 flex items-center justify-center gap-1 text-xs"
                            title="Editar"
                          >
                            <Edit className="w-3 h-3" strokeWidth={1.5} />
                            Editar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteUser(user.id);
                            }}
                            className="h-7 px-2.5 border border-[#e8ebee] text-[#6b7280] hover:border-[#ff4444] hover:bg-[#ffebee] hover:text-[#ff4444] transition-all duration-300 flex items-center justify-center gap-1 text-xs"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                            Eliminar
                          </button>
                        </div>

                        {/* Avatar */}
                        <div className="w-12 h-12 bg-[#e8f2f7] border border-[#337ab9] flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-[#337ab9]" strokeWidth={1.5} />
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1.5">
                            <div className="flex-1 min-w-0 mr-3">
                              <h3 className="text-[#1a2332] text-sm mb-0.5">{user.nombre}</h3>
                              <p className="text-[#6b7280] text-xs">RUT: {user.rut}</p>
                            </div>
                            
                            {/* Status Badge */}
                            <span className={`text-xs tracking-wide px-2.5 py-0.5 flex-shrink-0 ${
                              user.estado === "Activo" 
                                ? "bg-[#e8f5e9] text-[#4caf50]" 
                                : "bg-[#fff3e0] text-[#ff9800]"
                            }`}>
                              {user.estado}
                            </span>
                          </div>

                          {/* Contact & Location Info */}
                          <div className="grid grid-cols-3 gap-3 text-xs">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <Mail className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-[#6b7280] truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 min-w-0">
                              <Phone className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-[#6b7280]">{user.telefono}</span>
                            </div>
                            <div className="flex items-center gap-1.5 min-w-0">
                              <MapPin className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-[#6b7280] truncate">{user.ubicacion}</span>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="grid grid-cols-3 gap-3 mt-1.5 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-[#6b7280]">{user.departamento}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[#9ca3af]">Perfil:</span>
                              <span className="text-[#337ab9]">{user.perfil}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FileText className="w-3 h-3 text-[#6b7280] flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-[#6b7280]">{user.ticketsAsignados} tickets asignados</span>
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