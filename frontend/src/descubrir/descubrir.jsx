"use client"

import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar.jsx"

const apiURL = process.env.REACT_APP_API_URL

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
      console.log("Usuario publico:", usuario.publico)
      if(usuario.publico === false || usuario.publico === "false") {
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

// Componente para cada post de etapa
const EtapaPost = ({ etapa, onUsuarioClick }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(etapa.likes || [])
  const [comentarios, setComentarios] = useState(etapa.comentarios || [])
  const [showImageModal, setShowImageModal] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [loadingLike, setLoadingLike] = useState(false)
  const [loadingComment, setLoadingComment] = useState(false)

  // En el componente EtapaPost, agregar estado para usuarios de comentarios
  const [usuariosComentarios, setUsuariosComentarios] = useState({})
  const [usuarioActualData, setUsuarioActualData] = useState(null)

  const usuarioActual = localStorage.getItem("usuario")

  // Agregar useEffect para cargar datos del usuario actual
  useEffect(() => {
    const cargarUsuarioActual = async () => {
      if (usuarioActual) {
        try {
          const response = await fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${usuarioActual}`)
          if (response.ok) {
            const userData = await response.json()
            setUsuarioActualData(userData)
          }
        } catch (error) {
          console.error("Error cargando usuario actual:", error)
        }
      }
    }
    cargarUsuarioActual()
  }, [usuarioActual])

  // Agregar useEffect para cargar usuarios de comentarios
  useEffect(() => {
    const cargarUsuariosComentarios = async () => {
      const usuariosIds = comentarios.map((c) => c.usuario_id.$oid || c.usuario_id).filter(Boolean)
      const usuariosUnicos = [...new Set(usuariosIds)]

      const usuariosData = {}

      for (const userId of usuariosUnicos) {
        if (!usuariosComentarios[userId]) {
          try {
            const response = await fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${userId}`)
            if (response.ok) {
              const userData = await response.json()
              usuariosData[userId] = userData
            }
          } catch (error) {
            console.error(`Error cargando usuario ${userId}:`, error)
          }
        }
      }

      if (Object.keys(usuariosData).length > 0) {
        setUsuariosComentarios((prev) => ({ ...prev, ...usuariosData }))
      }
    }

    if (comentarios.length > 0) {
      cargarUsuariosComentarios()
    }
  }, [comentarios])

  // Verificar si el usuario actual ya dio like
  useEffect(() => {
  if (usuarioActual && likes.length > 0) {
    const userLiked = likes.some((like) => {
      const likeId = like.$oid || like
      return likeId === usuarioActual
    })
    setLiked(userLiked)
  } else {
    // Si no hay likes o usuario actual, marcar no liked
    setLiked(false)
  }
}, [likes, usuarioActual])

