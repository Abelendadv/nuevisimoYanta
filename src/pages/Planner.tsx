import { useState } from 'react';
import type { UserStats, WeeklyPlan } from '../types';
import { initialRecipes } from '../data/mockData';
import { generateWeeklyPlan } from '../services/gemini';
import { Calculator, ArrowRight, Check, ShoppingCart, Loader2, Calendar } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { useNavigate } from 'react-router-dom';

const Planner = () => {
    const { addToShoppingList } = useRecipes();
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [loading, setLoading] = useState(false);

    const [stats, setStats] = useState<UserStats>({
        weight: 70,
        height: 170,
        age: 30,
        gender: 'male',
        goal: 'maintain',
        activityLevel: 'moderate'
    });

    const [plan, setPlan] = useState<WeeklyPlan | null>(null);

    const calculateBMI = () => {
        const heightM = stats.height / 100;
        return (stats.weight / (heightM * heightM)).toFixed(1);
    };

    const getBMIStatus = (bmi: number) => {
        if (bmi < 18.5) return { label: 'Bajo peso', color: 'text-yellow-400' };
        if (bmi < 24.9) return { label: 'Peso saludable', color: 'text-green-400' };
        if (bmi < 29.9) return { label: 'Sobrepeso', color: 'text-orange-400' };
        return { label: 'Obesidad', color: 'text-red-400' };
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            // In a real app, we would fetch recipes from the context/API
            // Here passing initialRecipes + any custom context if needed
            const generatedPlan = await generateWeeklyPlan(stats, initialRecipes);
            setPlan(generatedPlan);
            setStep(3);
        } catch (error) {
            console.error("Error generating plan", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDefaultPlan = () => {
        setLoading(true);
        // Simulate a short delay for better UX
        setTimeout(() => {
            const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            const defaultPlan: WeeklyPlan = {
                id: Date.now().toString(),
                startDate: new Date().toISOString(),
                stats: stats,
                days: days.map((day, index) => ({
                    day,
                    meals: [
                        // Breakfast: Rotate between first 3 recipes (assuming they could be breakfast-like or just placeholders)
                        { type: 'Desayuno', recipeId: initialRecipes[index % 3].id },
                        // Lunch: Random-ish selection from middle
                        { type: 'Comida', recipeId: initialRecipes[(index + 3) % initialRecipes.length].id },
                        // Dinner: Random-ish selection from end
                        { type: 'Cena', recipeId: initialRecipes[(index + 6) % initialRecipes.length].id },
                    ]
                }))
            };
            setPlan(defaultPlan);
            setStep(3);
            setLoading(false);
        }, 800);
    };

    const handleAddToShoppingList = () => {
        if (!plan) return;

        const allIngredients: { nombre: string; cantidad: string }[] = [];

        plan.days.forEach(day => {
            day.meals.forEach(meal => {
                const recipe = initialRecipes.find(r => r.id === meal.recipeId);
                if (recipe && recipe.ingredients) {
                    recipe.ingredients.forEach(ing => {
                        allIngredients.push(ing);
                    });
                }
            });
        });

        addToShoppingList(allIngredients);
        navigate('/shopping-list');
    };

    const bmi = parseFloat(calculateBMI());
    const bmiStatus = getBMIStatus(bmi);

    return (
        <div className="max-w-6xl mx-auto animate-fade-in pb-20">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Calculator className="text-teal-400" /> Planificador Inteligente
            </h2>

            {step === 1 && (
                <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold text-teal-400 mb-6 border-b border-gray-700 pb-2">Tus Datos</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm">Peso (kg)</label>
                            <input
                                type="number"
                                value={stats.weight}
                                onChange={e => setStats({ ...stats, weight: Number(e.target.value) })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-teal-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm">Altura (cm)</label>
                            <input
                                type="number"
                                value={stats.height}
                                onChange={e => setStats({ ...stats, height: Number(e.target.value) })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-teal-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm">Edad</label>
                            <input
                                type="number"
                                value={stats.age}
                                onChange={e => setStats({ ...stats, age: Number(e.target.value) })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-teal-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm">Género</label>
                            <select
                                value={stats.gender}
                                onChange={e => setStats({ ...stats, gender: e.target.value as any })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-teal-500"
                            >
                                <option value="male">Hombre</option>
                                <option value="female">Mujer</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm">Nivel de Actividad</label>
                            <select
                                value={stats.activityLevel}
                                onChange={e => setStats({ ...stats, activityLevel: e.target.value as any })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-teal-500"
                            >
                                <option value="sedentary">Sedentario</option>
                                <option value="moderate">Moderado</option>
                                <option value="active">Activo</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm">Objetivo</label>
                            <select
                                value={stats.goal}
                                onChange={e => setStats({ ...stats, goal: e.target.value as any })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-teal-500"
                            >
                                <option value="lose_fat">Perder Grasa</option>
                                <option value="maintain">Mantener</option>
                                <option value="build_muscle">Ganar Músculo</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-xl p-4 mb-8 border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">IMC Estimado:</span>
                            <span className="text-2xl font-bold text-white">{bmi}</span>
                        </div>
                        <div className={`text-right font-medium ${bmiStatus.color}`}>
                            {bmiStatus.label}
                        </div>
                    </div>

                    <button
                        onClick={() => setStep(2)}
                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        Continuar <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="max-w-2xl mx-auto text-center space-y-8 pt-10">
                    <h3 className="text-2xl font-bold text-white">Confirmar Planificación</h3>
                    <p className="text-gray-400">
                        Basándonos en tu objetivo de <span className="text-teal-400 font-semibold">{stats.goal === 'lose_fat' ? 'Perder Grasa' : stats.goal === 'build_muscle' ? 'Ganar Músculo' : 'Mantener Peso'}</span>,
                        la IA generará un plan semanal optimizado utilizando nuestras recetas.
                    </p>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="bg-white text-gray-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" /> Generando Plan...
                            </>
                        ) : (
                            <>
                                <Check className="w-6 h-6" /> Generar Plan Semanal con IA
                            </>
                        )}
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">O si prefieres algo rápido</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <button
                        onClick={handleCreateDefaultPlan}
                        disabled={loading}
                        className="bg-transparent border-2 border-teal-500/30 text-teal-400 font-bold px-8 py-3 rounded-full text-lg hover:bg-teal-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                    >
                        <Calendar className="w-6 h-6" /> Crear Planificación por Defecto
                    </button>

                    <button onClick={() => setStep(1)} className="block mx-auto text-gray-500 hover:text-white transition-colors">
                        Volver a editar datos
                    </button>
                </div>
            )}

            {step === 3 && plan && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">Tu Plan Semanal</h3>
                            <p className="text-sm text-gray-400">Generado para {stats.weight}kg • {stats.goal}</p>
                        </div>
                        <button
                            onClick={handleAddToShoppingList}
                            className="bg-teal-500/20 text-teal-400 px-4 py-2 rounded-lg hover:bg-teal-500/30 transition-colors flex items-center gap-2 font-semibold border border-teal-500/30"
                        >
                            <ShoppingCart className="w-5 h-5" /> Añadir ingredientes a la lista
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {plan.days.map((day, idx) => (
                            <div key={idx} className="bg-gray-800/30 border border-white/5 rounded-xl overflow-hidden flex flex-col">
                                <div className="bg-gray-700/50 px-4 py-3 font-bold text-white border-b border-white/5">
                                    {day.day}
                                </div>
                                <div className="p-4 space-y-4 flex-1">
                                    {day.meals.map((meal, mIdx) => {
                                        const recipe = initialRecipes.find(r => r.id === meal.recipeId);
                                        return (
                                            <div key={mIdx} className="space-y-1">
                                                <div className="text-xs text-teal-400 uppercase font-semibold tracking-wider">{meal.type}</div>
                                                {recipe ? (
                                                    <div className="flex items-center gap-3 bg-gray-900/40 p-2 rounded-lg">
                                                        <img src={recipe.imagen} alt={recipe.titulo} className="w-10 h-10 rounded object-cover" />
                                                        <div className="text-sm text-gray-200 leading-tight">
                                                            {recipe.titulo}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-gray-500 italic">Receta no encontrada</div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Planner;
