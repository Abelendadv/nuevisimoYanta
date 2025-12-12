import { useState, useEffect } from 'react';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Search as SearchIcon, X, Bot } from 'lucide-react';
import { getAIResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const Search = () => {
    const { recipes } = useRecipes();
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);

    // Debounce search term to avoid spamming AI
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 800);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch AI response when debounced term changes
    useEffect(() => {
        const fetchAI = async () => {
            if (!debouncedTerm.trim() || debouncedTerm.length < 3) {
                setAiResponse('');
                return;
            }
            setLoadingAI(true);
            const response = await getAIResponse(debouncedTerm);
            setAiResponse(response);
            setLoadingAI(false);
        };
        fetchAI();
    }, [debouncedTerm]);

    const filteredRecipes = (recipes || []).filter(recipe => {
        if (!recipe) return false;
        const term = searchTerm.toLowerCase();
        return (
            (recipe.titulo || '').toLowerCase().includes(term) ||
            (recipe.autor || '').toLowerCase().includes(term) ||
            (recipe.ingredients || []).some(ing => (ing.nombre || '').toLowerCase().includes(term))
        );
    });

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <h2 className="text-3xl font-bold text-white mb-6">Buscar Recetas</h2>

            <div className="relative max-w-2xl mx-auto">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pregunta al chef o busca una receta..."
                    className="w-full bg-gray-800/50 text-white pl-12 pr-12 py-4 rounded-xl border border-teal-500/30 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all text-lg shadow-lg shadow-teal-500/10"
                    autoFocus
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Local Results */}
                {filteredRecipes.length > 0 && (
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <SearchIcon className="w-5 h-5 text-teal-400" />
                            Resultados Locales ({filteredRecipes.length})
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredRecipes.map(receta => (
                                <RecipeCard key={receta.id} receta={receta} />
                            ))}
                        </div>
                    </div>
                )}

                {/* AI Results */}
                <div className={filteredRecipes.length > 0 ? "lg:col-span-1" : "lg:col-span-3"}>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-teal-500/30 sticky top-28 shadow-xl shadow-teal-500/5">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                            <Bot className="w-6 h-6 text-teal-400" />
                            Chef Yanta AI
                        </h3>

                        {!debouncedTerm && (
                            <p className="text-gray-500 text-sm italic">
                                Escribe algo para invocar la sabiduría del Chef...
                            </p>
                        )}

                        {loadingAI && (
                            <div className="flex flex-col items-center py-8 space-y-3">
                                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-teal-400 text-sm animate-pulse">Consultando recetario infinito...</p>
                            </div>
                        )}

                        {!loadingAI && aiResponse && (
                            <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                                <ReactMarkdown>{aiResponse}</ReactMarkdown>
                            </div>
                        )}

                        {!loadingAI && !aiResponse && debouncedTerm && filteredRecipes.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <p>No hay recetas locales, ¡pregúntale al Chef Yanta!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
