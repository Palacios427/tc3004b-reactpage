import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from './pages/List';
import Add from './components/Add';
import ResponsiveAppBar from './components/AppBar';
import Login from './pages/Login';
import Home from './pages/Home';
import Hash from './pages/Hash';
import Register from './pages/Register';
import ItemInfo from './components/ItemInfo';
import useCount from './hooks/useCount';
import useAuth from './hooks/useAuth';
import useItems from './hooks/useItems';
import { Button } from '@mui/material';
import LifeCycle from './pages/LifeCycle';

const API_URL = process.env.REACT_APP_API_URL;

// ✅ Ruta protegida
const PrivateRoute = ({ isLogin, children }) => {
  return isLogin ? children : <Navigate to="/" replace />;
};

// ✅ Wrapper que hace login y redirecciona
const LoginWrapper = ({ login }) => {
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    const data = await login(user);
    if (data.isLogin) {
      navigate("/home");
    }
    return data.isLogin;
  };

  return <Login login={handleLogin} />;
};

function App() {
  const [show, setShow] = useState(false);

  // Hook de autenticación
  const { isLogin, token, login, logout } = useAuth();

  // Componente Contador Simple con useCount usando hooks
  const { count, sum, resta } = useCount();

  // Componente Items con useItems usando hooks
  const { items, getItems, addItem, delItem } = useItems(token);

  // Solo obtener items cuando hay token y no hay items
  useEffect(() => {
    if (token && items.length === 0) {
      getItems();
    }
  }, [token, items.length, getItems]);

  return (
    <div>
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar logout={logout} />}
        <Header />
        <Routes>
          <Route path="/" element={<LoginWrapper login={login} />} />
          <Route
            path="/home"
            element={
              <PrivateRoute isLogin={isLogin}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute isLogin={isLogin}>
                <Add add={addItem} />
              </PrivateRoute>
            }
          />
          <Route
            path="/items"
            element={
              <PrivateRoute isLogin={isLogin}>
                <List items={items} ondelete={delItem} />
              </PrivateRoute>
            }
          />
          <Route
            path="/items/:id"
            element={
              <PrivateRoute isLogin={isLogin}>
                <ItemInfo items={items} />
              </PrivateRoute>
            }
          />
          <Route path="/hash" element={<Hash />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <button onClick={() => setShow(!show)}>{show ? "Hide":"Show"}</button>
      {show && <LifeCycle />}
    </div>
  );
}

export default App;
