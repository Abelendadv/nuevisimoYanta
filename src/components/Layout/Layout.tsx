import React, { useState } from 'react';
import { Menu, X, Search, Heart, Plus, Shield, Home, Calendar, ShoppingCart, Settings } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useRecipes } from '../../context/RecipeContext';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { shoppingList } = useRecipes();
    const { userRole, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { id: 'inicio', label: 'Inicio', icon: Home, path: '/' },
        { id: 'planificador', label: 'Planificador Semanal', icon: Calendar, path: '/planner' },
        { id: 'favoritos', label: 'Mis Favoritos', icon: Heart, path: '/favorites' },
        { id: 'administrar', label: 'Administrar Recetas', icon: Plus, path: '/admin' },
        { id: 'buscar', label: 'Buscar', icon: Search, path: '/search' },
        { id: 'moderacion', label: 'Moderación', icon: Shield, path: '/moderation', adminOnly: true },
        { id: 'gestion', label: 'Gestión Global', icon: Settings, path: '/global', adminOnly: true },
    ];

    const filteredMenu = menuItems.filter(item => !item.adminOnly || userRole === 'admin');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Header */}
            <header className="bg-black/50 backdrop-blur-lg border-b border-teal-500/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="w-12 h-12 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path d="M30,60 Q30,40 50,40 Q70,40 70,60 L70,70 Q70,80 50,80 Q30,80 30,70 Z"
                                    fill="none" stroke="#14b8a6" strokeWidth="3" />
                                <circle cx="45" cy="50" r="3" fill="#14b8a6" />
                                <circle cx="55" cy="50" r="3" fill="#14b8a6" />
                                <circle cx="50" cy="55" r="3" fill="#14b8a6" />
                                <path d="M40,30 Q50,20 60,30" fill="none" stroke="#14b8a6" strokeWidth="3" />
                                <rect x="45" y="65" width="10" height="8" fill="#14b8a6" />
                            </svg>
                        </Link>
                        <div>
                            <Link to="/">
                                <h1 className="text-2xl font-bold text-white">YantaConSeso</h1>
                                <p className="text-xs text-teal-400">Recetas inteligentes para una vida deliciosa</p>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/shopping-list" className="relative group">
                            <div className="p-2 rounded-full bg-gray-800/50 hover:bg-teal-500/20 text-gray-300 hover:text-teal-400 transition-all border border-transparent hover:border-teal-500/30">
                                <ShoppingCart className="w-6 h-6" />
                                {shoppingList.filter((i) => !i.checked).length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg shadow-teal-500/50">
                                        {shoppingList.filter((i) => !i.checked).length}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-white hover:text-teal-400 transition-colors p-2"
                        >
                            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex max-w-7xl mx-auto">
                {/* Sidebar (Desktop) */}
                <aside className="hidden md:block w-64 sticky top-24 h-[calc(100vh-6rem)] pr-6">
                    <nav className="space-y-2">
                        {filteredMenu.map(item => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30'
                                    : 'text-white hover:bg-gray-800/50 hover:text-teal-400'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-semibold">{item.label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-gray-300 hover:bg-red-500/10 hover:text-red-400 mt-8"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-semibold">Cerrar Sesión</span>
                        </button>
                    </nav>
                </aside>

                {/* Mobile Sidebar */}
                <div className={`fixed inset-y-0 left-0 w-80 max-w-[80vw] bg-gray-900/95 backdrop-blur-xl border-r border-teal-500/20 transform transition-transform duration-300 z-40 md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6 space-y-2 mt-20">
                        {filteredMenu.map(item => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30'
                                    : 'text-white hover:bg-gray-800/50 hover:text-teal-400'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-semibold">{item.label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={() => { setMenuOpen(false); handleLogout(); }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-gray-300 hover:bg-red-500/10 hover:text-red-400 mt-4 border-t border-gray-800 pt-4"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-semibold">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Overlay */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setMenuOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 py-6 px-4 md:py-8 md:px-6 lg:px-8">
                    {children}
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-black/30 backdrop-blur-lg border-t border-teal-500/20 mt-20 py-6">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
                    <p>© 2024 YantaConSeso - Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
