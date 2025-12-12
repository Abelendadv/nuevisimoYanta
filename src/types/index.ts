export interface Comment {
    id: string;
    author: string;
    text: string;
    date: string;
}

export interface Receta {
    id: number;
    titulo: string;
    autor: string;
    tiempo: string;
    personas: number;
    imagen: string; // Ensure this is mandatory
    dificultad: 'Fácil' | 'Media' | 'Difícil';
    ingredients: { nombre: string; cantidad: string }[];
    steps: string[];
    likes: number;
    comments?: Comment[];
    isCustom?: boolean;
    gallery?: string[];
    visibility?: 'public' | 'community' | 'private';
}

export interface IngredientItem {
    id: string;
    nombre: string;
    imagen: string;
    calorias?: number; // per 100g
}

export interface UserStats {
    weight: number;
    height: number;
    age: number;
    gender: 'male' | 'female';
    goal: 'lose_fat' | 'maintain' | 'build_muscle';
    activityLevel: 'sedentary' | 'moderate' | 'active';
}

export interface WeeklyPlan {
    id: string;
    startDate: string;
    stats: UserStats;
    days: {
        day: string; // "Lunes", "Martes"...
        meals: {
            type: 'Desayuno' | 'Comida' | 'Cena';
            recipeId: number;
        }[];
    }[];
}

export interface ShoppingItem {
    nombre: string;
    cantidad: string;
    checked: boolean;
}

export interface User {
    id: string;
    name: string;
    avatar?: string;
}
