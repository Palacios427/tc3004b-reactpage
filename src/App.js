import './App.css';
import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Boton from './components/Boton';
import List from './pages/List';
import Add from './components/Add';
import ResponsiveAppBar from './components/AppBar';
import Login from './pages/Login';
import Home from './pages/Home';
import NavLinks from './pages/NavLinks';

function App() {
  const [items, setItems] = useState([
    {id: 1, name: "item 1", price: 1},
    {id: 2, name: "item 2", price: 2},
    {id: 3, name: "item 3", price: 3}
  ]);

  let [count, setCount] = useState(0);

  const [isLogin, setIsLogin] = useState(false);

  const sum = () => {
    setCount(count + 1);
    console.log(count);
  };

  const resta = () => {
    setCount(count - 1);
    console.log(count);
  };

  const add = (item) => {
    item.id = items.length + 1;
    setItems([...items, item])
  };

  const del = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const login = (user) => {
    if (user.username === "jorge" && user.password === "1234") {
      setIsLogin(true);
    }
    return isLogin;
  };

  const logout = () => {
    setIsLogin(false);
  }

  return (
    <div>
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar logout={logout}/>}
        <Header />
        <Routes>

            <Route path="/" element={<Login login={login}/>} /> 
            <Route path="/navlinks" element={<NavLinks /> }/>
            <Route path="/add" element={<Add add={add}/> }/>
            <Route path="/items" element={<List items={items} ondelete={del}/> }/>
            <Route path="/home" element={<Home />} />

        </Routes>
        <Footer />
      </BrowserRouter>

      {/* {count}
      <Boton nombre={"suma"} click={sum}/>
      <Boton nombre={"resta"} click={resta}/>
      <Boton nombre={"mensaje"} click={() => alert("hola")}/> */}
    </div>
  );
}

export default App;
