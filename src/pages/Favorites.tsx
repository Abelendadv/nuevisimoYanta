import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';

const Favorites = () => {
    const { recipes, favorites } = useRecipes();
    const favRecetas = recipes.filter(r => favorites.includes(r.id));

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
                    {favRecetas.map(receta => (
                        <RecipeCard key={receta.id} receta={receta} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