const handleLike = async () => {
  if (!usuarioActual) {
    alert("Debes iniciar sesión para dar like")
    return
  }

  if (loadingLike) return

  setLoadingLike(true)

  try {
    const response = await fetch(`${apiURL}/api/caminos/dar_like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: usuarioActual,
        otro_usuario_id: etapa.usuario_id,
        camino_id: etapa.camino_id,
        etapa_id: etapa.etapa_id,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      if (!liked) {
        // Si antes no tenía like, lo añadimos
        setLikes((prev) => [...prev, { $oid: usuarioActual }])
        setLiked(true)
      } else {
        // Si antes tenía like, lo quitamos
        setLikes((prev) => prev.filter(like => (like.$oid || like) !== usuarioActual))
        setLiked(false)
      }
    } else {
      console.error("Error al dar like:", result.error)
      alert(result.error || "Error al dar like")
    }
  } catch (error) {
    console.error("Error al dar like:", error)
    alert("Error al dar like. Inténtalo de nuevo.")
  } finally {
    setLoadingLike(false)
  }
}


  const handleComment = async () => {
    if (!usuarioActual) {
      alert("Debes iniciar sesión para comentar")
      return
    }

    if (!newComment.trim()) {
      alert("El comentario no puede estar vacío")
      return
    }

    if (loadingComment) return

    setLoadingComment(true)

    try {
      const response = await fetch(`${apiURL}/api/caminos/comentar_etapa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: usuarioActual,
          otro_usuario_id: etapa.usuario_id,
          camino_id: etapa.camino_id,
          etapa_id: etapa.etapa_id,
          texto: newComment.trim(),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Agregar comentario al estado local
        const nuevoComentario = {
          usuario_id: { $oid: usuarioActual },
          texto: newComment.trim(),
          fecha: new Date().toISOString(),
        }
        setComentarios((prev) => [...prev, nuevoComentario])
        setNewComment("")
      } else {
        console.error("Error al comentar:", result.error)
        alert("Error al enviar comentario")
      }
    } catch (error) {
      console.error("Error al comentar:", error)
      alert("Error al enviar comentario. Inténtalo de nuevo.")
    } finally {
      setLoadingComment(false)
    }
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

          {etapa.descripcion && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">{etapa.descripcion}</p>
          )}

          {/* Ubicación mejorada */}
          {etapa.lat && etapa.lon && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Coordenadas */}
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

                {/* Botón Google Maps */}
                <button
                  onClick={openGoogleMaps}
                  className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors w-full sm:w-auto"
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
                disabled={loadingLike}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                  liked
                    ? "bg-red-100 text-red-600 hover:bg-red-200 scale-105"
                    : "text-gray-600 hover:bg-gray-100 hover:text-red-500"
                } ${loadingLike ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <HeartIcon
                  className={`w-5 h-5 transition-all duration-200 ${
                    liked ? "fill-red-500 text-red-500 scale-110" : ""
                  }`}
                />
                <span className="text-sm font-medium">{likes.length}</span>
              </button>

              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <MessageCircleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{comentarios.length}</span>
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

          {/* Sección de comentarios */}
          {showComments && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              {/* Escribir comentario */}
              <div className="mb-4">
                <div className="flex space-x-3">
                  <img
                    src={usuarioActualData?.foto || "/placeholder.svg?height=32&width=32"}
                    alt="Tu foto"
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=32&width=32"
                    }}
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escribe un comentario..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleComment}
                        disabled={loadingComment || !newComment.trim()}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors ${
                          loadingComment || !newComment.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                        }`}
                      >
                        {loadingComment ? "Enviando..." : "Comentar"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de comentarios */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {comentarios.map((comentario, index) => {
                  const usuarioId = comentario.usuario_id.$oid || comentario.usuario_id
                  const usuarioComentario = usuariosComentarios[usuarioId]

                  return (
                    <div key={index} className="flex space-x-3">
                      <img
                        src={usuarioComentario?.foto || "/placeholder.svg?height=32&width=32"}
                        alt={usuarioComentario?.nombre || "Usuario"}
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=32&width=32"
                        }}
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900">
                              {usuarioComentario
                                ? `${usuarioComentario.nombre} ${usuarioComentario.apellidos}`
                                : "Usuario"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(comentario.fecha).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">{comentario.texto}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {comentarios.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No hay comentarios aún. ¡Sé el primero en comentar!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal mejorado para imagen completa */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-7xl max-h-full w-full">
            {/* Botones de control */}
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Imagen principal */}
            <div className="flex items-center justify-center h-full">
              <img
                src={etapa.imagen || "/placeholder.svg"}
                alt={etapa.nombre_etapa}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* INFO SUPERPUESTA PARA PANTALLAS GRANDES */}
            <div className="hidden sm:block absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-lg">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">{etapa.nombre_etapa}</h3>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <RouteIcon className="w-5 h-5" />
                    <span className="text-lg">{etapa.nombre_camino}</span>
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {etapa.distancia_km} km
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  {/* Usuario */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={etapa.usuario_foto || "/placeholder.svg"}
                      alt={etapa.usuario_nombre}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                    />
                    <div>
                      <p className="font-semibold">
                        {etapa.usuario_nombre} {etapa.usuario_apellidos}
                      </p>
                      <p className="text-sm opacity-90">
                        {new Date(etapa.fecha).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike()
                      }}
                      disabled={loadingLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all backdrop-blur-sm ${
                        liked
                          ? "bg-red-500/80 text-white hover:bg-red-600/80"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <HeartIcon className={`w-5 h-5 ${liked ? "fill-white" : ""}`} />
                      <span className="font-medium">{likes.length}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowComments(!showComments)
                      }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all backdrop-blur-sm"
                    >
                      <MessageCircleIcon className="w-5 h-5" />
                      <span className="font-medium">{comentarios.length}</span>
                    </button>

                    {etapa.lat && etapa.lon && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openGoogleMaps()
                        }}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/80 text-white hover:bg-blue-600/80 transition-all backdrop-blur-sm"
                      >
                        <MapPinIcon className="w-5 h-5" />
                        <span className="font-medium">Ubicación</span>
                      </button>
                    )}
                  </div>
                </div>

                {etapa.descripcion && (
                  <p className="mt-3 text-sm opacity-90 line-clamp-2">{etapa.descripcion}</p>
                )}
              </div>
            </div>

            {/* INFO NORMAL PARA MÓVIL - VERSIÓN PREMIUM */}
          <div className="block md:hidden bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-b-xl space-y-5 border border-gray-700 shadow-xl">
            {/* Título con efecto sutil */}
            <h3 className="text-2xl font-bold text-white tracking-tight">
              <span className="bg-clip-text  bg-gradient-to-r from-blue-400 to-cyan-400">
                {etapa.nombre_etapa}
              </span>
            </h3>

            {/* Camino + Distancia */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-gray-300 group">
                <RouteIcon className="w-6 h-6 text-cyan-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-base font-medium">{etapa.nombre_camino}</span>
              </div>
              <span className="text-sm font-medium bg-gray-700/50 text-gray-100 px-3 py-1.5 rounded-full border border-gray-600/50 backdrop-blur-sm">
                {etapa.distancia_km} km
              </span>
            </div>

            {/* Información de usuario */}
            <div className="flex items-center space-x-4 pt-2">
              <div className="relative">
                <img
                  src={etapa.usuario_foto || "/placeholder.svg"}
                  alt={etapa.usuario_nombre}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-600/30 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-gray-800"></span>
              </div>
              <div className="flex-1">
                <p className="text-base font-medium text-gray-100">
                  {etapa.usuario_nombre} {etapa.usuario_apellidos}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(etapa.fecha).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Descripción */}
            {etapa.descripcion && (
              <div className="pt-2">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {etapa.descripcion}
                </p>
              </div>
            )}
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

   // Estados para búsqueda de usuarios
  const [busquedaUsuarios, setBusquedaUsuarios] = useState("")
  const [usuariosEncontrados, setUsuariosEncontrados] = useState([])
  const [mostrarDropdownUsuarios, setMostrarDropdownUsuarios] = useState(false)
  const [loadingUsuarios, setLoadingUsuarios] = useState(false)
  const [todosLosUsuarios, setTodosLosUsuarios] = useState([])

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true)

        // Primero obtenemos todos los usuarios
        const usuariosResponse = await fetch(`${apiURL}/api/usuarios/get_usuarios`)
        if (!usuariosResponse.ok) {
          throw new Error("Error al cargar usuarios")
        }

        const usuarios = await usuariosResponse.json()
        console.log("Usuarios obtenidos:", usuarios)

        const etapasFormateadas = []
        const caminosSet = new Set()
        const usuarioActualId = localStorage.getItem("usuario")
        // Para cada usuario, obtenemos sus datos completos y etapas
        for (const usuario of usuarios) {
          try {
            let mostrar = false
            const seguidores = usuario.seguidores?.map((id) => id?.$oid || id) || []

            if(usuarioActualId == usuario._id){
              mostrar = true
            }
            else if(seguidores.includes(usuarioActualId)){
              mostrar = true
            }
            else if(usuario.publico == true){
              mostrar = true
            }
            // Si el usuario tiene caminos con etapas completadas
            if (usuario.caminos && Array.isArray(usuario.caminos) && mostrar) {
              for (const camino of usuario.caminos) {
                try {
                  // Obtener datos del camino usando el ObjectId
                  const caminoId = camino.id_camino.$oid || camino.id_camino
                  const caminoResponse = await fetch(
                    `${apiURL}/api/caminos/get_camino?camino_id=${caminoId}`,
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
                        camino_id: caminoId,
                        etapa_id: etapaId,
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
                        likes: etapaCompletada.likes || [],
                        comentarios: etapaCompletada.comentarios || [],
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

  // Cargar todos los usuarios para la búsqueda
  useEffect(() => {
    const cargarTodosUsuarios = async () => {
      try {
        const response = await fetch(`${apiURL}/api/usuarios/get_usuarios`)
        if (response.ok) {
          const usuarios = await response.json()
          setTodosLosUsuarios(usuarios)
        }
      } catch (error) {
        console.error("Error cargando usuarios:", error)
      }
    }
    cargarTodosUsuarios()
  }, [])

  const handleUsuarioClick = async (usuarioId) => {
    try {
      // Cargar datos completos del usuario
      const usuarioResponse = await fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${usuarioId}`)
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

   // Función para buscar usuarios
  const buscarUsuarios = (termino) => {
    setBusquedaUsuarios(termino)

    if (termino.trim().length < 2) {
      setUsuariosEncontrados([])
      setMostrarDropdownUsuarios(false)
      return
    }

    setLoadingUsuarios(true)

    // Filtrar usuarios localmente
    const usuariosFiltrados = todosLosUsuarios
      .filter((usuario) => {
        const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`.toLowerCase()
        const email = (usuario.gmail || "").toLowerCase()
        const terminoBusqueda = termino.toLowerCase()

        return nombreCompleto.includes(terminoBusqueda) || email.includes(terminoBusqueda)
      })
      .slice(0, 8) // Limitar a 8 resultados

    setUsuariosEncontrados(usuariosFiltrados)
    setMostrarDropdownUsuarios(true)
    setLoadingUsuarios(false)
  }

  // Función para seleccionar un usuario del dropdown
  const seleccionarUsuario = async (usuario) => {
    setBusquedaUsuarios("")
    setMostrarDropdownUsuarios(false)
    setUsuariosEncontrados([])

    // Usar la función existente handleUsuarioClick
    const usuarioId = usuario._id.$oid || usuario._id
    await handleUsuarioClick(usuarioId)
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

    // Cerrar dropdown al hacer clic fuera
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mostrarDropdownUsuarios && !event.target.closest(".relative")) {
        setMostrarDropdownUsuarios(false)
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mostrarDropdownUsuarios])

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
            {/* Búsqueda de etapas */}
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
            {/* Búsqueda de Usuarios */}
            <div className="flex-1 relative">
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={busquedaUsuarios}
                  onChange={(e) => buscarUsuarios(e.target.value)}
                  onFocus={() => {
                    if (busquedaUsuarios.trim().length >= 2) {
                      setMostrarDropdownUsuarios(true)
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Dropdown de Usuarios */}
              {mostrarDropdownUsuarios && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {loadingUsuarios ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-sm text-gray-500 mt-2">Buscando usuarios...</p>
                    </div>
                  ) : usuariosEncontrados.length > 0 ? (
                    <div className="py-2">
                      {usuariosEncontrados.map((usuario) => (
                        <button
                          key={usuario._id.$oid || usuario._id}
                          onClick={() => seleccionarUsuario(usuario)}
                          className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-center space-x-3"
                        >
                          <img
                            src={usuario.foto || "/placeholder.svg?height=32&width=32"}
                            alt={`${usuario.nombre} ${usuario.apellidos}`}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=32&width=32"
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {usuario.nombre} {usuario.apellidos}
                            </p>
                            <p className="text-sm text-gray-500 truncate">{usuario.gmail}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-blue-600 font-medium">
                                Nivel {usuario.nivel?.$numberInt || usuario.nivel || 1}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">
                                {usuario.caminos?.reduce(
                                  (total, c) => total + (c.etapas_completadas?.length || 0),
                                  0,
                                ) || 0}{" "}
                                etapas
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : busquedaUsuarios.trim().length >= 2 ? (
                    <div className="p-4 text-center">
                      <UserIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No se encontraron usuarios</p>
                      <p className="text-xs text-gray-400">Intenta con otros términos</p>
                    </div>
                  ) : null}
                </div>
              )}
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
