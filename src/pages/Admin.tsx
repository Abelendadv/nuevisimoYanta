import React, { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { Plus, Trash2, Image, ChefHat, Clock, Users, BarChart, Globe, Lock, Send, X } from 'lucide-react';
import IngredientAutocomplete from '../components/IngredientAutocomplete';


const Admin = () => {
    const { addRecipe, recipes, updateRecipe, deleteRecipe } = useRecipes();

    // Tabs: 'create' | 'list'
    const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Sharing Modal State
    const [sharingModal, setSharingModal] = useState<{ open: boolean; recipe: any | null; type: 'private' | 'community' | 'public' | null }>({
        open: false,
        recipe: null,
        type: null
    });
    const [shareEmail, setShareEmail] = useState('');

    const initialForm = {
        titulo: '',
        autor: '',
        tiempo: '',
        personas: 2,
        imagen: '',
        dificultad: 'Media' as 'Fácil' | 'Media' | 'Difícil'
    };

    const [form, setForm] = useState(initialForm);
    const [ingredients, setIngredients] = useState<{ nombre: string; cantidad: string }[]>([{ nombre: '', cantidad: '' }]);
    const [steps, setSteps] = useState<string[]>(['']);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (index: number, field: 'nombre' | 'cantidad', value: string) => {
        const newIngs = [...ingredients];
        newIngs[index] = { ...newIngs[index], [field]: value };
        setIngredients(newIngs);
    };

    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    const addIngredient = () => setIngredients([...ingredients, { nombre: '', cantidad: '' }]);
    const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));

    const addStep = () => setSteps([...steps, '']);
    const removeStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));

    // Handle Image Upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prev => ({ ...prev, imagen: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const recipeData = {
            ...form,
            personas: Number(form.personas),
            ingredients: ingredients.filter(i => i.nombre.trim() !== ''),
            steps: steps.filter(s => s.trim() !== ''),
            isCustom: true
        };

        if (editingId) {
            // Update existing
            const original = recipes.find(r => r.id === editingId);
            if (original) {
                updateRecipe({
                    ...original,
                    ...recipeData
                });
            }
            setEditingId(null);
        } else {
            // Create new
            addRecipe({
                id: Date.now(),
                likes: 0,
                comments: [],
                ...recipeData
            });
        }

        // Reset and go to home or list
        setForm(initialForm);
        setIngredients([{ nombre: '', cantidad: '' }]);
        setSteps(['']);
        setActiveTab('list');
    };

    const handleEdit = (recipe: any) => {
        setForm({
            titulo: recipe.titulo,
            autor: recipe.autor,
            tiempo: recipe.tiempo,
            personas: recipe.personas,
            imagen: recipe.imagen,
            dificultad: recipe.dificultad
        });
        setIngredients(recipe.ingredients || []);
        setSteps(recipe.steps || []);
        setEditingId(recipe.id);
        setActiveTab('create');
    };

    const openShareModal = (recipe: any, type: 'private' | 'community' | 'public') => {
        setSharingModal({ open: true, recipe, type });
        setShareEmail('');
    };

    const handleShareConfirm = () => {
        if (!sharingModal.recipe || !sharingModal.type) return;

        if (sharingModal.type === 'private') {
            if (!shareEmail.trim()) {
                alert('Por favor introduce un email');
                return;
            }
            // Simulate sending email
            console.log(`Enviando receta ${sharingModal.recipe.titulo} a ${shareEmail}`);
            alert(`Receta enviada a ${shareEmail}`);
        } else {
            // Confirmation for public/community
            alert(`Receta compartida como ${sharingModal.type === 'community' ? 'Comunidad' : 'Pública'}`);
        }

        updateRecipe({ ...sharingModal.recipe, visibility: sharingModal.type });
        setSharingModal({ open: false, recipe: null, type: null });
    };

    const myRecipes = recipes.filter(r => r.isCustom);

    return (<>
        <div className="max-w-4xl mx-auto animate-fade-in space-y-8 pb-20">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Administración de Recetas</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-700 pb-1">
                <button
                    onClick={() => { setActiveTab('create'); setEditingId(null); setForm(initialForm); setIngredients([{ nombre: '', cantidad: '' }]); setSteps(['']); }}
                    className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'create' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-white'}`}
                >
                    {editingId ? 'Editar Receta' : 'Crear Receta'}
                </button>
                <button
                    onClick={() => setActiveTab('list')}
                    className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'list' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Mis Recetas
                </button>
            </div>

            {activeTab === 'create' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/20 space-y-4">
                        <h3 className="text-xl font-semibold text-teal-400 mb-4 border-b border-gray-700 pb-2">Información Básica</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm">Título</label>
                                <div className="relative">
                                    <ChefHat className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <input required name="titulo" value={form.titulo} onChange={handleInputChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-9 pr-4 text-white focus:border-teal-500 focus:outline-none" placeholder="Ej: Paella" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm">Autor</label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <input required name="autor" value={form.autor} onChange={handleInputChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-9 pr-4 text-white focus:border-teal-500 focus:outline-none" placeholder="Tu nombre" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm">Tiempo</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <input required name="tiempo" value={form.tiempo} onChange={handleInputChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-9 pr-4 text-white focus:border-teal-500 focus:outline-none" placeholder="Ej: 45 min" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm">Personas</label>
                                <input required type="number" name="personas" value={form.personas} onChange={handleInputChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-4 text-white focus:border-teal-500 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm">Dificultad</label>
                                <div className="relative">
                                    <BarChart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <select name="dificultad" value={form.dificultad} onChange={handleInputChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-9 pr-4 text-white focus:border-teal-500 focus:outline-none">
                                        <option value="Fácil">Fácil</option>
                                        <option value="Media">Media</option>
                                        <option value="Difícil">Difícil</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-gray-300 text-sm">Imagen de la Receta</label>

                            {/* File Upload */}
                            <div className="relative">
                                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-9 pr-4 text-white focus:border-teal-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500/10 file:text-teal-400 hover:file:bg-teal-500/20"
                                />
                            </div>

                            {/* Default Images Selection */}
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500">O selecciona una de nuestras sugerencias:</p>
                                <div className="grid grid-cols-5 gap-2">
                                    {[
                                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80', // Salad
                                        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80', // Pizza
                                        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80', // Pancakes
                                        'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=80', // Sandwich
                                        'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&q=80'  // Toast
                                    ].map((imgUrl, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, imagen: imgUrl }))}
                                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${form.imagen === imgUrl ? 'border-teal-500 scale-105' : 'border-transparent hover:border-gray-500'}`}
                                        >
                                            <img src={imgUrl} alt={`Default ${i}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {form.imagen && (
                                <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden border border-gray-700">
                                    <img src={form.imagen} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ingredients with Quantities */}
                    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/20 relative z-20">
                        <h3 className="text-xl font-semibold text-teal-400 mb-4 border-b border-gray-700 pb-2">Ingredientes</h3>
                        <div className="space-y-3">
                            <div className="grid grid-cols-12 gap-2 text-sm text-gray-400 mb-1 px-1">
                                <div className="col-span-4">Cantidad</div>
                                <div className="col-span-7">Nombre</div>
                                <div className="col-span-1"></div>
                            </div>
                            {ingredients.map((ing, idx) => (
                                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                                    <div className="col-span-4">
                                        <input
                                            value={ing.cantidad}
                                            onChange={(e) => handleIngredientChange(idx, 'cantidad', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:border-teal-500 focus:outline-none"
                                            placeholder="Ej: 200g"
                                        />
                                    </div>
                                    <div className="col-span-7">
                                        <IngredientAutocomplete
                                            value={ing.nombre}
                                            onChange={(val: string) => handleIngredientChange(idx, 'nombre', val)}
                                            placeholder="Ej: Arroz"
                                        />
                                    </div>
                                    <div className="col-span-1 flex justify-center">
                                        {ingredients.length > 1 && (
                                            <button type="button" onClick={() => removeIngredient(idx)} className="text-red-400 hover:text-red-300 p-2">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addIngredient} className="text-teal-400 hover:text-teal-300 text-sm font-semibold flex items-center gap-1 mt-2">
                                <Plus className="w-4 h-4" /> Añadir Ingrediente
                            </button>
                        </div>
                    </div>

                    {/* Pasos */}
                    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/20 relative z-10">
                        <h3 className="text-xl font-semibold text-teal-400 mb-4 border-b border-gray-700 pb-2">Pasos</h3>
                        <div className="space-y-3">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-sm font-bold text-gray-300">{idx + 1}</span>
                                    <textarea
                                        value={step}
                                        onChange={(e) => handleStepChange(idx, e.target.value)}
                                        className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-4 text-white focus:border-teal-500 focus:outline-none h-20 resize-none"
                                        placeholder={`Describe el paso ${idx + 1}...`}
                                    />
                                    {steps.length > 1 && (
                                        <button type="button" onClick={() => removeStep(idx)} className="text-red-400 hover:text-red-300 p-2 self-start">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addStep} className="text-teal-400 hover:text-teal-300 text-sm font-semibold flex items-center gap-1">
                                <Plus className="w-4 h-4" /> Añadir Paso
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="button" onClick={() => { setActiveTab('list'); setEditingId(null); }} className="px-6 py-2 text-gray-400 hover:text-white mr-4">
                            Cancelar
                        </button>
                        <button type="submit" className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                            {editingId ? 'Guardar Cambios' : 'Publicar Receta'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    {myRecipes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myRecipes.map(recipe => (
                                <div key={recipe.id} className="bg-gray-800/30 rounded-xl p-4 flex gap-4 border border-gray-700 hover:border-teal-500/30 transition-all">
                                    <img src={recipe.imagen} alt={recipe.titulo} className="w-24 h-24 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-white text-lg">{recipe.titulo}</h3>
                                                <p className="text-sm text-gray-400 mb-2">{recipe.tiempo} • {recipe.personas} pers.</p>
                                            </div>
                                            <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
                                                <button
                                                    onClick={() => openShareModal(recipe, 'private')}
                                                    title="Privado"
                                                    className={`p-1.5 rounded-md transition-all ${!recipe.visibility || recipe.visibility === 'private' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                                >
                                                    <Lock size={14} />
                                                </button>
                                                <button
                                                    onClick={() => openShareModal(recipe, 'community')}
                                                    title="Comunidad"
                                                    className={`p-1.5 rounded-md transition-all ${recipe.visibility === 'community' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                                >
                                                    <Users size={14} />
                                                </button>
                                                <button
                                                    onClick={() => openShareModal(recipe, 'public')}
                                                    title="Público"
                                                    className={`p-1.5 rounded-md transition-all ${recipe.visibility === 'public' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                                >
                                                    <Globe size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => handleEdit(recipe)}
                                                className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg text-sm hover:bg-teal-500/30 transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
                                                        deleteRecipe(recipe.id);
                                                    }
                                                }}
                                                className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg">No has creado ninguna receta todavía.</p>
                            <button onClick={() => setActiveTab('create')} className="text-teal-400 mt-2 hover:underline">
                                ¡Crea tu primera receta!
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Share Modal */}
        {
            sharingModal.open && sharingModal.recipe && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl relative">
                        <button
                            onClick={() => setSharingModal({ open: false, recipe: null, type: null })}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-2">
                            {sharingModal.type === 'private' ? 'Compartir en Privado' : 'Confirmar Visibilidad'}
                        </h3>

                        <p className="text-gray-400 mb-6 text-sm">
                            {sharingModal.type === 'private'
                                ? 'Envía esta receta a un amigo por correo electrónico.'
                                : `¿Estás seguro de que quieres cambiar la visibilidad a "${sharingModal.type === 'community' ? 'Comunidad' : 'Público'}"?`}
                        </p>

                        {sharingModal.type === 'private' && (
                            <div className="mb-6">
                                <label className="text-gray-300 text-sm mb-2 block">Correo Electrónico</label>
                                <div className="relative">
                                    <Send className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <input
                                        type="email"
                                        value={shareEmail}
                                        onChange={(e) => setShareEmail(e.target.value)}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-9 pr-4 text-white focus:border-teal-500 focus:outline-none"
                                        placeholder="amigo@ejemplo.com"
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSharingModal({ open: false, recipe: null, type: null })}
                                className="flex-1 py-2 text-gray-400 hover:text-white font-semibold transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleShareConfirm}
                                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2 font-bold shadow-lg shadow-teal-500/20 transition-all"
                            >
                                {sharingModal.type === 'private' ? 'Enviar' : 'Confirmar'}
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </>);
};

export default Admin;
