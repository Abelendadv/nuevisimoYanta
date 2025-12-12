import React from 'react';
import { Heart, Clock, Users, ChefHat } from 'lucide-react';
import type { Receta } from '../types';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';

interface RecipeCardProps {
    receta: Receta;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ receta }) => {
    const { favorites, toggleFavorite } = useRecipes();
    const isFavorite = favorites.includes(receta.id);

    return (
        <div className="group bg-gray-800/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
            <div className="relative overflow-hidden h-48">
                <Link to={`/recipe/${receta.id}`}>
                    <img
                        src={receta.imagen}
                        alt={receta.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(receta.id);
                    }}
                    className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/70 transition-all z-10"
                >
                    <Heart
                        className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
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
                    <Link to={`/recipe/${receta.id}`}>
                        {receta.titulo}
                    </Link>
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
                <Link
                    to={`/recipe/${receta.id}`}
                    className="block text-center w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                >
                    Ver Receta
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;
