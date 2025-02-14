import './App.css';
import {useState} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Boton from './components/Boton';
import List from './components/List';
import Add from './components/Add';

function App() {
  const [items, setItems] = useState([
    {id: 1, name: "item 1", price: 1},
    {id: 2, name: "item 2", price: 2},
    {id: 3, name: "item 3", price: 3}
  ]);

  let [count, setCount] = useState(0);

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

  const nombre = "Jorge Palacios"
  const elemento = <h1>Hello, {nombre}</h1>

  return (
    <div className="App">
      <Header />
      {count}
      <Boton nombre={"suma"} click={sum}/>
      <Boton nombre={"resta"} click={resta}/>
      <Boton nombre={"mensaje"} click={() => alert("hola")}/>
      <Add add={add}/>
      <List items={items} ondelete={del}/>
      <Footer />
    </div>
  );
}

export default App;
