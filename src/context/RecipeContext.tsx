import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Receta, Comment } from '../types';
import { initialRecipes } from '../data/mockData';

interface RecipeContextType {
    recipes: Receta[];
    favorites: number[];
    toggleFavorite: (id: number) => void;
    addComment: (recipeId: number, comment: Comment) => void;
    addRecipe: (recipe: Receta) => void;
    updateRecipe: (recipe: Receta) => void;
    deleteRecipe: (id: number) => void;
    shoppingList: { nombre: string; cantidad: string; checked: boolean }[];
    addToShoppingList: (ingredients: { nombre: string; cantidad: string }[]) => void;
    toggleShoppingItem: (index: number) => void;
    updateShoppingItem: (index: number, newItem: { nombre: string; cantidad: string; checked: boolean }) => void;
    clearShoppingList: () => void;
    removeCheckedShoppingItems: () => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const DATA_VERSION = 'v1.2';

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state from localStorage or fallback to defaults
    const [recipes, setRecipes] = useState<Receta[]>(() => {
        const savedVersion = localStorage.getItem('dataVersion');
        if (savedVersion !== DATA_VERSION) return initialRecipes;
        const saved = localStorage.getItem('recipes');
        return saved ? JSON.parse(saved) : initialRecipes;
    });

    const [favorites, setFavorites] = useState<number[]>(() => {
        const savedVersion = localStorage.getItem('dataVersion');
        if (savedVersion !== DATA_VERSION) return [];
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const [shoppingList, setShoppingList] = useState<{ nombre: string; cantidad: string; checked: boolean }[]>(() => {
        const savedVersion = localStorage.getItem('dataVersion');
        if (savedVersion !== DATA_VERSION) return [];
        const saved = localStorage.getItem('shoppingList');
        return saved ? JSON.parse(saved) : [];
    });

    // Update version in storage
    useEffect(() => {
        const savedVersion = localStorage.getItem('dataVersion');
        if (savedVersion !== DATA_VERSION) {
            localStorage.setItem('dataVersion', DATA_VERSION);
        }
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }, [recipes]);

    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }, [shoppingList]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const addComment = (recipeId: number, comment: Comment) => {
        setRecipes(prevRecipes =>
            prevRecipes.map(recipe =>
                recipe.id === recipeId
                    ? { ...recipe, comments: [...(recipe.comments || []), comment] }
                    : recipe
            )
        );
    };

    const addRecipe = (recipe: Receta) => {
        setRecipes(prev => [...prev, recipe]);
    };

    const updateRecipe = (updatedRecipe: Receta) => {
        setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    };

    const deleteRecipe = (id: number) => {
        setRecipes(prev => prev.filter(r => r.id !== id));
    };

    const addToShoppingList = (ingredients: { nombre: string; cantidad: string }[]) => {
        setShoppingList(prev => {
            const newList = [...prev];
            ingredients.forEach(ing => {
                const exists = newList.find(item => item.nombre.toLowerCase() === ing.nombre.toLowerCase());
                if (!exists) {
                    newList.push({ ...ing, checked: false });
                }
                // Optional: logic to combine quantities could go here
            });
            return newList;
        });
    };

    const toggleShoppingItem = (index: number) => {
        setShoppingList(prev => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
    };

    const updateShoppingItem = (index: number, newItem: { nombre: string; cantidad: string; checked: boolean }) => {
        setShoppingList(prev => prev.map((item, i) => i === index ? newItem : item));
    };

    const clearShoppingList = () => setShoppingList([]);

    return (
        <RecipeContext.Provider value={{
            recipes,
            favorites,
            toggleFavorite,
            addComment,
            addRecipe,
            updateRecipe,
            deleteRecipe,
            shoppingList,
            addToShoppingList,
            toggleShoppingItem,
            updateShoppingItem,
            clearShoppingList,
            removeCheckedShoppingItems: () => setShoppingList(prev => prev.filter(item => !item.checked))
        }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (context === undefined) {
        throw new Error('useRecipes must be used within a RecipeProvider');
    }
    return context;
};
