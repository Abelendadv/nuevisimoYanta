import { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { ShoppingCart, Trash2, Check, Pencil, X, Save, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShoppingList = () => {
    const { shoppingList, toggleShoppingItem, clearShoppingList, updateShoppingItem, addToShoppingList, removeCheckedShoppingItems } = useRecipes();
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ nombre: '', cantidad: '' });
    const [newItem, setNewItem] = useState({ nombre: '', cantidad: '' });
    const [showAdd, setShowAdd] = useState(false);

    interface ShoppingItem {
        nombre: string;
        cantidad: string;
        checked: boolean;
    }

    const startEditing = (index: number, item: ShoppingItem) => {
        setEditingIndex(index);
        setEditForm({ nombre: item.nombre, cantidad: item.cantidad });
    };

    const saveEdit = (index: number) => {
        const original = shoppingList[index];
        updateShoppingItem(index, { ...original, nombre: editForm.nombre, cantidad: editForm.cantidad });
        setEditingIndex(null);
    };

    const handleAddNew = () => {
        if (newItem.nombre.trim()) {
            addToShoppingList([{ ...newItem, cantidad: newItem.cantidad || '1' }]);
            setNewItem({ nombre: '', cantidad: '' });
            setShowAdd(false);
        }
    };

    if (shoppingList.length === 0 && !showAdd) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
                <div className="bg-gray-800/50 p-6 rounded-full mb-6">
                    <ShoppingCart className="w-12 h-12 text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Tu lista está vacía</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                    Genera un plan semanal, añade ingredientes desde las recetas o pulsa para añadir manualmente.
                </p>
                <div className="flex gap-4">
                    <Link to="/planner" className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                        Ir al Planificador
                    </Link>
                    <button onClick={() => setShowAdd(true)} className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                        Añadir Manualmente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-fade-in pb-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <ShoppingCart className="text-teal-400" /> Lista de la Compra
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowAdd(!showAdd)}
                        className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors px-4 py-2 rounded-lg hover:bg-teal-500/10"
                    >
                        <Plus className="w-5 h-5" /> Añadir
                    </button>
                    {shoppingList.some(item => item.checked) && (
                        <button
                            onClick={() => {
                                if (window.confirm('¿Borrar elementos marcados?')) removeCheckedShoppingItems();
                            }}
                            className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors px-4 py-2 rounded-lg hover:bg-orange-500/10"
                        >
                            <Trash2 className="w-5 h-5" /> Borrar marcados
                        </button>
                    )}
                    {shoppingList.length > 0 && (
                        <button
                            onClick={() => {
                                if (window.confirm('¿Borrar toda la lista?')) clearShoppingList();
                            }}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10"
                        >
                            <Trash2 className="w-5 h-5" /> Vaciar
                        </button>
                    )}
                </div>
            </div>

            {showAdd && (
                <div className="bg-gray-800/50 p-4 rounded-xl mb-4 flex gap-2 animate-fade-in">
                    <input
                        placeholder="Nombre (ej: Manzanas)"
                        value={newItem.nombre}
                        onChange={e => setNewItem({ ...newItem, nombre: e.target.value })}
                        className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 text-white focus:border-teal-500"
                    />
                    <input
                        placeholder="Cant."
                        value={newItem.cantidad}
                        onChange={e => setNewItem({ ...newItem, cantidad: e.target.value })}
                        className="w-24 bg-gray-900 border border-gray-700 rounded-lg px-3 text-white focus:border-teal-500"
                    />
                    <button onClick={handleAddNew} className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600">
                        <Check className="w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                {shoppingList.map((item, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center justify-between p-4 border-b border-gray-700 last:border-0 transition-colors ${item.checked ? 'bg-gray-900/50' : ''}`}
                    >
                        {editingIndex === idx ? (
                            <div className="flex-1 flex gap-2 items-center">
                                <input
                                    className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white"
                                    value={editForm.nombre}
                                    onChange={e => setEditForm({ ...editForm, nombre: e.target.value })}
                                />
                                <input
                                    className="w-20 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white"
                                    value={editForm.cantidad}
                                    onChange={e => setEditForm({ ...editForm, cantidad: e.target.value })}
                                />
                                <button onClick={() => saveEdit(idx)} className="text-green-400 p-1 hover:bg-green-500/20 rounded">
                                    <Save className="w-5 h-5" />
                                </button>
                                <button onClick={() => setEditingIndex(null)} className="text-red-400 p-1 hover:bg-red-500/20 rounded">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleShoppingItem(idx)}>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${item.checked ? 'bg-teal-500 border-teal-500' : 'border-gray-500'}`}>
                                        {item.checked && <Check className="w-4 h-4 text-white" />}
                                    </div>
                                    <div>
                                        <p className={`font-medium text-lg ${item.checked ? 'text-gray-500 line-through' : 'text-white'}`}>
                                            {item.nombre}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`font-mono text-sm px-3 py-1 rounded-full ${item.checked ? 'bg-gray-800 text-gray-600' : 'bg-teal-500/10 text-teal-400'}`}>
                                        {item.cantidad}
                                    </span>
                                    <button
                                        onClick={() => startEditing(idx, item)}
                                        className="text-gray-500 hover:text-teal-400 p-2 hover:bg-teal-500/10 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoppingList;
