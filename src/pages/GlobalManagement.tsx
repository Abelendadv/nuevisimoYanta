import { useState } from 'react';
import { Users, Settings, FileText, Database, ShieldAlert, Lock, Unlock } from 'lucide-react';

const GlobalManagement = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'config' | 'audit' | 'db'>('users');

    // Mock Data
    const [users, setUsers] = useState([
        { id: 1, name: 'Juan Perez', email: 'juan@example.com', role: 'User', status: 'Active' },
        { id: 2, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
        { id: 3, name: 'Spammer Bot', email: 'bot@spam.com', role: 'User', status: 'Banned' },
    ]);

    const [config, setConfig] = useState({
        maintenanceMode: false,
        allowRegistrations: true,
        maxUploadSize: 5, // MB
        apiUrl: 'https://api.yantaconseso.com/v1',
    });

    const audits = [
        { id: 101, user: 'Admin User', action: 'Update Config', timestamp: '2024-12-09 10:30' },
        { id: 102, user: 'System', action: 'Backup Created', timestamp: '2024-12-09 00:00' },
        { id: 103, user: 'Moderator', action: 'Ban User #3', timestamp: '2024-12-08 15:45' },
    ];

    const toggleUserStatus = (id: number) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u));
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in pb-20 space-y-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Settings className="text-teal-400" /> Gestión Global del Sistema
            </h2>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-1">
                {[
                    { id: 'users', label: 'Usuarios', icon: Users },
                    { id: 'config', label: 'Configuración', icon: Settings },
                    { id: 'audit', label: 'Auditoría', icon: FileText },
                    { id: 'db', label: 'Base de Datos', icon: Database },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-3 font-semibold rounded-t-lg transition-colors ${activeTab === tab.id
                            ? 'bg-gray-800 text-teal-400 border-t border-l border-r border-gray-700'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 min-h-[500px]">

                {/* USERS TAB */}
                {activeTab === 'users' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Administración de Usuarios</h3>
                            <div className="text-sm text-gray-400">Total: {users.length}</div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-gray-300">
                                <thead className="text-xs uppercase bg-gray-900/50 text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Nombre</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Rol</th>
                                        <th className="px-6 py-3">Estado</th>
                                        <th className="px-6 py-3 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-700/30">
                                            <td className="px-6 py-4">{user.id}</td>
                                            <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => toggleUserStatus(user.id)}
                                                    className={`p-2 rounded-lg transition-colors ${user.status === 'Active' ? 'text-red-400 hover:bg-red-500/20' : 'text-green-400 hover:bg-green-500/20'}`}
                                                    title={user.status === 'Active' ? 'Banear' : 'Reactivar'}
                                                >
                                                    {user.status === 'Active' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* CONFIGURATION TAB */}
                {activeTab === 'config' && (
                    <div className="space-y-8 max-w-2xl">
                        <h3 className="text-xl font-bold text-white">Configuración del Sistema</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-gray-700">
                                <div>
                                    <h4 className="font-semibold text-white">Modo Mantenimiento</h4>
                                    <p className="text-sm text-gray-400">Desactiva el acceso público a la aplicación.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={config.maintenanceMode} onChange={() => setConfig({ ...config, maintenanceMode: !config.maintenanceMode })} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-gray-700">
                                <div>
                                    <h4 className="font-semibold text-white">Permitir Registros</h4>
                                    <p className="text-sm text-gray-400">Nuevos usuarios pueden crearse una cuenta.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={config.allowRegistrations} onChange={() => setConfig({ ...config, allowRegistrations: !config.allowRegistrations })} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </label>
                            </div>

                            <div className="p-4 bg-black/20 rounded-xl border border-gray-700 space-y-2">
                                <label className="font-semibold text-white block">API Endpoint URL</label>
                                <input
                                    value={config.apiUrl}
                                    onChange={(e) => setConfig({ ...config, apiUrl: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:border-teal-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="px-6 py-2 bg-teal-500 text-white rounded-lg font-bold hover:bg-teal-600 transition-colors">
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                )}

                {/* AUDIT TAB */}
                {activeTab === 'audit' && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Registro de Auditoría</h3>
                        <div className="space-y-4">
                            {audits.map(log => (
                                <div key={log.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-gray-800">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                                            <ShieldAlert className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{log.action}</p>
                                            <p className="text-sm text-teal-400">{log.user}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 font-mono">
                                        {log.timestamp}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* DB TAB */}
                {activeTab === 'db' && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Explorador de Base de Datos</h3>
                        <div className="bg-black/40 p-4 rounded-xl border border-gray-800 font-mono text-sm text-green-400 h-[400px] overflow-y-auto">
                            <p className="text-gray-500 mb-2">// Connected to production_db_v2 (Read-Only)</p>
                            <pre>
                                {`{
  "users_count": 1420,
  "recipes_count": 583,
  "total_storage": "4.2 GB",
  "collections": [
    "users",
    "recipes",
    "comments",
    "reports",
    "audit_logs"
  ],
  "last_backup": "2024-12-10T00:00:00Z",
  "status": "HEALTHY"
}`}
                            </pre>
                            <div className="mt-4 border-t border-gray-800 pt-4">
                                <p className="text-gray-400 p-2 hover:bg-gray-800 cursor-pointer">{`> select * from users where role = 'admin' limit 5`}</p>
                                <p className="text-gray-400 p-2 hover:bg-gray-800 cursor-pointer">{`> select count(*) from recipes where created_at > NOW() - INTERVAL '7 days'`}</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default GlobalManagement;
