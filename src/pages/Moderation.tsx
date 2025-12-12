import { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, Clock, Ban, Eye, X } from 'lucide-react';

const Moderation = () => {
    const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'reported' | 'banned'>('pending');

    // Mock Data
    const [pendingItems, setPendingItems] = useState([
        { id: 1, type: 'Receta', title: 'Tarta de Queso Extrema', author: 'NewUser123', date: '2024-12-10', content: '...' },
        { id: 2, type: 'Comentario', title: 'Re: Paella', author: 'Anonymous', date: '2024-12-09', content: 'Esto no es paella, es arroz con cosas.' },
    ]);

    const [reportedItems, setReportedItems] = useState([
        { id: 3, type: 'Comentario', title: 'Spam Alert', author: 'BotNet', date: '2024-12-09', reason: 'Spam', reporter: 'Juan Perez' },
    ]);

    const acceptedItems = [
        { id: 101, type: 'Receta', title: 'Gazpacho Andaluz', author: 'ChefMaria', date: '2024-12-08' },
        { id: 102, type: 'Receta', title: 'Tortilla de Patatas', author: 'Luis', date: '2024-12-07' },
    ];

    const bannedUsers = [
        { id: 66, username: 'TrollMaster', reason: 'Hate speech', date: '2024-11-20' },
        { id: 67, username: 'SpamKing', reason: 'Commercial spam', date: '2024-12-01' },
    ];

    const handleAction = (id: number, action: 'approve' | 'reject' | 'ban') => {
        if (activeTab === 'pending') {
            setPendingItems(pendingItems.filter(i => i.id !== id));
        } else if (activeTab === 'reported') {
            setReportedItems(reportedItems.filter(i => i.id !== id));
        }
        // In a real app, this would make an API call
        console.log(`Action ${action} performed on item ${id}`);
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in pb-20 space-y-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Shield className="text-teal-400" /> Centro de Moderación
            </h2>

            {/* Navigation */}
            <div className="flex flex-wrap gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'pending' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                    <Clock className="w-5 h-5" /> Pendientes
                    {pendingItems.length > 0 && <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-xs">{pendingItems.length}</span>}
                </button>
                <button
                    onClick={() => setActiveTab('reported')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'reported' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                    <AlertTriangle className="w-5 h-5" /> Reportados
                    {reportedItems.length > 0 && <span className="bg-white text-red-600 px-2 py-0.5 rounded-full text-xs">{reportedItems.length}</span>}
                </button>
                <button
                    onClick={() => setActiveTab('accepted')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'accepted' ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                    <CheckCircle className="w-5 h-5" /> Aceptados
                </button>
                <button
                    onClick={() => setActiveTab('banned')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'banned' ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                    <Ban className="w-5 h-5" /> Baneados
                </button>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 min-h-[400px]">

                {/* PENDING */}
                {activeTab === 'pending' && (
                    <div className="space-y-4">
                        {pendingItems.length === 0 ? <p className="text-gray-500 text-center py-10">¡Todo limpio! No hay tareas pendientes.</p> :
                            pendingItems.map(item => (
                                <div key={item.id} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs uppercase font-bold">{item.type}</span>
                                            <span className="text-gray-400 text-sm">{item.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-gray-400 text-sm mb-2">Por: <span className="text-teal-400">{item.author}</span></p>
                                        <p className="text-gray-300 italic">"{item.content}"</p>
                                    </div>
                                    <div className="flex md:flex-col gap-2 justify-center">
                                        <button onClick={() => handleAction(item.id, 'approve')} className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/20 flex items-center gap-2 font-semibold">
                                            <CheckCircle className="w-4 h-4" /> Aprobar
                                        </button>
                                        <button onClick={() => handleAction(item.id, 'reject')} className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 flex items-center gap-2 font-semibold">
                                            <X className="w-4 h-4" /> Rechazar
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}

                {/* REPORTED */}
                {activeTab === 'reported' && (
                    <div className="space-y-4">
                        {reportedItems.map(item => (
                            <div key={item.id} className="bg-red-900/10 p-6 rounded-xl border border-red-900/30 flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs uppercase font-bold">Reportado: {item.reason}</span>
                                        <span className="text-gray-400 text-sm">Reportado por: {item.reporter}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">Autor: <span className="text-teal-400">{item.author}</span></p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleAction(item.id, 'ban')} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2 font-semibold shadow-lg shadow-red-500/20">
                                        <Ban className="w-4 h-4" /> Banear Usuario
                                    </button>
                                    <button onClick={() => handleAction(item.id, 'reject')} className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800">
                                        Ignorar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ACCEPTED */}
                {activeTab === 'accepted' && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {acceptedItems.map(item => (
                            <div key={item.id} className="bg-gray-900/30 p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-white">{item.title}</h4>
                                    <p className="text-sm text-gray-500">Aprobado el {item.date} por AutoMod</p>
                                </div>
                                <a href="#" className="text-teal-400 hover:text-teal-300">
                                    <Eye className="w-5 h-5" />
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* BANNED */}
                {activeTab === 'banned' && (
                    <div className="space-y-2">
                        {bannedUsers.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gray-800 text-gray-400">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-900/20 flex items-center justify-center">
                                        <Ban className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{user.username}</p>
                                        <p className="text-xs">Razón: {user.reason}</p>
                                    </div>
                                </div>
                                <div className="text-sm">{user.date}</div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Moderation;
