import { createContext, useContext, useState, type ReactNode } from 'react';

type UserRole = 'admin' | 'user' | null;

interface AuthContextType {
    userRole: UserRole;
    isAuthenticated: boolean;
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Initialize from localStorage to persist login across reloads
    const [userRole, setUserRole] = useState<UserRole>(() => {
        return (localStorage.getItem('userRole') as UserRole) || null;
    });

    const isAuthenticated = !!userRole;

    const login = (role: UserRole) => {
        setUserRole(role);
        localStorage.setItem('userRole', role as string);
    };

    const logout = () => {
        setUserRole(null);
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
