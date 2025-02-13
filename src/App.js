import './App.css';
import {useState} from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Boton from './components/Boton';

function App() {
  const items = [
    {name: "item 1", price: 1},
    {name: "item 2", price: 2},
    {name: "item 3", price: 3}
  ];

  let [count, setCount] = useState(0);
  const sum = () => {
    setCount(count + 1);
    console.log(count);
  };

  const resta = () => {
    setCount(count - 1);
    console.log(count);
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
      <Footer />
    </div>
  );
}

export default App;
