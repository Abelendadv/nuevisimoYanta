import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Admin from './pages/Admin';
import Planner from './pages/Planner';
import ShoppingList from './pages/ShoppingList';
import GlobalManagement from './pages/GlobalManagement';
import Moderation from './pages/Moderation';
import { RecipeProvider } from './context/RecipeContext';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/global" element={<GlobalManagement />} />
        <Route path="/moderation" element={<Moderation />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="*" element={<div className="text-white text-center py-20">Página no encontrada (WIP)</div>} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <AppContent />
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
