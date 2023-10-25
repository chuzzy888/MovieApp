import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Movie from './Movie';
import Footer from './Footer';



function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Movie />
      <Footer />
     
    </div>
  );
}

export default App;
