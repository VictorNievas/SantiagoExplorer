import { Routes, Route } from "react-router-dom"
import Inicio from "./inicio/inicio.jsx"
import Login from "./login/login.jsx"
import Register from "./registro/registro.jsx"
import PerfilUsuario from "./perfil/perfil.jsx"
import DescubrirSocial from "./descubrir/descubrir.jsx"
import Configuracion from "./configuracion/configuracion.jsx"
import 'aos/dist/aos.css';
import AOS from 'aos';
import LandingPage from "./landingpage/landingpage.jsx"
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="Aplicacion">
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/registro" element={ <Register /> } />
        <Route path="/inicio" element={ <Inicio /> } />
        <Route path="/perfil" element={ <PerfilUsuario /> } />
        <Route path="/descubrir" element={ <DescubrirSocial /> } />
        <Route path="/configuracion" element={ <Configuracion /> } />
      </Routes>
    </div>
  )
}

export default App