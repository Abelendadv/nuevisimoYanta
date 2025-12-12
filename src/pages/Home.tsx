import { useState, useEffect } from 'react';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { TrendingUp, Sparkles, Search, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { recipes } = useRecipes();
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const matchImages = [
        'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=1600&h=900&fit=crop',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1600&h=900&fit=crop',
        'https://images.unsplash.com/photo-1507048331197-7d4defea8775?w=1600&h=900&fit=crop',
        'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=1600&h=900&fit=crop'
    ];

    // Carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % matchImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const categories = ['Todos', 'Fácil', 'Media', 'Difícil'];
    const filteredRecipes = selectedCategory === 'Todos'
        ? recipes
        : recipes.filter(r => r.dificultad === selectedCategory);

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-teal-900 text-white shadow-2xl shadow-teal-500/10">
                {matchImages.map((img, index) => (
                    <div
                        key={img}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-20' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${img}')` }}
                    ></div>
                ))}

                <div className="relative z-10 px-8 py-16 md:py-32 flex flex-col items-center text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 text-teal-300 font-semibold text-sm backdrop-blur-md border border-teal-500/30">
                        <Sparkles className="w-4 h-4" />
                        <span>Nuevas recetas cada semana</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
                        Come con <span className="text-teal-400">Seso</span>
                    </h1>
                    <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
                        Descubre miles de recetas creadas por nuestra comunidad. Desde platos tradicionales hasta fusiones modernas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link to="/search" className="px-8 py-4 bg-teal-500 text-white rounded-xl font-bold text-lg hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2">
                            <Search className="w-5 h-5" />
                            Buscar Recetas
                        </Link>
                        <button className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2 group">
                            <MonitorPlay className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Ver Video Tutorial
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-8 h-8 text-teal-400" />
                            Recetas Destacadas
                        </h2>
                        <p className="text-gray-400 mt-2">Los platos más populares de nuestra comunidad</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRecipes.map(receta => (
                        <RecipeCard key={receta.id} receta={receta} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
