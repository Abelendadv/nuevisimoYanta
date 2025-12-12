import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, ShieldCheck, User } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role: 'admin' | 'user') => {
        login(role);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

            <div className="relative z-10 w-full max-w-md p-8 m-4">
                <div className="flex flex-col items-center mb-10 text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30 mb-4 animate-bounce-slow">
                        <ChefHat className="w-12 h-12 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
                            YantaConSeso
                        </h1>
                        <p className="text-gray-400 mt-2 text-lg">Tu asistente culinario inteligente</p>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-xl space-y-6">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-white">Selecciona tu acceso</h2>
                        <p className="text-sm text-gray-500 mt-1">Versión de prueba</p>
                    </div>

                    <button
                        onClick={() => handleLogin('user')}
                        className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-teal-600 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/20"
                    >
                        <User className="w-6 h-6 text-teal-300 group-hover:text-white transition-colors" />
                        <span className="text-lg">Entrar como Usuario</span>
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-600 text-sm">o</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <button
                        onClick={() => handleLogin('admin')}
                        className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-purple-900 hover:to-purple-800 border border-gray-700 hover:border-purple-500/50 text-gray-300 hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        <ShieldCheck className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                        <span className="text-lg">Entrar como Admin</span>
                    </button>
                </div>

                <p className="text-center text-gray-500 text-sm mt-8">
                    © 2024 YantaConSeso. Accesso restringido.
                </p>
            </div>
        </div>
    );
};

export default Login;
