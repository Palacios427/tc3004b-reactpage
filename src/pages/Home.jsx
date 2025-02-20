import React from "react";
import yokoso from '../images/yokoso.jpg';

const Home = () => {
  return (
    <div>
      <h1>Welcome to my React page!</h1>
      <p>Yokoso, watashi no soul society.</p>
      <img src={yokoso} height={300} width={300}/>
    </div>
  );
};

export default Home;
