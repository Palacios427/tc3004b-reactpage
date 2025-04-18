import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from './pages/List';
import Add from './components/Add';
import ResponsiveAppBar from './components/AppBar';
import Login from './pages/Login';
import Home from './pages/Home';
import Hash from './pages/Hash';
import Register from './pages/Register';


function App() {
  const [items, setItems] = useState([]);
  
  // let [count, setCount] = useState(0);
  
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (isLogin) {
      getItems();
    }
  }, [isLogin]);


  const getItems = async () => {
    const token = localStorage.getItem("token")

    const result = await fetch("http://localhost:5000/items/", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await result.json();
    setItems(data);
  };

  // const sum = () => {
  //   setCount(count + 1);
  //   console.log(count);
  // };

  // const resta = () => {
  //   setCount(count - 1);
  //   console.log(count);
  // };

  const add = async (item) => {
    const token = localStorage.getItem("token");

    // item.id = items.length + 1;
    const result = await fetch ("http://localhost:5000/items/", {
      method: "POST", 
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type":"application/json",
      },
      body: JSON.stringify(item),
      });
      const data = await result.json();
    setItems([...items, data.item]);
  };

  const del = async (id) => {
    const token = localStorage.getItem("token")

    await fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    setItems(items.filter((item) => item.id !== id));
  };

  const login = async (user) => {
    const result = await fetch ("http://localhost:5000/login/", {method: "POST", 
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(user),
    });

    const data = await result.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      setIsLogin(data.isLogin);
    }

    return data.isLogin;
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("token");
  }

  return (
    <div>
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar logout={logout}/>}
        <Header />
        <Routes>

            <Route path="/" element={<Login login={login}/>} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<Add add={add}/> }/>
            <Route path="/items" element={<List items={items} ondelete={del}/> }/>
            <Route path="/home" element={<Home />} />
            <Route path="/hash" element={<Hash />} />
            <Route path="/register" element={<Register />} />

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
