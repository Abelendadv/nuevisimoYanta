import type { Receta } from '../types';

export const initialRecipes: Receta[] = [
    {
        id: 1,
        titulo: 'Hamburguesa Clásica',
        autor: 'Chef Burger',
        tiempo: '20 min',
        personas: 1,
        imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
        dificultad: 'Fácil',
        likes: 450,
        ingredients: [
            { nombre: 'Carne picada de ternera', cantidad: '200g' },
            { nombre: 'Pan de hamburguesa', cantidad: '1 u' },
            { nombre: 'Queso Cheddar', cantidad: '2 lonchas' },
            { nombre: 'Lechuga fresca', cantidad: '1 hoja' },
            { nombre: 'Tomate', cantidad: '2 rodajas' },
            { nombre: 'Salsas', cantidad: 'al gusto' }
        ],
        steps: [
            'Salpimentar la carne y formar la hamburguesa.',
            'Cocinar a la plancha 3-4 minutos por lado.',
            'Tostar ligeramente el pan.',
            'Montar con la carne, queso fundido y vegetales.'
        ],
        comments: [
            { id: 'c1', author: 'Juan Perez', text: '¡La mejor burger casera!', date: '2024-12-01' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
            'https://images.unsplash.com/photo-1619250907577-446419ca6253?w=800&q=80'
        ]
    },
    {
        id: 2,
        titulo: 'Tacos al Pastor',
        autor: 'Luis Rodríguez',
        tiempo: '30 min',
        personas: 6,
        imagen: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
        dificultad: 'Fácil',
        likes: 189,
        ingredients: [
            { nombre: 'Tortillas de maíz', cantidad: '12 u' },
            { nombre: 'Carne de cerdo adobada', cantidad: '1 kg' },
            { nombre: 'Piña', cantidad: '1/2 u' },
            { nombre: 'Cilantro', cantidad: 'al gusto' },
            { nombre: 'Cebolla', cantidad: '2 u' }
        ],
        steps: ['Cocinar la carne.', 'Calentar tortillas.', 'Servir con piña y verdura.'],
        gallery: [
            'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80',
            'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&q=80'
        ]
    },
    {
        id: 3,
        titulo: 'Risotto de Hongos',
        autor: 'Sofia Martínez',
        tiempo: '35 min',
        personas: 3,
        imagen: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&h=600&fit=crop',
        dificultad: 'Media',
        likes: 156,
        ingredients: [
            { nombre: 'Arroz arboreo', cantidad: '300g' },
            { nombre: 'Setas variadas', cantidad: '250g' },
            { nombre: 'Caldo de verduras', cantidad: '1L' },
            { nombre: 'Vino blanco', cantidad: '100ml' },
            { nombre: 'Parmesano', cantidad: '100g' }
        ],
        steps: ['Sofreír cebolla y setas.', 'Añadir arroz y vino.', 'Incorporar caldo poco a poco.', 'Mantecar con queso.'],
        gallery: [
            'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&q=80',
            'https://images.unsplash.com/photo-1595908129746-250188c685f8?w=800&q=80'
        ]
    },
    {
        id: 4,
        titulo: 'Pizza Margarita',
        autor: 'Gino D.',
        tiempo: '25 min',
        personas: 2,
        imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop',
        dificultad: 'Media',
        likes: 310,
        ingredients: [
            { nombre: 'Masa de pizza', cantidad: '1 base' },
            { nombre: 'Salsa de tomate', cantidad: '100g' },
            { nombre: 'Mozzarella fresca', cantidad: '125g' },
            { nombre: 'Albahaca fresca', cantidad: 'al gusto' },
            { nombre: 'Aceite de oliva virgen', cantidad: 'chorrito' }
        ],
        steps: ['Extender la masa.', 'Cubrir con tomate y mozzarella.', 'Hornear a 250ºC durante 10-12 min.', 'Añadir albahaca fresca al salir.'],
        gallery: [
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
            'https://images.unsplash.com/photo-1595708684082-a173bb3a67d6?w=800&q=80'
        ]
    },
    {
        id: 5,
        titulo: 'Lasaña Boloñesa',
        autor: 'María López',
        tiempo: '60 min',
        personas: 8,
        imagen: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
        dificultad: 'Difícil',
        likes: 312,
        ingredients: [
            { nombre: 'Placas de lasaña', cantidad: '12 u' },
            { nombre: 'Carne picada', cantidad: '500g' },
            { nombre: 'Salsa de tomate', cantidad: '400g' },
            { nombre: 'Bechamel', cantidad: '500ml' },
            { nombre: 'Queso rallado', cantidad: '200g' }
        ],
        steps: ['Hacer salsa boloñesa.', 'Montar capas de pasta y salsa.', 'Cubrir con bechamel y queso.', 'Hornear 30 min.'],
        gallery: [
            'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80',
            'https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=80'
        ]
    },
    {
        id: 6,
        titulo: 'Sushi Variado',
        autor: 'Hiroshi Tanaka',
        tiempo: '50 min',
        personas: 2,
        imagen: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
        dificultad: 'Difícil',
        likes: 278,
        ingredients: [
            { nombre: 'Arroz para sushi', cantidad: '300g' },
            { nombre: 'Alga nori', cantidad: '3 hojas' },
            { nombre: 'Pescado crudo', cantidad: '200g' },
            { nombre: 'Vinagre de arroz', cantidad: '30ml' },
            { nombre: 'Aguacate', cantidad: '1 u' }
        ],
        steps: ['Preparar arroz.', 'Cortar pescado.', 'Enrollar makis y formar nigiris.'],
        gallery: [
            'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
            'https://images.unsplash.com/photo-1617196019294-dc44dfac01ec?w=800&q=80'
        ]
    },
    // New Recipes for variety
    {
        id: 7,
        titulo: 'Ensalada César',
        autor: 'Ana K.',
        tiempo: '15 min',
        personas: 2,
        imagen: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80',
        dificultad: 'Fácil',
        likes: 120,
        ingredients: [
            { nombre: 'Lechuga romana', cantidad: '1 u' },
            { nombre: 'Pollo a la plancha', cantidad: '200g' },
            { nombre: 'Picatostes', cantidad: '50g' },
            { nombre: 'Queso parmesano', cantidad: '30g' },
            { nombre: 'Salsa César', cantidad: '50ml' }
        ],
        steps: ['Lavar lechuga.', 'Cortar pollo.', 'Mezclar todo con la salsa.'],
        gallery: [
            'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80',
            'https://images.unsplash.com/photo-1512852939750-13476631991d?w=800&q=80'
        ]
    },
    {
        id: 8,
        titulo: 'Salmón al Horno',
        autor: 'Carlos R.',
        tiempo: '25 min',
        personas: 2,
        imagen: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&q=80',
        dificultad: 'Fácil',
        likes: 340,
        ingredients: [
            { nombre: 'Lomos de salmón', cantidad: '2 u' },
            { nombre: 'Espárragos', cantidad: '10 u' },
            { nombre: 'Limón', cantidad: '1 u' },
            { nombre: 'Aceite de oliva', cantidad: '10ml' }
        ],
        steps: ['Precalentar horno 200ºC.', 'Poner salmón y espárragos en bandeja.', 'Hornear 15 min.'],
        gallery: [
            'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?w=800&q=80',
            'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80'
        ]
    },
    {
        id: 9,
        titulo: 'Tortilla Francesa',
        autor: 'Recetas Rápidas',
        tiempo: '10 min',
        personas: 1,
        imagen: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=800&q=80',
        dificultad: 'Fácil',
        likes: 90,
        ingredients: [
            { nombre: 'Huevos', cantidad: '2 u' },
            { nombre: 'Sal', cantidad: 'pizca' },
            { nombre: 'Aceite', cantidad: '1 cdta' }
        ],
        steps: ['Batir huevos.', 'Calentar sartén.', 'Cocinar vuelta y vuelta.'],
        gallery: [
            'https://images.unsplash.com/photo-1605172886022-de972945d8b6?w=800&q=80',
            'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80'
        ]
    },
    {
        id: 10,
        titulo: 'Pasta al Pesto',
        autor: 'Luigi V.',
        tiempo: '20 min',
        personas: 2,
        imagen: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
        dificultad: 'Fácil',
        likes: 210,
        ingredients: [
            { nombre: 'Espaguetis', cantidad: '200g' },
            { nombre: 'Albahaca fresca', cantidad: '50g' },
            { nombre: 'Piñones', cantidad: '20g' },
            { nombre: 'Parmesano', cantidad: '50g' },
            { nombre: 'Aceite de oliva', cantidad: '50ml' }
        ],
        steps: ['Cocer pasta.', 'Triturar albahaca, piñones, queso y aceite.', 'Mezclar salsa con pasta.'],
        gallery: [
            'https://images.unsplash.com/photo-1594958045622-c4ae6d47b56a?w=800&q=80',
            'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80'
        ]
    }
];

export const ingredientsDb: { id: string; nombre: string; imagen: string }[] = [
    { id: '1', nombre: 'Arroz', imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&q=80' },
    { id: '2', nombre: 'Pollo', imagen: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=100&q=80' },
    { id: '3', nombre: 'Tomate', imagen: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&q=80' },
    { id: '4', nombre: 'Lechuga', imagen: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=100&q=80' },
    { id: '5', nombre: 'Huevo', imagen: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=100&q=80' },
    { id: '6', nombre: 'Leche', imagen: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&q=80' },
    { id: '7', nombre: 'Queso', imagen: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&q=80' },
    { id: '8', nombre: 'Pan', imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&q=80' },
    { id: '9', nombre: 'Patata', imagen: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&q=80' },
    { id: '10', nombre: 'Cebolla', imagen: 'https://images.unsplash.com/photo-1508747703703-060515b50dab?w=100&q=80' },
    { id: '11', nombre: 'Salmón', imagen: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=100&q=80' },
    { id: '12', nombre: 'Pasta', imagen: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=100&q=80' },
    { id: '13', nombre: 'Aceite de oliva', imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&q=80' },
    { id: '14', nombre: 'Ajo', imagen: 'https://images.unsplash.com/photo-1615477093393-8025219488a0?w=100&q=80' },
    { id: '15', nombre: 'Pimiento', imagen: 'https://images.unsplash.com/photo-1563565375-f3fdf5aea238?w=100&q=80' }
];
