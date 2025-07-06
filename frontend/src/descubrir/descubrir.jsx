"use client"

import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar.jsx"

// Iconos SVG
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

const RouteIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

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

const HeartIcon = ({ className = "w-5 h-5", filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const MessageCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const ShareIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
    />
  </svg>
)

const FilterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
    />
  </svg>
)

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const TrendingUpIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

// Componente para mostrar el perfil del usuario en modal
const PerfilModal = ({ usuario, onClose }) => {
  if (!usuario) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={usuario.foto || "/placeholder.svg?height=80&width=80"}
                alt={`${usuario.nombre} ${usuario.apellidos}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=80&width=80"
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
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
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
                            e.target.src = "/placeholder.svg?height=48&width=48"
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
  )
}

// Componente para cada post de etapa
const EtapaPost = ({ etapa, onUsuarioClick }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(etapa.likes || 0)
  const [showImageModal, setShowImageModal] = useState(false)

  // Simular likes persistentes basados en el ID de la etapa
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}")
    if (likedPosts[etapa.id]) {
      setLiked(true)
    }

    // Generar likes consistentes basados en el hash del ID
    const hashCode = etapa.id.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    const consistentLikes = Math.abs(hashCode % 30) + 5 // Entre 5 y 35 likes
    setLikes(consistentLikes + (likedPosts[etapa.id] ? 1 : 0))
  }, [etapa.id])

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}")

    if (liked) {
      // Quitar like
      delete likedPosts[etapa.id]
      setLikes((prev) => prev - 1)
    } else {
      // Agregar like
      likedPosts[etapa.id] = true
      setLikes((prev) => prev + 1)
    }

    localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
    setLiked(!liked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${etapa.usuario_nombre} completó ${etapa.nombre_etapa}`,
        text: `¡Mira esta etapa del Camino de Santiago!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  const openGoogleMaps = () => {
    if (etapa.lat && etapa.lon) {
      const url = `https://www.google.com/maps?q=${etapa.lat},${etapa.lon}`
      window.open(url, "_blank")
    }
  }

  const formatCoordinate = (coord, type) => {
    const abs = Math.abs(coord)
    const degrees = Math.floor(abs)
    const minutes = Math.floor((abs - degrees) * 60)
    const seconds = Math.round(((abs - degrees) * 60 - minutes) * 60)
    const direction = type === "lat" ? (coord >= 0 ? "N" : "S") : coord >= 0 ? "E" : "W"
    return `${degrees}°${minutes}'${seconds}"${direction}`
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onUsuarioClick(etapa.usuario_id)}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            >
              <img
                src={etapa.usuario_foto || "/placeholder.svg?height=40&width=40"}
                alt={etapa.usuario_nombre}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=40&width=40"
                }}
              />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {etapa.usuario_nombre} {etapa.usuario_apellidos}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    {new Date(etapa.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>Nivel {etapa.usuario_nivel || 1}</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Imagen mejorada */}
        {etapa.imagen && (
          <div className="relative">
            <div className="aspect-w-16 aspect-h-10 bg-gray-100">
              <img
                src={etapa.imagen || "/placeholder.svg"}
                alt={etapa.nombre_etapa}
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setShowImageModal(true)}
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=400&width=600"
                }}
                style={{ aspectRatio: "16/10", maxHeight: "400px" }}
              />
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium shadow backdrop-blur-sm">
                {etapa.distancia_km} km
              </span>
            </div>
            {/* Indicador de que se puede ampliar */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-black/50 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Contenido */}
        <div className="p-4">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{etapa.nombre_etapa}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <RouteIcon className="w-4 h-4" />
              <span>{etapa.nombre_camino}</span>
            </div>
          </div>

          {etapa.descripcion && <p className="text-gray-700 text-sm mb-3 line-clamp-3">{etapa.descripcion}</p>}

          {/* Ubicación mejorada */}
          {etapa.lat && etapa.lon && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Ubicación de la foto</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>
                      Lat: {formatCoordinate(etapa.lat, "lat")} ({etapa.lat.toFixed(6)})
                    </div>
                    <div>
                      Lng: {formatCoordinate(etapa.lon, "lng")} ({etapa.lon.toFixed(6)})
                    </div>
                  </div>
                </div>
                <button
                  onClick={openGoogleMaps}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span>Ver en mapa</span>
                </button>
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                  liked
                    ? "bg-red-100 text-red-600 hover:bg-red-200 scale-105"
                    : "text-gray-600 hover:bg-gray-100 hover:text-red-500"
                }`}
              >
                <HeartIcon
                  className={`w-5 h-5 transition-all duration-200 ${
                    liked ? "fill-red-500 text-red-500 scale-110" : ""
                  }`}
                />
                <span className="text-sm font-medium">{likes}</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <MessageCircleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Comentar</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <ShareIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Compartir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal para imagen completa */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors z-10"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
            <img
              src={etapa.imagen || "/placeholder.svg"}
              alt={etapa.nombre_etapa}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-1">{etapa.nombre_etapa}</h3>
              <p className="text-sm opacity-90">{etapa.nombre_camino}</p>
              <p className="text-xs opacity-75 mt-2">
                Por {etapa.usuario_nombre} {etapa.usuario_apellidos} •{" "}
                {new Date(etapa.fecha).toLocaleDateString("es-ES")}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


function DescubrirSocial() {
  const [etapas, setEtapas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroTiempo, setFiltroTiempo] = useState("recientes") // recientes, semana, mes
  const [filtroCamino, setFiltroCamino] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [caminos, setCaminos] = useState([])

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true)

        // Primero obtenemos todos los usuarios
        const usuariosResponse = await fetch("http://localhost:5000/api/usuarios/get_usuarios")
        if (!usuariosResponse.ok) {
          throw new Error("Error al cargar usuarios")
        }

        const usuarios = await usuariosResponse.json()
        console.log("Usuarios obtenidos:", usuarios)

        const etapasFormateadas = []
        const caminosSet = new Set()

        // Para cada usuario, obtenemos sus datos completos y etapas
        for (const usuario of usuarios) {
          try {
            // Si el usuario tiene caminos con etapas completadas
            if (usuario.caminos && Array.isArray(usuario.caminos)) {
              for (const camino of usuario.caminos) {
                try {
                  // Obtener datos del camino usando el ObjectId
                  const caminoId = camino.id_camino.$oid || camino.id_camino
                  const caminoResponse = await fetch(
                    `http://localhost:5000/api/caminos/get_camino?camino_id=${caminoId}`,
                  )
                  if (!caminoResponse.ok) continue

                  const caminoData = await caminoResponse.json()
                  caminosSet.add(caminoData.nombre)

                  // Procesar etapas completadas
                  if (camino.etapas_completadas && Array.isArray(camino.etapas_completadas)) {
                    camino.etapas_completadas.forEach((etapaCompletada) => {
                      // Buscar información de la etapa en el camino
                      // Los IDs de etapas son números enteros
                      const etapaId = etapaCompletada.id_etapa.$numberInt || etapaCompletada.id_etapa
                      const etapaInfo = caminoData.etapas?.find((e) => {
                        const eId = e._id.$numberInt || e._id
                        return eId === etapaId
                      })

                      if (!etapaInfo) {
                        console.warn(`No se encontró etapa con ID ${etapaId} en camino ${caminoData.nombre}`)
                        return
                      }

                      etapasFormateadas.push({
                        id: `${usuario._id.$oid || usuario._id}_${caminoId}_${etapaId}_${etapaCompletada.fecha}`,
                        usuario_id: usuario._id.$oid || usuario._id,
                        usuario_nombre: usuario.nombre || "Usuario",
                        usuario_apellidos: usuario.apellidos || "",
                        usuario_nivel: usuario.nivel.$numberInt || usuario.nivel || 1,
                        usuario_foto: usuario.foto || "/placeholder.svg?height=40&width=40",
                        nombre_etapa: etapaInfo.nombre || "Etapa desconocida",
                        nombre_camino: caminoData.nombre || "Camino desconocido",
                        distancia_km: etapaInfo.distancia_km.$numberDouble || etapaInfo.distancia_km || 0,
                        descripcion: etapaInfo.descripcion || "",
                        imagen: etapaCompletada.imagen || etapaCompletada.url_foto || null,
                        fecha: etapaCompletada.fecha,
                        lat: etapaCompletada.lat?.$numberDouble || etapaCompletada.lat || null,
                        lon: etapaCompletada.lon?.$numberDouble || etapaCompletada.lon || null,
                        likes: Math.floor(Math.random() * 25) + 1, // Simulado por ahora
                        // Datos adicionales para el modal del usuario
                        etapas_completadas:
                          usuario.caminos?.reduce((total, c) => total + (c.etapas_completadas?.length || 0), 0) || 0,
                        distancia_recorrida:
                          usuario.distancia_recorrida?.$numberDouble || usuario.distancia_recorrida || 0,
                        caminos_iniciados: usuario.caminos?.length || 0,
                        fotos_subidas:
                          usuario.caminos?.reduce(
                            (total, c) =>
                              total + (c.etapas_completadas?.filter((e) => e.imagen || e.url_foto).length || 0),
                            0,
                          ) || 0,
                        gmail: usuario.gmail || "",
                      })
                    })
                  }
                } catch (caminoError) {
                  console.warn(`Error procesando camino ${camino.id_camino}:`, caminoError)
                }
              }
            }
          } catch (usuarioError) {
            console.warn(`Error procesando usuario ${usuario._id}:`, usuarioError)
          }
        }

        // Ordenar por fecha más reciente
        etapasFormateadas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

        console.log("Etapas formateadas:", etapasFormateadas)
        setEtapas(etapasFormateadas)
        setCaminos([...caminosSet].filter(Boolean))
        setLoading(false)
      } catch (err) {
        console.error("Error cargando datos:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    cargarDatos()
  }, [])

  const handleUsuarioClick = async (usuarioId) => {
    try {
      // Cargar datos completos del usuario
      const usuarioResponse = await fetch(`http://localhost:5000/api/usuarios/get_usuario?usuario_id=${usuarioId}`)
      if (!usuarioResponse.ok) {
        throw new Error("Error al cargar datos del usuario")
      }

      const usuarioData = await usuarioResponse.json()

      // Calcular estadísticas
      const etapasCompletadas =
        usuarioData.caminos?.reduce((total, camino) => total + (camino.etapas_completadas?.length || 0), 0) || 0

      const fotosSubidas =
        usuarioData.caminos?.reduce(
          (total, camino) =>
            total + (camino.etapas_completadas?.filter((etapa) => etapa.imagen || etapa.url_foto).length || 0),
          0,
        ) || 0

      // Obtener últimas etapas
      const ultimasEtapas = []
      if (usuarioData.caminos && Array.isArray(usuarioData.caminos)) {
        for (const camino of usuarioData.caminos) {
          try {
            const caminoId = camino.id_camino.$oid || camino.id_camino
            const caminoResponse = await fetch(`http://localhost:5000/api/caminos/get_camino?camino_id=${caminoId}`)
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

      const usuarioCompleto = {
        ...usuarioData,
        etapas_completadas: etapasCompletadas,
        fotos_subidas: fotosSubidas,
        caminos_iniciados: usuarioData.caminos?.length || 0,
        distancia_recorrida: usuarioData.distancia_recorrida?.$numberDouble || usuarioData.distancia_recorrida || 0,
        nivel: usuarioData.nivel?.$numberInt || usuarioData.nivel || 1,
        ultimas_etapas: ultimasEtapas.slice(0, 4),
      }

      setUsuarioSeleccionado(usuarioCompleto)
    } catch (error) {
      console.error("Error al cargar perfil del usuario:", error)
      alert("Error al cargar el perfil del usuario")
    }
  }

  // Filtrar etapas
  const etapasFiltradas = etapas.filter((etapa) => {
    const coincideBusqueda =
      etapa.nombre_etapa.toLowerCase().includes(busqueda.toLowerCase()) ||
      etapa.usuario_nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      etapa.nombre_camino.toLowerCase().includes(busqueda.toLowerCase())

    const coincideCamino = filtroCamino === "todos" || etapa.nombre_camino === filtroCamino

    const fechaEtapa = new Date(etapa.fecha)
    const ahora = new Date()
    let coincideTiempo = true

    if (filtroTiempo === "semana") {
      const unaSemanaAtras = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000)
      coincideTiempo = fechaEtapa >= unaSemanaAtras
    } else if (filtroTiempo === "mes") {
      const unMesAtras = new Date(ahora.getTime() - 30 * 24 * 60 * 60 * 1000)
      coincideTiempo = fechaEtapa >= unMesAtras
    }

    return coincideBusqueda && coincideCamino && coincideTiempo
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <LoadingSpinner />
          <p className="text-center text-gray-600 mt-4">Cargando últimas etapas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-xl mb-2">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar las etapas</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUpIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Descubrir</h1>
          <p className="text-lg text-gray-600">Últimas etapas completadas por la comunidad</p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar etapas, usuarios o caminos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Botón de Filtros */}
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <FilterIcon className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Filtros Expandidos */}
          {mostrarFiltros && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Filtro por Tiempo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiempo</label>
                  <select
                    value={filtroTiempo}
                    onChange={(e) => setFiltroTiempo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="recientes">Más recientes</option>
                    <option value="semana">Última semana</option>
                    <option value="mes">Último mes</option>
                  </select>
                </div>

                {/* Filtro por Camino */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Camino</label>
                  <select
                    value={filtroCamino}
                    onChange={(e) => setFiltroCamino(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="todos">Todos los caminos</option>
                    {caminos.map((camino) => (
                      <option key={camino} value={camino}>
                        {camino}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de Etapas */}
        {etapasFiltradas.length > 0 ? (
          <div className="space-y-6">
            {etapasFiltradas.map((etapa) => (
              <EtapaPost key={etapa.id} etapa={etapa} onUsuarioClick={handleUsuarioClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron etapas</h3>
            <p className="text-gray-600">
              {busqueda ? `No hay etapas que coincidan con "${busqueda}"` : "No hay etapas disponibles"}
            </p>
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}

        {/* Indicador de más contenido */}
        {etapasFiltradas.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Mostrando {etapasFiltradas.length} etapa{etapasFiltradas.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Modal de Perfil de Usuario */}
      {usuarioSeleccionado && (
        <PerfilModal usuario={usuarioSeleccionado} onClose={() => setUsuarioSeleccionado(null)} />
      )}
    </div>
  )
}

export default DescubrirSocial
