import React, { useState, useRef, useEffect } from 'react';
import { ingredientsDb } from '../data/mockData';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const IngredientAutocomplete: React.FC<Props> = ({ value, onChange, placeholder }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const suggestions = value.trim() === ''
        ? ingredientsDb
        : ingredientsDb.filter(ing =>
            ing.nombre.toLowerCase().includes(value.toLowerCase())
        );

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <input
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:border-teal-500 focus:outline-none"
                placeholder={placeholder}
            />

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {suggestions.map((ing) => (
                        <button
                            key={ing.id}
                            type="button"
                            onClick={() => {
                                onChange(ing.nombre);
                                setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center gap-3 transition-colors"
                        >
                            <img
                                src={ing.imagen}
                                alt={ing.nombre}
                                className="w-8 h-8 rounded-full object-cover border border-gray-600"
                            />
                            <span className="text-gray-200">{ing.nombre}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IngredientAutocomplete;
