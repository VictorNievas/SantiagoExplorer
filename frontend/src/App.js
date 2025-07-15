import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./inicio/inicio.jsx";
import Login from "./login/login.jsx";
import Register from "./registro/registro.jsx";
import PerfilUsuario from "./perfil/perfil.jsx";
import DescubrirSocial from "./descubrir/descubrir.jsx";
import Configuracion from "./configuracion/configuracion.jsx";
import LandingPage from "./landingpage/landingpage.jsx";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AdMob } from '@capacitor-community/admob';

function App() {
  const usuario = localStorage.getItem("usuario");

  useEffect(() => {
    AOS.init({ duration: 1000 });

  }, []);

  return (
    <div className="Aplicacion">
      <Routes>
        <Route path="/" element={usuario ? <Navigate to="/inicio" /> : <LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/descubrir" element={<DescubrirSocial />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </div>
  );
}

export default App;
