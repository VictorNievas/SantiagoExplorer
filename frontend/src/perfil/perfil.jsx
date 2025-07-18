"use client"

import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar.jsx"

const apiURL = process.env.REACT_APP_API_URL

// Iconos SVG
const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const PerfilModal = ({ usuario, onClose }) => {
  const [estadoRelacion, setEstadoRelacion] = useState("ninguna");
  // Puede ser: "ninguna", "pendiente", "siguiendo"
  const [usuarioActualData, setUsuarioActualData] = useState(null)
  const usuarioActual = localStorage.getItem("usuario")
  useEffect(() => {
    const cargarUsuarioActual = async () => {
      if (usuarioActual) {
        try {
          const response = await fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${usuarioActual}`)
          if (response.ok) {
            const userData = await response.json()
            setUsuarioActualData(userData)
          }
          // Verificar estado de relación
          const responseRelacion = await fetch(`${apiURL}/api/usuarios/relacion?usuario_id_e=${usuarioActual}&usuario_id_r=${usuario._id}`)
          if (responseRelacion.ok) {
            const relacionData = await responseRelacion.json()
            console.log("Estado de relación:", relacionData)
            if (relacionData) {
              setEstadoRelacion(relacionData.relacion);
            } else {
              setEstadoRelacion("ninguna");
            }
          }
        } catch (error) {
          console.error("Error cargando usuario actual:", error)
        }
      }
    }
    cargarUsuarioActual()
  }, [usuarioActual])

  const handleEnviarSolicitud = async () => {
    const response = await fetch(`${apiURL}/api/usuarios/seguir`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: usuarioActual,
        usuario_a_seguir_id: usuario._id,
      }),
    })
    if (response.ok) {
      if(usuario.publico === false) {
      setEstadoRelacion("pendiente");
      }
      else{
        setEstadoRelacion("siguiendo");
      }
    } else {
      const errorData = await response.json();
      console.error("Error al enviar solicitud:", errorData.error);
      alert(errorData.error || "Error al enviar solicitud");
    }
  };

  const handleCancelarSolicitud = async () => {
    const response = await fetch(`${apiURL}/api/usuarios/cancelar_solicitud`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: usuarioActual,
        destinatario_id: usuario._id,
      }),
    })
    if (response.ok) {
      setEstadoRelacion("ninguna");
    } else {
      const errorData = await response.json();
      console.error("Error al cancelar solicitud:", errorData.error);
      alert(errorData.error || "Error al cancelar solicitud");
    }
  };

  const handleDejarDeSeguir = async () => {
    const response = await fetch(`${apiURL}/api/usuarios/dejar_seguir`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: usuarioActual,
        usuario_a_dejar_id: usuario._id,
      }),
    })
    if (response.ok) {
      setEstadoRelacion("ninguna");
    } else {
      const errorData = await response.json();
      console.error("Error al cancelar solicitud:", errorData.error);
      alert(errorData.error || "Error al cancelar solicitud");
    }
  };
  if (!usuario) return null

  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-full w-full max-h-[90vh] overflow-y-auto">
      {/* Header del Modal */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={usuario.foto || "/placeholder.svg?height=80&width=80"}
              alt={`${usuario.nombre} ${usuario.apellidos}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=80&width=80";
              }}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {usuario.nombre} {usuario.apellidos}
              </h2>
              <p className="text-gray-600">{usuario.gmail}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-blue-600 font-medium">Nivel {usuario.nivel || 1}</span>
                <span className="text-sm text-gray-500">{usuario.etapas_completadas || 0} etapas completadas</span>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-600">
                  <strong>{usuario.seguidores?.length || 0}</strong> seguidores
                </span>
                <span className="text-sm text-gray-600">
                  <strong>{usuario.siguiendo?.length || 0}</strong> seguidos
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            {/* Botón dinámico de seguir */}
            {estadoRelacion === "siguiendo" && (
              <button
                onClick={handleDejarDeSeguir}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Siguiendo
              </button>
            )}

            {estadoRelacion === "pendiente" && (
              <button
                onClick={handleCancelarSolicitud}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Solicitud enviada
              </button>
            )}

            {estadoRelacion === "ninguna" && (
              <button
                onClick={handleEnviarSolicitud}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Seguir
              </button>
            )}

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas del Usuario */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{usuario.etapas_completadas || 0}</div>
            <div className="text-sm text-gray-600">Etapas</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{Math.round(usuario.distancia_recorrida || 0)} km</div>
            <div className="text-sm text-gray-600">Recorridos</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{usuario.caminos_iniciados || 0}</div>
            <div className="text-sm text-gray-600">Caminos</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{usuario.fotos_subidas || 0}</div>
            <div className="text-sm text-gray-600">Fotos</div>
          </div>
        </div>

        {/* Últimas Etapas del Usuario */}
        {usuario.ultimas_etapas && usuario.ultimas_etapas.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Últimas Etapas Completadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usuario.ultimas_etapas.slice(0, 4).map((etapa, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    {etapa.foto ? (
                      <img
                        src={etapa.foto || "/placeholder.svg"}
                        alt={etapa.nombre}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=48&width=48";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <RouteIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{etapa.nombre}</h4>
                      <p className="text-xs text-gray-600">{etapa.caminoNombre}</p>
                      <p className="text-xs text-gray-500">{new Date(etapa.fecha).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

const TrophyIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
)

const StarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const RouteIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const CameraIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const AwardIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
)

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

// Componente para la barra de progreso del nivel
const NivelProgressBar = ({ nivelActual }) => {
  const getNivelInfo = (nivel) => {
    const niveles = [
      { rango: [1, 9], nombre: "Principiante", color: "from-gray-400 to-gray-600", icono: "🚶‍♂️", siguiente: 10 },
      { rango: [10, 24], nombre: "Caminante", color: "from-green-400 to-green-600", icono: "🥾", siguiente: 25 },
      { rango: [25, 49], nombre: "Explorador", color: "from-blue-400 to-blue-600", icono: "🧭", siguiente: 50 },
      { rango: [50, 99], nombre: "Aventurero", color: "from-purple-400 to-purple-600", icono: "⛰️", siguiente: 100 },
      { rango: [100, Infinity], nombre: "Maestro Peregrino", color: "from-yellow-400 to-yellow-600", icono: "👑", siguiente: null },
    ];
    return niveles.find(n => nivel >= n.rango[0] && nivel <= n.rango[1]);
  };

  const nivelInfo = getNivelInfo(nivelActual);
  const siguienteNivel = nivelInfo.siguiente;
  const etapasRestantes = siguienteNivel ? Math.max(siguienteNivel - nivelActual, 0) : 0;
  const progresoHaciaSiguiente = siguienteNivel
    ? Math.min(((nivelActual - nivelInfo.rango[0]) / (nivelInfo.rango[1] - nivelInfo.rango[0] + 1)) * 100, 100)
    : 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{nivelInfo.icono}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Nivel {nivelActual}</h3>
            <p className="text-gray-600">{nivelInfo.nombre}</p>
          </div>
        </div>
        {siguienteNivel && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Para el siguiente rango</p>
            <p className="text-lg font-semibold text-gray-700">
              Te faltan {etapasRestantes} niveles
            </p>
          </div>
        )}
      </div>

      {siguienteNivel && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progreso al siguiente rango</span>
            <span>{Math.round(progresoHaciaSiguiente)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full bg-gradient-to-r ${nivelInfo.color} transition-all duration-500`}
              style={{ width: `${progresoHaciaSiguiente}%` }}
            ></div>
          </div>
        </div>
      )}

      {!siguienteNivel && (
        <div className="text-center py-2">
          <p className="text-lg font-semibold text-yellow-600">¡Nivel Máximo Alcanzado!</p>
          <p className="text-sm text-gray-600">Eres un verdadero Maestro Peregrino</p>
        </div>
      )}
    </div>
  );
};


// Componente para mostrar logros
const LogroCard = ({ logro, size = "normal" }) => {
  const cardSize = size === "small" ? "p-3" : "p-4"
  const iconSize = size === "small" ? "text-xl" : "text-2xl"
  const titleSize = size === "small" ? "text-sm" : "text-base"
  const descSize = size === "small" ? "text-xs" : "text-sm"

  return (
    <div
      className={`${cardSize} rounded-lg border-2 transition-all duration-200 ${
        logro.obtenido
          ? "border-green-200 bg-green-50 shadow-md hover:shadow-lg"
          : "border-gray-200 bg-gray-50 opacity-70 hover:opacity-90"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={iconSize}>{logro.icono}</div>
        <div className="flex-1">
          <h3 className={`font-semibold ${titleSize} ${logro.obtenido ? "text-gray-900" : "text-gray-500"}`}>
            {logro.nombre}
          </h3>
          <p className={`${descSize} ${logro.obtenido ? "text-gray-600" : "text-gray-400"}`}>{logro.descripcion}</p>
          {!logro.obtenido && logro.progreso && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progreso: {logro.progreso}</span>
                <span>{logro.porcentaje}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${logro.porcentaje}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        {logro.obtenido && (
          <div className="text-green-600">
            <AwardIcon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  )
}

function PerfilUsuario() {
  const [userData, setUserData] = useState(null)
  const [caminosData, setCaminosData] = useState([])
  const [logrosData, setLogrosData] = useState([])
  const [ultimasEtapas, setUltimasEtapas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mostrarTodosLogros, setMostrarTodosLogros] = useState(false)
  const [filtroLogros, setFiltroLogros] = useState("todos") // todos, completados, pendientes
  const [busquedaLogros, setBusquedaLogros] = useState("")
  const [etapaSeleccionada, setEtapaSeleccionada] = useState(null);
  const [mostrarModalEtapa, setMostrarModalEtapa] = useState(false);
  const [mostrarSeguidores, setMostrarSeguidores] = useState(false)
  const [mostrarSeguidos, setMostrarSeguidos] = useState(false)
  const [seguidoresList, setSeguidoresList] = useState([])
  const [seguidosList, setSeguidosList] = useState([])
  const [loadingSeguidores, setLoadingSeguidores] = useState(false)
  const [loadingSeguidos, setLoadingSeguidos] = useState(false)
  const [usuarioSeleccionadoModal, setUsuarioSeleccionadoModal] = useState(null)
  const [premium, setPremium] = useState(false)

  // Función para generar TODOS los logros disponibles
  const generarTodosLosLogros = (userData) => {
    const totalEtapas =
      userData.caminos?.reduce((total, camino) => total + (camino.etapas_completadas?.length || 0), 0) || 0
    const totalFotos =
      userData.caminos?.reduce(
        (total, camino) => total + (camino.etapas_completadas?.filter((etapa) => etapa.imagen).length || 0),
        0,
      ) || 0
    const caminosIniciados = userData.caminos?.length || 0
    const distanciaTotal = userData.distancia_recorrida || 0
    const seguidores = userData.seguidores?.length || 0
    const siguiendo = userData.siguiendo?.length || 0
    const premium = userData.premium || false

    // Calcular días activos (simulado - podrías calcularlo real con fechas)
    const diasActivos = Math.floor(totalEtapas * 1.5) // Simulación

    return [
      // LOGROS DE INICIO
      {
        id: "primer_paso",
        categoria: "Inicio",
        nombre: "Primer Paso",
        descripcion: "Completaste tu primera etapa",
        icono: "🚶‍♂️",
        color: "bg-green-100 text-green-800",
        obtenido: totalEtapas >= 1,
        progreso: totalEtapas >= 1 ? null : `${totalEtapas}/1`,
        porcentaje: totalEtapas >= 1 ? 100 : (totalEtapas / 1) * 100,
        rareza: "común",
      },
      {
        id: "primera_foto",
        categoria: "Fotografía",
        nombre: "Primera Instantánea",
        descripcion: "Subiste tu primera foto",
        icono: "📸",
        color: "bg-blue-100 text-blue-800",
        obtenido: totalFotos >= 1,
        progreso: totalFotos >= 1 ? null : `${totalFotos}/1`,
        porcentaje: totalFotos >= 1 ? 100 : (totalFotos / 1) * 100,
        rareza: "común",
      },
      {
        id: "primer_camino",
        categoria: "Caminos",
        nombre: "Nuevo Horizonte",
        descripcion: "Iniciaste tu primer camino",
        icono: "🛤️",
        color: "bg-yellow-100 text-yellow-800",
        obtenido: caminosIniciados >= 1,
        progreso: caminosIniciados >= 1 ? null : `${caminosIniciados}/1`,
        porcentaje: caminosIniciados >= 1 ? 100 : (caminosIniciados / 1) * 100,
        rareza: "común",
      },

      // LOGROS DE PROGRESO - ETAPAS
      {
        id: "caminante_novato",
        categoria: "Progreso",
        nombre: "Caminante Novato",
        descripcion: "Completaste 3 etapas",
        icono: "🥾",
        color: "bg-green-100 text-green-800",
        obtenido: totalEtapas >= 3,
        progreso: totalEtapas >= 3 ? null : `${totalEtapas}/3`,
        porcentaje: totalEtapas >= 3 ? 100 : (totalEtapas / 3) * 100,
        rareza: "común",
      },
      {
        id: "caminante_dedicado",
        categoria: "Progreso",
        nombre: "Caminante Dedicado",
        descripcion: "Completaste 5 etapas",
        icono: "🏃‍♂️",
        color: "bg-purple-100 text-purple-800",
        obtenido: totalEtapas >= 5,
        progreso: totalEtapas >= 5 ? null : `${totalEtapas}/5`,
        porcentaje: totalEtapas >= 5 ? 100 : (totalEtapas / 5) * 100,
        rareza: "común",
      },
      {
        id: "explorador",
        categoria: "Progreso",
        nombre: "Explorador",
        descripcion: "Completaste 10 etapas",
        icono: "🧭",
        color: "bg-indigo-100 text-indigo-800",
        obtenido: totalEtapas >= 10,
        progreso: totalEtapas >= 10 ? null : `${totalEtapas}/10`,
        porcentaje: totalEtapas >= 10 ? 100 : (totalEtapas / 10) * 100,
        rareza: "poco común",
      },
      {
        id: "aventurero",
        categoria: "Progreso",
        nombre: "Aventurero",
        descripcion: "Completaste 15 etapas",
        icono: "⛰️",
        color: "bg-red-100 text-red-800",
        obtenido: totalEtapas >= 15,
        progreso: totalEtapas >= 15 ? null : `${totalEtapas}/15`,
        porcentaje: totalEtapas >= 15 ? 100 : (totalEtapas / 15) * 100,
        rareza: "poco común",
      },
      {
        id: "veterano",
        categoria: "Progreso",
        nombre: "Veterano del Camino",
        descripcion: "Completaste 25 etapas",
        icono: "🎖️",
        color: "bg-orange-100 text-orange-800",
        obtenido: totalEtapas >= 25,
        progreso: totalEtapas >= 25 ? null : `${totalEtapas}/25`,
        porcentaje: totalEtapas >= 25 ? 100 : (totalEtapas / 25) * 100,
        rareza: "raro",
      },
      {
        id: "maestro_peregrino",
        categoria: "Progreso",
        nombre: "Maestro Peregrino",
        descripcion: "Completaste 50 etapas",
        icono: "👑",
        color: "bg-yellow-100 text-yellow-800",
        obtenido: totalEtapas >= 50,
        progreso: totalEtapas >= 50 ? null : `${totalEtapas}/50`,
        porcentaje: totalEtapas >= 50 ? 100 : (totalEtapas / 50) * 100,
        rareza: "épico",
      },

      // LOGROS DE DISTANCIA
      {
        id: "primeros_25km",
        categoria: "Distancia",
        nombre: "Primeros Pasos",
        descripcion: "Recorriste 25 kilómetros",
        icono: "🎯",
        color: "bg-green-100 text-green-800",
        obtenido: distanciaTotal >= 25,
        progreso: distanciaTotal >= 25 ? null : `${Math.round(distanciaTotal)}/25 km`,
        porcentaje: distanciaTotal >= 25 ? 100 : (distanciaTotal / 25) * 100,
        rareza: "común",
      },
      {
        id: "medio_centenar",
        categoria: "Distancia",
        nombre: "Medio Centenar",
        descripcion: "Recorriste 50 kilómetros",
        icono: "🏃‍♀️",
        color: "bg-blue-100 text-blue-800",
        obtenido: distanciaTotal >= 50,
        progreso: distanciaTotal >= 50 ? null : `${Math.round(distanciaTotal)}/50 km`,
        porcentaje: distanciaTotal >= 50 ? 100 : (distanciaTotal / 50) * 100,
        rareza: "común",
      },
      {
        id: "centurion",
        categoria: "Distancia",
        nombre: "Centurión",
        descripcion: "Recorriste 100 kilómetros",
        icono: "💯",
        color: "bg-red-100 text-red-800",
        obtenido: distanciaTotal >= 100,
        progreso: distanciaTotal >= 100 ? null : `${Math.round(distanciaTotal)}/100 km`,
        porcentaje: distanciaTotal >= 100 ? 100 : (distanciaTotal / 100) * 100,
        rareza: "poco común",
      },
      {
        id: "maratonista",
        categoria: "Distancia",
        nombre: "Maratonista",
        descripcion: "Recorriste 200 kilómetros",
        icono: "🏃‍♂️",
        color: "bg-purple-100 text-purple-800",
        obtenido: distanciaTotal >= 200,
        progreso: distanciaTotal >= 200 ? null : `${Math.round(distanciaTotal)}/200 km`,
        porcentaje: distanciaTotal >= 200 ? 100 : (distanciaTotal / 200) * 100,
        rareza: "raro",
      },
      {
        id: "ultra_caminante",
        categoria: "Distancia",
        nombre: "Ultra Caminante",
        descripcion: "Recorriste 500 kilómetros",
        icono: "🚀",
        color: "bg-indigo-100 text-indigo-800",
        obtenido: distanciaTotal >= 500,
        progreso: distanciaTotal >= 500 ? null : `${Math.round(distanciaTotal)}/500 km`,
        porcentaje: distanciaTotal >= 500 ? 100 : (distanciaTotal / 500) * 100,
        rareza: "épico",
      },
      {
        id: "leyenda_viviente",
        categoria: "Distancia",
        nombre: "Leyenda Viviente",
        descripcion: "Recorriste 1000 kilómetros",
        icono: "⚡",
        color: "bg-yellow-100 text-yellow-800",
        obtenido: distanciaTotal >= 1000,
        progreso: distanciaTotal >= 1000 ? null : `${Math.round(distanciaTotal)}/1000 km`,
        porcentaje: distanciaTotal >= 1000 ? 100 : (distanciaTotal / 1000) * 100,
        rareza: "legendario",
      },

      // LOGROS DE FOTOGRAFÍA
      {
        id: "fotografo_aficionado",
        categoria: "Fotografía",
        nombre: "Fotógrafo Aficionado",
        descripcion: "Subiste 5 fotos",
        icono: "📷",
        color: "bg-blue-100 text-blue-800",
        obtenido: totalFotos >= 5,
        progreso: totalFotos >= 5 ? null : `${totalFotos}/5`,
        porcentaje: totalFotos >= 5 ? 100 : (totalFotos / 5) * 100,
        rareza: "común",
      },
      {
        id: "coleccionista_momentos",
        categoria: "Fotografía",
        nombre: "Coleccionista de Momentos",
        descripcion: "Subiste 10 fotos",
        icono: "🎨",
        color: "bg-purple-100 text-purple-800",
        obtenido: totalFotos >= 10,
        progreso: totalFotos >= 10 ? null : `${totalFotos}/10`,
        porcentaje: totalFotos >= 10 ? 100 : (totalFotos / 10) * 100,
        rareza: "poco común",
      },
      {
        id: "fotografo_profesional",
        categoria: "Fotografía",
        nombre: "Fotógrafo Profesional",
        descripcion: "Subiste 25 fotos",
        icono: "📸",
        color: "bg-indigo-100 text-indigo-800",
        obtenido: totalFotos >= 25,
        progreso: totalFotos >= 25 ? null : `${totalFotos}/25`,
        porcentaje: totalFotos >= 25 ? 100 : (totalFotos / 25) * 100,
        rareza: "raro",
      },
      {
        id: "maestro_fotografia",
        categoria: "Fotografía",
        nombre: "Maestro de la Fotografía",
        descripcion: "Subiste 50 fotos",
        icono: "🏆",
        color: "bg-yellow-100 text-yellow-800",
        obtenido: totalFotos >= 50,
        progreso: totalFotos >= 50 ? null : `${totalFotos}/50`,
        porcentaje: totalFotos >= 50 ? 100 : (totalFotos / 50) * 100,
        rareza: "épico",
      },

      // LOGROS DE CAMINOS
      {
        id: "explorador_caminos",
        categoria: "Caminos",
        nombre: "Explorador de Caminos",
        descripcion: "Iniciaste 2 caminos diferentes",
        icono: "🗺️",
        color: "bg-green-100 text-green-800",
        obtenido: caminosIniciados >= 2,
        progreso: caminosIniciados >= 2 ? null : `${caminosIniciados}/2`,
        porcentaje: caminosIniciados >= 2 ? 100 : (caminosIniciados / 2) * 100,
        rareza: "poco común",
      },
      {
        id: "coleccionista_rutas",
        categoria: "Caminos",
        nombre: "Coleccionista de Rutas",
        descripcion: "Iniciaste 3 caminos diferentes",
        icono: "🧭",
        color: "bg-blue-100 text-blue-800",
        obtenido: caminosIniciados >= 3,
        progreso: caminosIniciados >= 3 ? null : `${caminosIniciados}/3`,
        porcentaje: caminosIniciados >= 3 ? 100 : (caminosIniciados / 3) * 100,
        rareza: "raro",
      },
      {
        id: "primeros seguidores",
        categoria: "Social",
        nombre: "Primeros Seguidores",
        descripcion: "Conseguiste tus primeros 5 seguidores",
        icono: "🤝",
        color: "bg-blue-100 text-blue-800",
        obtenido: seguidores >= 5,
        progreso: seguidores >= 5 ? null : `${seguidores}/5`,
        porcentaje: seguidores >= 5 ? 100 : (seguidores / 5) * 100,
        rareza: "raro",
      },
      {
        id: "influencer_local",
        categoria: "Social",
        nombre: "Influencer Local",
        descripcion: "Has conseguido 25 seguidores",
        icono: "📣",
        color: "bg-green-100 text-green-800",
        obtenido: seguidores >= 25,
        progreso: seguidores >= 25 ? null : `${seguidores}/25`,
        porcentaje: seguidores >= 25 ? 100 : (seguidores / 25) * 100,
        rareza: "epico",
      },
      {
        id: "estrella_social",
        categoria: "Social",
        nombre: "Estrella Social",
        descripcion: "Llegaste a 100 seguidores",
        icono: "🏅",
        color: "bg-purple-100 text-purple-800",
        obtenido: seguidores >= 100,
        progreso: seguidores >= 100 ? null : `${seguidores}/100`,
        porcentaje: seguidores >= 100 ? 100 : (seguidores / 100) * 100,
        rareza: "legendario",
      },
      {
        id: "primeros seguidos",
        categoria: "Social",
        nombre: "Curioso del Camino",
        descripcion: "Comenzaste a seguir a 5 personas",
        icono: "👀",
        color: "bg-yellow-100 text-yellow-800",
        obtenido: siguiendo >= 5,
        progreso: siguiendo >= 5 ? null : `${siguiendo}/5`,
        porcentaje: siguiendo >= 5 ? 100 : (siguiendo / 5) * 100,
        rareza: "comun",
      },
      {
        id: "explorador_social",
        categoria: "Social",
        nombre: "Explorador Social",
        descripcion: "Estás siguiendo a 25 personas",
        icono: "🧭",
        color: "bg-pink-100 text-pink-800",
        obtenido: siguiendo >= 25,
        progreso: siguiendo >= 25 ? null : `${siguiendo}/25`,
        porcentaje: siguiendo >= 25 ? 100 : (siguiendo / 25) * 100,
        rareza: "raro",
      },
      {
        id: "coleccionista_de_perfiles",
        categoria: "Social",
        nombre: "Coleccionista de Perfiles",
        descripcion: "Sigues a 100 personas",
        icono: "📌",
        color: "bg-indigo-100 text-indigo-800",
        obtenido: siguiendo >= 100,
        progreso: siguiendo >= 100 ? null : `${siguiendo}/100`,
        porcentaje: siguiendo >= 100 ? 100 : (siguiendo / 100) * 100,
        rareza: "epico",
      },
      {
        id: "premium_usuario",
        categoria: "Suscripción",
        nombre: "🌟 Usuario Premium 🌟",
        descripcion: "¡Felicidades! Has activado la suscripción Premium.",
        icono: premium === true ? "💎" : "⏳",  // 💎 si es premium, ⏳ si no
        color: premium === true ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600",
        obtenido: premium === true,
        progreso: premium === true ? "1/1" : "0/1",
        porcentaje: premium === true ? 100 : 0,
        rareza: "legendario",
      },
    ]
  }

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const usuarioId = localStorage.getItem("usuario")
        if (!usuarioId) {
          throw new Error("No se encontró el usuario")
        }

        // Cargar datos del usuario
        const usuarioResponse = await fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${usuarioId}`)
        if (!usuarioResponse.ok) throw new Error("Error al cargar datos del usuario")

        const usuario = await usuarioResponse.json()
        console.log("Datos del usuario:", usuario)
        const etapasRecientes = []

        if (usuario.caminos && Array.isArray(usuario.caminos)) {
          for (const camino of usuario.caminos) {
            const Caminoresponse = await fetch(
              `${apiURL}/api/caminos/get_camino?camino_id=${camino.id_camino}`,
            )
            if (!Caminoresponse.ok) {
              console.warn(`No se pudo cargar el camino ${camino.id_camino}`)
              continue
            }

            const caminoData = await Caminoresponse.json()

            if (camino.etapas_completadas && Array.isArray(camino.etapas_completadas)) {
              camino.etapas_completadas.forEach((etapa) => {
                etapasRecientes.push({
                  id: `${camino.id_camino}_${etapa.id_etapa}`,
                  nombre: caminoData.etapas[etapa.id_etapa - 1].nombre || "Nombre no disponible",
                  caminoNombre: caminoData.nombre || "Camino desconocido",
                  distancia: caminoData.etapas[etapa.id_etapa - 1].distancia_km || 0,
                  fecha: etapa.fecha,
                  foto: etapa.imagen || null,
                })
              })
            }
          }
        }

        etapasRecientes.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

        setUserData(usuario)
        setPremium(usuario.premium || false)
        setCaminosData(usuario.caminos)
        setUltimasEtapas(etapasRecientes)
        setLoading(false)
      } catch (err) {
        console.error("Error cargando perfil:", err)
        setError(err.message)
        setLoading(false)
      }
    }


    cargarDatosUsuario()
  }, [])

  const cargarSeguidores = async () => {
      if (!userData?.seguidores || userData.seguidores.length === 0) {
        setSeguidoresList([])
        return
      }

      setLoadingSeguidores(true)
      try {
        const seguidoresData = []
        for (const seguidorId of userData.seguidores) {
          const id = seguidorId.$oid || seguidorId
          const response = await fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${id}`)
          if (response.ok) {
            const seguidorData = await response.json()
            // Calcular estadísticas
            const etapasCompletadas =
              seguidorData.caminos?.reduce((total, camino) => total + (camino.etapas_completadas?.length || 0), 0) || 0
            const fotosSubidas =
              seguidorData.caminos?.reduce(
                (total, camino) =>
                  total + (camino.etapas_completadas?.filter((etapa) => etapa.imagen || etapa.url_foto).length || 0),
                0,
              ) || 0

            seguidoresData.push({
              ...seguidorData,
              etapas_completadas: etapasCompletadas,
              fotos_subidas: fotosSubidas,
              caminos_iniciados: seguidorData.caminos?.length || 0,
              distancia_recorrida:
                seguidorData.distancia_recorrida?.$numberDouble || seguidorData.distancia_recorrida || 0,
              nivel: seguidorData.nivel?.$numberInt || seguidorData.nivel || 1,
            })
          }
        }
        setSeguidoresList(seguidoresData)
      } catch (error) {
        console.error("Error cargando seguidores:", error)
      } finally {
        setLoadingSeguidores(false)
      }
    }

    // Función para cargar lista de seguidos
    const cargarSeguidos = async () => {
      if (!userData?.siguiendo || userData.siguiendo.length === 0) {
        setSeguidosList([])
        return
      }

      setLoadingSeguidos(true)
      try {
        const seguidosData = []
        for (const seguidoId of userData.siguiendo) {
          const id = seguidoId.$oid || seguidoId
          const response = await fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${id}`)
          if (response.ok) {
            const seguidoData = await response.json()
            // Calcular estadísticas
            const etapasCompletadas =
              seguidoData.caminos?.reduce((total, camino) => total + (camino.etapas_completadas?.length || 0), 0) || 0
            const fotosSubidas =
              seguidoData.caminos?.reduce(
                (total, camino) =>
                  total + (camino.etapas_completadas?.filter((etapa) => etapa.imagen || etapa.url_foto).length || 0),
                0,
              ) || 0

            seguidosData.push({
              ...seguidoData,
              etapas_completadas: etapasCompletadas,
              fotos_subidas: fotosSubidas,
              caminos_iniciados: seguidoData.caminos?.length || 0,
              distancia_recorrida:
                seguidoData.distancia_recorrida?.$numberDouble || seguidoData.distancia_recorrida || 0,
              nivel: seguidoData.nivel?.$numberInt || seguidoData.nivel || 1,
            })
          }
        }
        setSeguidosList(seguidosData)
      } catch (error) {
        console.error("Error cargando seguidos:", error)
      } finally {
        setLoadingSeguidos(false)
      }
    }

   // Función para manejar click en seguidores
    const handleSeguidoresClick = () => {
      setMostrarSeguidores(true)
      cargarSeguidores()
    }

    // Función para manejar click en seguidos
    const handleSeguidosClick = () => {
      setMostrarSeguidos(true)
      cargarSeguidos()
    }

    // Función para manejar click en usuario de la lista
    const handleUsuarioModalClick = async (usuario) => {
      try {
        // Cargar datos completos del usuario si es necesario
        const usuarioId = usuario._id?.$oid || usuario._id
        const response = await fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${usuarioId}`)
        if (response.ok) {
          const usuarioCompleto = await response.json()

          // Obtener últimas etapas
          const ultimasEtapas = []
          if (usuarioCompleto.caminos && Array.isArray(usuarioCompleto.caminos)) {
            for (const camino of usuarioCompleto.caminos) {
              try {
                const caminoId = camino.id_camino.$oid || camino.id_camino
                const caminoResponse = await fetch(`${apiURL}/api/caminos/get_camino?camino_id=${caminoId}`)
                if (caminoResponse.ok) {
                  const caminoData = await caminoResponse.json()
                  if (camino.etapas_completadas && Array.isArray(camino.etapas_completadas)) {
                    camino.etapas_completadas.forEach((etapa) => {
                      const etapaId = etapa.id_etapa.$numberInt || etapa.id_etapa
                      const etapaInfo = caminoData.etapas?.find((e) => {
                        const eId = e._id.$numberInt || e._id
                        return eId === etapaId
                      })
                      if (etapaInfo) {
                        ultimasEtapas.push({
                          nombre: etapaInfo.nombre || "Etapa desconocida",
                          caminoNombre: caminoData.nombre || "Camino desconocido",
                          foto: etapa.imagen || etapa.url_foto || null,
                          fecha: etapa.fecha,
                        })
                      }
                    })
                  }
                }
              } catch (error) {
                console.warn(`Error cargando camino ${camino.id_camino}:`, error)
              }
            }
          }

          // Ordenar por fecha y tomar las últimas 4
          ultimasEtapas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

          const usuarioConDatos = {
            ...usuarioCompleto,
            etapas_completadas: usuario.etapas_completadas,
            fotos_subidas: usuario.fotos_subidas,
            caminos_iniciados: usuario.caminos_iniciados,
            distancia_recorrida: usuario.distancia_recorrida,
            nivel: usuario.nivel,
            ultimas_etapas: ultimasEtapas.slice(0, 4),
          }

          setUsuarioSeleccionadoModal(usuarioConDatos)
        }
      } catch (error) {
        console.error("Error al cargar perfil del usuario:", error)
        alert("Error al cargar el perfil del usuario")
      }
    }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4">
          <LoadingSpinner />
          <p className="text-center text-gray-600 mt-4">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-xl mb-2">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar el perfil</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Calcular estadísticas
  const totalEtapas =
    userData?.caminos?.reduce((total, camino) => total + (camino.etapas_completadas?.length || 0), 0) || 0
  const totalFotos =
    userData?.caminos?.reduce(
      (total, camino) => total + (camino.etapas_completadas?.filter((etapa) => etapa.imagen).length || 0),
      0,
    ) || 0
  const caminosIniciados = userData?.caminos?.length || 0
  const distanciaTotal = Math.round(userData?.distancia_recorrida || 0)

  const todosLosLogros = generarTodosLosLogros(userData || {})
  const logrosCompletados = todosLosLogros.filter((logro) => logro.obtenido)
  const logrosPendientes = todosLosLogros.filter((logro) => !logro.obtenido)

  // Mostrar solo algunos logros inicialmente
  const logrosParaMostrar = mostrarTodosLogros
    ? todosLosLogros
    : logrosCompletados.slice(0, 4).concat(logrosPendientes.slice(0, 2))

  // Filtrar logros según búsqueda y filtro
  const logrosFiltrados = todosLosLogros.filter((logro) => {
    const coincideBusqueda =
      logro.nombre.toLowerCase().includes(busquedaLogros.toLowerCase()) ||
      logro.descripcion.toLowerCase().includes(busquedaLogros.toLowerCase())

    if (filtroLogros === "completados") return logro.obtenido && coincideBusqueda
    if (filtroLogros === "pendientes") return !logro.obtenido && coincideBusqueda
    return coincideBusqueda
  })

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header del Perfil */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Foto de Perfil */}
              <div className="flex-shrink-0">
                <img
                  src={userData?.foto || "/placeholder.svg?height=150&width=150"}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=150&width=150"
                  }}
                />
              </div>

              {/* Información del Usuario */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <h1 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
                    {userData?.nombre} {userData?.apellidos}
                  </h1>
                  {premium && (
                    <span className="mt-2 sm:mt-0 mx-auto sm:mx-0 inline-flex items-center gap-1 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                      <span className="text-base">💎</span> Premium
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{userData?.gmail}</p>

                {/* Estadísticas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{totalEtapas}</div>
                    <div className="text-sm text-gray-600">Etapas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{distanciaTotal} km</div>
                    <div className="text-sm text-gray-600">Recorridos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{caminosIniciados}</div>
                    <div className="text-sm text-gray-600">Caminos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{totalFotos}</div>
                    <div className="text-sm text-gray-600">Fotos</div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleSeguidoresClick}
                      className="text-center hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer"
                    >
                      <div className="text-2xl font-bold text-indigo-600">{userData?.seguidores?.length || 0}</div>
                      <div className="text-sm text-gray-600">Seguidores</div>
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleSeguidosClick}
                      className="text-center hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer"
                    >
                      <div className="text-2xl font-bold text-pink-600">{userData?.siguiendo?.length || 0}</div>
                      <div className="text-sm text-gray-600">Seguidos</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Nivel y Logros */}
            <div className="lg:col-span-2 space-y-8">
              {/* Nivel Mejorado */}
              <NivelProgressBar nivelActual={userData?.nivel || 1} totalEtapas={totalEtapas} />

              {/* Logros */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <TrophyIcon className="w-6 h-6 text-yellow-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Logros ({logrosCompletados.length}/{todosLosLogros.length})
                    </h2>
                  </div>
                  <button
                    onClick={() => setMostrarTodosLogros(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Explorar Logros
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {logrosParaMostrar.map((logro) => (
                    <LogroCard key={logro.id} logro={logro} />
                  ))}
                </div>

                {/* Logros de la BD */}
                {logrosData.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Logros Especiales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {logrosData.map((logro) => (
                        <div key={logro._id} className="p-4 rounded-lg border-2 border-yellow-200 bg-yellow-50">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">🏆</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{logro.nombre}</h3>
                              <p className="text-sm text-gray-600">{logro.descripcion}</p>
                            </div>
                            <div className="text-yellow-600">
                              <TrophyIcon className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Estadísticas Detalladas */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Estadísticas</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RouteIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Etapas Completadas</span>
                    </div>
                    <span className="font-semibold text-blue-600">{totalEtapas}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Distancia Total</span>
                    </div>
                    <span className="font-semibold text-green-600">{distanciaTotal} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrophyIcon className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">Caminos Iniciados</span>
                    </div>
                    <span className="font-semibold text-purple-600">{caminosIniciados}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CameraIcon className="w-5 h-5 text-yellow-600" />
                      <span className="text-gray-700">Fotos Subidas</span>
                    </div>
                    <span className="font-semibold text-yellow-600">{totalFotos}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="w-5 h-5 text-indigo-600" />
                      <span className="text-gray-700">Nivel Actual</span>
                    </div>
                    <span className="font-semibold text-indigo-600">{userData?.nivel || 1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AwardIcon className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Logros Obtenidos</span>
                    </div>
                    <span className="font-semibold text-orange-600">{logrosCompletados.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Últimas Etapas Completadas */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex-shrink-0">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Etapas Completadas</h2>
            </div>

            {ultimasEtapas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ultimasEtapas.map((etapa, index) => (
                  <div
                    key={`${etapa.id}-${index}`}
                    onClick={() => {
                      setEtapaSeleccionada(etapa);
                      setMostrarModalEtapa(true);
                    }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      {etapa.foto ? (
                        <img
                          src={etapa.foto || "/placeholder.svg"}
                          alt={etapa.nombre}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=64&width=64"
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <CameraIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{etapa.nombre}</h3>
                        <p className="text-xs text-gray-600 mb-1">{etapa.caminoNombre}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{etapa.distancia} km</span>
                          <span>•</span>
                          <span>{new Date(etapa.fecha).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-2">🚶‍♂️</div>
                <p className="text-gray-600">Aún no has completado ninguna etapa</p>
                <p className="text-gray-500 text-sm">¡Comienza tu aventura en el Camino de Santiago!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Todos los Logros */}
      {mostrarTodosLogros && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl min-h-[80vh] max-h-[90vh] flex flex-col">
            {/* Header del Modal - Fijo */}
            <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white rounded-t-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <TrophyIcon className="w-8 h-8 text-yellow-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Todos los Logros</h2>
                    <p className="text-gray-600">
                      {logrosCompletados.length} de {todosLosLogros.length} completados (
                      {Math.round((logrosCompletados.length / todosLosLogros.length) * 100)}%)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMostrarTodosLogros(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Filtros y Búsqueda */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Buscar logros..."
                      value={busquedaLogros}
                      onChange={(e) => setBusquedaLogros(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFiltroLogros("todos")}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      filtroLogros === "todos"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFiltroLogros("completados")}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      filtroLogros === "completados"
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Completados ({logrosCompletados.length})
                  </button>
                  <button
                    onClick={() => setFiltroLogros("pendientes")}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      filtroLogros === "pendientes"
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pendientes ({logrosPendientes.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Contenido del Modal - Scrolleable */}
            <div className="flex-1 overflow-y-auto p-6">
              {logrosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {logrosFiltrados.map((logro) => (
                    <LogroCard key={logro.id} logro={logro} size="small" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron logros</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    {busquedaLogros
                      ? `No hay logros que coincidan con "${busquedaLogros}"`
                      : "Intenta con otros términos de búsqueda"}
                  </p>
                  {busquedaLogros && (
                    <button
                      onClick={() => setBusquedaLogros("")}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Modal de Seguidores */}
      {mostrarSeguidores && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Seguidores ({userData?.seguidores?.length || 0})</h2>
                <button
                  onClick={() => setMostrarSeguidores(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {loadingSeguidores ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="text-center text-gray-600 mt-4 ml-4">Cargando seguidores...</p>
                </div>
              ) : seguidoresList.length > 0 ? (
                <div className="space-y-4">
                  {seguidoresList.map((seguidor) => (
                    <div
                      key={seguidor._id?.$oid || seguidor._id}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => handleUsuarioModalClick(seguidor)}
                    >
                      <img
                        src={seguidor.foto || "/placeholder.svg?height=48&width=48"}
                        alt={`${seguidor.nombre} ${seguidor.apellidos}`}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=48&width=48"
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {seguidor.nombre} {seguidor.apellidos}
                        </h3>
                        <p className="text-sm text-gray-600">{seguidor.gmail}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-blue-600 font-medium">Nivel {seguidor.nivel}</span>
                          <span className="text-xs text-gray-500">{seguidor.etapas_completadas} etapas</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {Math.round(seguidor.distancia_recorrida)} km
                        </div>
                        <div className="text-xs text-gray-500">{seguidor.caminos_iniciados} caminos</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin seguidores</h3>
                  <p className="text-gray-600">Aún no tienes seguidores</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Seguidos */}
      {mostrarSeguidos && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Seguidos ({userData?.siguiendo?.length || 0})</h2>
                <button
                  onClick={() => setMostrarSeguidos(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {loadingSeguidos ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="text-center text-gray-600 mt-4 ml-4">Cargando seguidos...</p>
                </div>
              ) : seguidosList.length > 0 ? (
                <div className="space-y-4">
                  {seguidosList.map((seguido) => (
                    <div
                      key={seguido._id?.$oid || seguido._id}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => handleUsuarioModalClick(seguido)}
                    >
                      <img
                        src={seguido.foto || "/placeholder.svg?height=48&width=48"}
                        alt={`${seguido.nombre} ${seguido.apellidos}`}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=48&width=48"
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {seguido.nombre} {seguido.apellidos}
                        </h3>
                        <p className="text-sm text-gray-600">{seguido.gmail}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-blue-600 font-medium">Nivel {seguido.nivel}</span>
                          <span className="text-xs text-gray-500">{seguido.etapas_completadas} etapas</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {Math.round(seguido.distancia_recorrida)} km
                        </div>
                        <div className="text-xs text-gray-500">{seguido.caminos_iniciados} caminos</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin seguidos</h3>
                  <p className="text-gray-600">Aún no sigues a nadie</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Perfil Modal */}
      {usuarioSeleccionadoModal && (
        <PerfilModal usuario={usuarioSeleccionadoModal} onClose={() => setUsuarioSeleccionadoModal(null)} />
      )}

      {/* Modal de Etapa Detallada */}
      {mostrarModalEtapa && etapaSeleccionada && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto relative">
          {/* Botón cerrar */}
          <button
            onClick={() => setMostrarModalEtapa(false)}
            className="absolute top-2.5 right-2.5 text-gray-500 hover:text-gray-800 text-xl"
            aria-label="Cerrar modal"
          >
            ✕
          </button>

          {/* Contenido del modal */}
          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">
              {etapaSeleccionada.nombre}
            </h2>

            {/* Imagen de la etapa */}
            <img
              src={etapaSeleccionada.foto}
              alt={etapaSeleccionada.nombre}
              className="w-full h-auto rounded-lg object-contain max-h-[40vh] mb-3"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />

            {/* Info */}
            <div className="text-center">
              <p className="text-gray-700 font-medium mb-1">
                {etapaSeleccionada.caminoNombre}
              </p>
              <p className="text-sm text-gray-500">
                {etapaSeleccionada.distancia} km •{" "}
                {new Date(etapaSeleccionada.fecha).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    )}

    </div>
  )
}

export default PerfilUsuario
