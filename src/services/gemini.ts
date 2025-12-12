import { GoogleGenerativeAI } from '@google/generative-ai';
import type { UserStats, Receta, WeeklyPlan } from '../types';

// Initialize the API with the key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Mock function to simulate AI generation
export const generateWeeklyPlan = async (stats: UserStats, recipes: Receta[]): Promise<WeeklyPlan> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const getRecipeForMeal = (_type: string) => {
        // Simple random logic for demo
        const randomIndex = Math.floor(Math.random() * recipes.length);
        return recipes[randomIndex].id;
    };

    return {
        id: Date.now().toString(),
        startDate: new Date().toISOString(),
        stats,
        days: [
            'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
        ].map(day => ({
            day,
            meals: [
                { type: 'Desayuno', recipeId: getRecipeForMeal('Desayuno') },
                { type: 'Comida', recipeId: getRecipeForMeal('Comida') },
                { type: 'Cena', recipeId: getRecipeForMeal('Cena') }
            ]
        }))
    } as WeeklyPlan;
};

export const getAIResponse = async (query: string): Promise<string> => {
    if (!API_KEY || API_KEY.includes('your_api_key')) {
        return "⚠️ Configuración faltante: Verifica VITE_GEMINI_API_KEY en el archivo .env";
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Using gemini-1.5-flash for speed and better availability
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Context priming for the AI
        const prompt = `
      Eres un chef experto y amable llamado "Chef Yanta". 
      Tu objetivo es ayudar a usuarios con dudas de cocina.
      
      El usuario ha buscado: "${query}".
      
      Si la búsqueda es sobre una receta específica, dales una versión resumida, ingredientes clave y un consejo secreto.
      Si es una pregunta técnica, responde con pasos claros.
      Sé breve, usa emojis y un tono inspirador. Formatea en Markdown.
    `;

        let attempt = 0;
        const maxRetries = 3;

        while (attempt < maxRetries) {
            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                return response.text();
            } catch (error: any) {
                // Check for 503 Service Unavailable (Overloaded)
                if ((error.message?.includes('503') || error.status === 503) && attempt < maxRetries - 1) {
                    attempt++;
                    // Exponential backoff: 1000ms, 2000ms, 4000ms...
                    const delay = 1000 * Math.pow(2, attempt - 1);
                    console.warn(`Gemini API overloaded provided 503. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
                // If not 503 or retries exhausted, throw to outer catch
                throw error;
            }
        }
        throw new Error("Maximum retries exceeded");
    } catch (error: any) {
        console.error("Error fetching AI response:", error);
        // Return the actual error to help debugging
        const errorMessage = error?.message || "Error desconocido";
        return `👨‍🍳 El Chef tiene un problema técnico:\n\n\`${errorMessage}\`\n\nVerifica tu API Key y conexión.`;
    }
};
