import React, { useState } from 'react';
import { Menu, X, Search, Heart, Calendar, Settings, Share2, Plus, Clock, Users, ChefHat, TrendingUp, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('inicio');
  const [favorites, setFavorites] = useState([]);

  const recetas = [
    {
      id: 1,
      titulo: 'Paella Valenciana',
      autor: 'Carmen García',
      tiempo: '45 min',
      personas: 4,
      imagen: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&h=600&fit=crop',
      dificultad: 'Media',
      likes: 234
    },
    {
      id: 2,
      titulo: 'Tacos al Pastor',
      autor: 'Luis Rodríguez',
      tiempo: '30 min',
      personas: 6,
      imagen: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
      dificultad: 'Fácil',
      likes: 189
    },
    {
      id: 3,
      titulo: 'Risotto de Hongos',
      autor: 'Sofia Martínez',
      tiempo: '35 min',
      personas: 3,
      imagen: 'https://images.unsplash.com/photo-1476124369491-c84d1a2155f7?w=800&h=600&fit=crop',
      dificultad: 'Media',
      likes: 156
    },
    {
      id: 4,
      titulo: 'Ceviche Peruano',
      autor: 'Pedro Sánchez',
      tiempo: '20 min',
      personas: 4,
      imagen: 'https://images.unsplash.com/photo-1619871936845-b45b3ee3f6b4?w=800&h=600&fit=crop',
      dificultad: 'Fácil',
      likes: 201
    },
    {
      id: 5,
      titulo: 'Lasaña Boloñesa',
      autor: 'María López',
      tiempo: '60 min',
      personas: 8,
      imagen: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
      dificultad: 'Difícil',
      likes: 312
    },
    {
      id: 6,
      titulo: 'Sushi Variado',
      autor: 'Hiroshi Tanaka',
      tiempo: '50 min',
      personas: 2,
      imagen: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
      dificultad: 'Difícil',
      likes: 278
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: ChefHat },
    { id: 'administrar', label: 'Administrar Recetas', icon: Plus },
    { id: 'compartir', label: 'Compartir Recetas', icon: Share2 },
    { id: 'favoritos', label: 'Mis Favoritos', icon: Heart },
    { id: 'buscar', label: 'Buscar y Descubrir', icon: Search },
    { id: 'planificacion', label: 'Planificación Semanal', icon: Calendar },
    { id: 'gestion', label: 'Gestión Global', icon: Settings },
    { id: 'moderacion', label: 'Moderación', icon: Shield },
  ];

  const renderContent = () => {
    switch(selectedSection) {
      case 'favoritos':
        const favRecetas = recetas.filter(r => favorites.includes(r.id));
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Mis Favoritos ❤️</h2>
            {favRecetas.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No tienes favoritos aún. ¡Empieza a guardar tus recetas preferidas!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favRecetas.map(receta => renderRecetaCard(receta))}
              </div>
            )}
          </div>
        );
      case 'administrar':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Administrar Recetas</h2>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-teal-500/20">
              <p className="text-gray-300 mb-4">Crea, edita y organiza tus recetas personales</p>
              <button className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all">
                + Nueva Receta
              </button>
            </div>
          </div>
        );
      case 'buscar':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Buscar y Descubrir</h2>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/20">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar por ingredientes, nombre, autor..."
                  className="w-full bg-gray-900/50 text-white pl-12 pr-4 py-4 rounded-xl border border-teal-500/30 focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );
      case 'planificacion':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Planificación Semanal</h2>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-teal-500/20">
              <p className="text-gray-300">Organiza tus menús semanales de forma inteligente</p>
            </div>
          </div>
        );
      case 'moderacion':
        const reportesPendientes = [
          { id: 1, receta: 'Tarta de Chocolate', autor: 'Ana María', motivo: 'Contenido inapropiado', fecha: '08/12/2024', gravedad: 'Media' },
          { id: 2, receta: 'Pizza Casera', autor: 'José Luis', motivo: 'Plagio de receta', fecha: '07/12/2024', gravedad: 'Alta' },
          { id: 3, receta: 'Ensalada César', autor: 'Laura Gómez', motivo: 'Información incorrecta', fecha: '07/12/2024', gravedad: 'Baja' },
        ];

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-teal-400" />
                Panel de Moderación
              </h2>
              <div className="flex gap-3">
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-2">
                  <span className="text-red-400 font-semibold">3 Pendientes</span>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Reportes Totales</p>
                    <p className="text-3xl font-bold text-white mt-1">24</p>
                  </div>
                  <AlertTriangle className="w-10 h-10 text-teal-400" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Aprobadas</p>
                    <p className="text-3xl font-bold text-white mt-1">18</p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Rechazadas</p>
                    <p className="text-3xl font-bold text-white mt-1">3</p>
                  </div>
                  <XCircle className="w-10 h-10 text-red-400" />
                </div>
              </div>
            </div>

            {/* Lista de Reportes Pendientes */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-teal-500/20 overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <h3 className="text-xl font-bold text-white">Reportes Pendientes de Revisión</h3>
              </div>
              <div className="divide-y divide-gray-700/50">
                {reportesPendientes.map(reporte => (
                  <div key={reporte.id} className="p-6 hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-semibold text-white">{reporte.receta}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            reporte.gravedad === 'Alta' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            reporte.gravedad === 'Media' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {reporte.gravedad}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          <span className="text-gray-500">Autor:</span> {reporte.autor}
                        </p>
                        <p className="text-gray-400 text-sm">
                          <span className="text-gray-500">Motivo:</span> {reporte.motivo}
                        </p>
                        <p className="text-gray-500 text-xs">{reporte.fecha}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Aprobar
                        </button>
                        <button className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Rechazar
                        </button>
                        <button className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600/30 text-gray-300 px-4 py-2 rounded-xl font-semibold transition-all">
                          Ver Detalle
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtros y Acciones Rápidas */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
              <div className="flex flex-wrap gap-3">
                <button className="bg-gray-700/50 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl font-semibold transition-all">
                  Ver Usuarios Reportados
                </button>
                <button className="bg-gray-700/50 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl font-semibold transition-all">
                  Historial de Moderación
                </button>
                <button className="bg-gray-700/50 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl font-semibold transition-all">
                  Configurar Filtros
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Recetas Populares</h2>
              <button className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
                <TrendingUp className="w-5 h-5" />
                Ver todas
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recetas.map(receta => renderRecetaCard(receta))}
            </div>
          </div>
        );
    }
  };

  const renderRecetaCard = (receta) => (
    <div key={receta.id} className="group bg-gray-800/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
      <div className="relative overflow-hidden h-48">
        <img 
          src={receta.imagen} 
          alt={receta.titulo}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <button 
          onClick={() => toggleFavorite(receta.id)}
          className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/70 transition-all"
        >
          <Heart 
            className={`w-5 h-5 ${favorites.includes(receta.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
          />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm">
          <span className="bg-teal-500/80 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
            {receta.dificultad}
          </span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
          {receta.titulo}
        </h3>
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <ChefHat className="w-4 h-4" />
          {receta.autor}
        </p>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {receta.tiempo}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {receta.personas} pers.
          </span>
          <span className="flex items-center gap-1 text-teal-400">
            <Heart className="w-4 h-4" />
            {receta.likes}
          </span>
        </div>
        <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all">
          Ver Receta
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg border-b border-teal-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M30,60 Q30,40 50,40 Q70,40 70,60 L70,70 Q70,80 50,80 Q30,80 30,70 Z" 
                      fill="none" stroke="#14b8a6" strokeWidth="3"/>
                <circle cx="45" cy="50" r="3" fill="#14b8a6"/>
                <circle cx="55" cy="50" r="3" fill="#14b8a6"/>
                <circle cx="50" cy="55" r="3" fill="#14b8a6"/>
                <path d="M40,30 Q50,20 60,30" fill="none" stroke="#14b8a6" strokeWidth="3"/>
                <rect x="45" y="65" width="10" height="8" fill="#14b8a6"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">YantaConSeso</h1>
              <p className="text-xs text-teal-400">Recetas inteligentes para ua vida deliciosa</p>
            </div>
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-teal-400 transition-colors p-2"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Menú Lateral Desplegable */}
      <div className={`fixed inset-y-0 left-0 w-80 bg-gray-900/95 backdrop-blur-xl border-r border-teal-500/20 transform transition-transform duration-300 z-40 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 space-y-2 mt-20">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedSection(item.id);
                setMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                selectedSection === item.id 
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30' 
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-teal-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-teal-500/20 mt-20 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2024 YantaConSeso - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
