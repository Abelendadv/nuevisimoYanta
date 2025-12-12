import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Send, Image } from 'lucide-react';

const RecipeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { recipes, favorites, toggleFavorite, addComment } = useRecipes();
    const [commentText, setCommentText] = useState('');

    const recipe = recipes.find(r => r.id === Number(id));

    if (!recipe) {
        return <div className="text-white text-center py-20">Receta no encontrada</div>;
    }

    const isFavorite = favorites.includes(recipe.id);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        addComment(recipe.id, {
            id: Date.now().toString(),
            author: 'Usuario Invitado', // En un sistema real vendría del AuthContext
            text: commentText,
            date: new Date().toLocaleDateString()
        });
        setCommentText('');
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Volver
            </button>

            <div className="relative h-[28rem] md:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-teal-500/10">
                <img
                    src={recipe.imagen}
                    alt={recipe.titulo}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="max-w-2xl">
                            <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                                {recipe.dificultad}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">{recipe.titulo}</h1>
                            <p className="text-gray-300 flex items-center gap-2">
                                <ChefHat className="w-5 h-5" />
                                Por <span className="text-teal-400 font-semibold">{recipe.autor}</span>
                            </p>
                        </div>
                        <button
                            onClick={() => toggleFavorite(recipe.id)}
                            className="self-end md:self-auto bg-gray-800/50 backdrop-blur-md p-3 md:p-4 rounded-full hover:bg-teal-500/20 transition-all group"
                        >
                            <Heart
                                className={`w-6 h-6 md:w-8 md:h-8 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white group-hover:text-red-400'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Stats Bar */}
                    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/20 flex justify-around">
                        <div className="text-center">
                            <Clock className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">Tiempo</p>
                            <p className="text-white font-semibold">{recipe.tiempo}</p>
                        </div>
                        <div className="text-center border-l border-gray-700 w-px mx-4"></div>
                        <div className="text-center">
                            <Users className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">Personas</p>
                            <p className="text-white font-semibold">{recipe.personas}</p>
                        </div>
                        <div className="text-center border-l border-gray-700 w-px mx-4"></div>
                        <div className="text-center">
                            <Heart className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">Likes</p>
                            <p className="text-white font-semibold">{recipe.likes}</p>
                        </div>
                    </div>

                    {/* Pasos */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Instrucciones</h2>
                        {recipe.steps?.map((step, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 font-bold border border-teal-500/30">
                                    {index + 1}
                                </div>
                                <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
                            </div>
                        )) || <p className="text-gray-500 italic">No hay pasos registrados.</p>}
                    </div>

                    {/* Galería de Fotos */}
                    {recipe.gallery && recipe.gallery.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Image className="w-6 h-6 text-teal-400" /> Galería
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {recipe.gallery.map((img, idx) => (
                                    <div key={idx} className="rounded-xl overflow-hidden aspect-video border border-gray-700 group cursor-pointer">
                                        <img
                                            src={img}
                                            alt={`Galería ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comentarios */}
                    <div className="pt-8 border-t border-gray-800">
                        <h2 className="text-2xl font-bold text-white mb-6">Comentarios</h2>

                        {/* Formulario */}
                        <form onSubmit={handleCommentSubmit} className="mb-8 relative">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Añade un comentario..."
                                className="w-full bg-gray-800/50 text-white pl-4 pr-12 py-4 rounded-xl border border-teal-500/30 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
                            />
                            <button
                                type="button"
                                onClick={handleCommentSubmit}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-teal-400 hover:text-white transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Lista */}
                        <div className="space-y-6">
                            {recipe.comments && recipe.comments.length > 0 ? (
                                recipe.comments.map(comment => (
                                    <div key={comment.id} className="bg-gray-800/20 rounded-xl p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-teal-400">{comment.author}</h4>
                                            <span className="text-xs text-gray-500">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-300">{comment.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">Sé el primero en comentar.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Derecha (Ingredientes) */}
                <div className="space-y-6">
                    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/20 sticky top-28">
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Ingredientes</h3>
                        <ul className="space-y-3">
                            {recipe.ingredients?.map((ing, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-300">
                                    <span className="w-2 h-2 mt-2 bg-teal-500 rounded-full flex-shrink-0"></span>
                                    <span>
                                        <span className="font-semibold text-teal-400">{ing.cantidad}</span> {ing.nombre}
                                    </span>
                                </li>
                            )) || <li className="text-gray-500 italic">No hay ingredientes registrados.</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
