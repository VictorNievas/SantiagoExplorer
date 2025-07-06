import { Routes, Route } from "react-router-dom"
import Inicio from "./inicio/inicio.jsx"
import Login from "./login/login.jsx"
import Register from "./registro/registro.jsx"
import PerfilUsuario from "./perfil/perfil.jsx"
import DescubrirSocial from "./descubrir/descubrir.jsx"

function App() {
  return (
    <div className="Aplicacion">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/registro" element={ <Register /> } />
        <Route path="/inicio" element={ <Inicio /> } />
        <Route path="/perfil" element={ <PerfilUsuario /> } />
        <Route path="/descubrir" element={ <DescubrirSocial /> } />
      </Routes>
    </div>
  )
}

export default App