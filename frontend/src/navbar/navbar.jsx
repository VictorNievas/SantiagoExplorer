"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AdMob } from '@capacitor-community/admob'


const apiURL = process.env.REACT_APP_API_URL

// Iconos SVG
const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

const CompassIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
    />
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

const SettingsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const LogoutIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
)

const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
)

const UserPlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    />
  </svg>
)

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const HeartIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const MessageCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const CameraIcon = ({ className = "w-4 h-4" }) => (
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSolicitudesOpen, setIsSolicitudesOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estados para notificaciones y solicitudes
  const [notificaciones, setNotificaciones] = useState([])
  const [solicitudes, setSolicitudes] = useState([])
  const [loadingNotificaciones, setLoadingNotificaciones] = useState(false)
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(false)
  const [processingRequest, setProcessingRequest] = useState({})

  const usuarioId = localStorage.getItem("usuario")

  const navigationItems = [
    { name: "Inicio", href: "/inicio", icon: HomeIcon },
    { name: "Descubrir", href: "/descubrir", icon: CompassIcon },
  ]

  const mobileItems = [
    { name: "Inicio", href: "/inicio", icon: HomeIcon },
    { name: "Descubrir", href: "/descubrir", icon: CompassIcon },
    { name: "Perfil", href: `/perfil`, icon: UserIcon },
  ]
  const cerrarSesion = () => {
    localStorage.removeItem("usuario")
    window.location.href = "/login"
  }
  // Cargar notificaciones
  const cargarNotificaciones = async () => {
    if (!usuarioId) return

    setLoadingNotificaciones(true)
    try {
      const response = await fetch(`http://${apiURL}/api/usuarios/get_notificaciones?usuario_id=${usuarioId}`)
      if (response.ok) {
        const data = await response.json()
        setNotificaciones(data)
      }
    } catch (error) {
      console.error("Error cargando notificaciones:", error)
    } finally {
      setLoadingNotificaciones(false)
    }
  }

  // Cargar solicitudes de seguimiento
  const cargarSolicitudes = async () => {
    if (!usuarioId) return

    setLoadingSolicitudes(true)
    try {
      const response = await fetch(`http://${apiURL}/api/usuarios/get_solicitudes?usuario_id=${usuarioId}`)
      if (response.ok) {
        const data = await response.json()
        setSolicitudes(data)
      }
    } catch (error) {
      console.error("Error cargando solicitudes:", error)
    } finally {
      setLoadingSolicitudes(false)
    }
  }

  // Marcar notificaciones como leídas
  const marcarNotificacionesLeidas = async () => {
    if (!usuarioId) return

    try {
      await fetch(`http://${apiURL}/api/usuarios/marcar_notificaciones_leidas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_id: usuarioId }),
      })
      // Actualizar estado local
      setNotificaciones((prev) => prev.map((n) => ({ ...n, leido: true })))
    } catch (error) {
      console.error("Error marcando notificaciones como leídas:", error)
    }
  }

  // Aceptar solicitud de seguimiento
  const aceptarSolicitud = async (solicitudId) => {
    setProcessingRequest((prev) => ({ ...prev, [solicitudId]: "accepting" }))

    try {
      // Simular endpoint - ajustar según tu API
      const response = await fetch(`http://${apiURL}/api/usuarios/gestionar_solicitud`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_privado_id: usuarioId,
          solicitante_id: solicitudId,
          accion: "aceptar",
        }),
      })

      if (response.ok) {
        // Remover de la lista de solicitudes
        setSolicitudes((prev) => prev.filter((s) => s._id !== solicitudId))
      } else {
        alert("Error al aceptar la solicitud")
      }
    } catch (error) {
      console.error("Error aceptando solicitud:", error)
      alert("Error al aceptar la solicitud")
    } finally {
      setProcessingRequest((prev) => ({ ...prev, [solicitudId]: null }))
    }
  }

  // Rechazar solicitud de seguimiento
  const rechazarSolicitud = async (solicitudId) => {
    setProcessingRequest((prev) => ({ ...prev, [solicitudId]: "rejecting" }))

    try {
      // Simular endpoint - ajustar según tu API
      const response = await fetch(`http://${apiURL}/api/usuarios/gestionar_solicitud`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_privado_id: usuarioId,
          solicitante_id: solicitudId,
          accion: "rechazar",
        }),
      })

      if (response.ok) {
        // Remover de la lista de solicitudes
        setSolicitudes((prev) => prev.filter((s) => s._id !== solicitudId))
      } else {
        alert("Error al rechazar la solicitud")
      }
    } catch (error) {
      console.error("Error rechazando solicitud:", error)
      alert("Error al rechazar la solicitud")
    } finally {
      setProcessingRequest((prev) => ({ ...prev, [solicitudId]: null }))
    }
  }

  // Cargar datos iniciales y configurar polling
  useEffect(() => {
    if (usuarioId) {
      cargarNotificaciones()
      cargarSolicitudes()

      // Polling cada 30 segundos
      const interval = setInterval(() => {
        cargarNotificaciones()
        cargarSolicitudes()
      }, 30000)

      return () => clearInterval(interval)
    }

  }, [usuarioId])

  // Función para obtener el icono de notificación según el tipo
  const getNotificationIcon = (tipo) => {
    switch (tipo) {
      case "like":
        return <HeartIcon className="w-4 h-4 text-red-500" />
      case "comentario":
        return <MessageCircleIcon className="w-4 h-4 text-blue-500" />
      case "seguimiento":
        return <UserPlusIcon className="w-4 h-4 text-green-500" />
      case "etapa":
        return <CameraIcon className="w-4 h-4 text-purple-500" />
      default:
        return <BellIcon className="w-4 h-4 text-gray-500" />
    }
  }

  // Función para formatear el tiempo relativo
  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)

    // Convertir ambos a UTC explícitamente (opcional si ya lo están)
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000)

    if (diffInSeconds < 60) return "Hace un momento"
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`
    if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`
    return time.toLocaleDateString()
  }


  // Contar notificaciones no leídas
  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leido).length
  const solicitudesPendientes = solicitudes.length

  return (
  <>
  <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-blue-600">SantiagoExplorer</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {/* Navigation Links */}
          <div className="hidden md:flex md:space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Notificaciones */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen)
                  if (!isNotificationsOpen) {
                    marcarNotificacionesLeidas()
                  }
                }}
                className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                aria-label="Notificaciones"
              >
                <BellIcon className="w-5 h-5" />
                {notificacionesNoLeidas > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {notificacionesNoLeidas > 9 ? "9+" : notificacionesNoLeidas}
                  </span>
                )}
              </button>

              {/* Dropdown de Notificaciones */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {loadingNotificaciones ? (
                      <div className="p-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Cargando...</p>
                      </div>
                    ) : notificaciones.length > 0 ? (
                      notificaciones.map((notif) => (
                        <div
                          key={notif._id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            !notif.leido ? "bg-blue-50" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">{getNotificationIcon(notif.tipo)}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900">{notif.mensaje}</p>
                              <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notif.fecha)}</p>
                            </div>
                            {!notif.leido && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No tienes notificaciones</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Solicitudes de Seguimiento */}
            <div className="relative">
              <button
                onClick={() => setIsSolicitudesOpen(!isSolicitudesOpen)}
                className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                aria-label="Solicitudes"
              >
                <UserPlusIcon className="w-5 h-5" />
                {solicitudesPendientes > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {solicitudesPendientes > 9 ? "9+" : solicitudesPendientes}
                  </span>
                )}
              </button>

              {/* Dropdown de Solicitudes */}
              {isSolicitudesOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Solicitudes de Seguimiento</h3>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {loadingSolicitudes ? (
                      <div className="p-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Cargando...</p>
                      </div>
                    ) : solicitudes.length > 0 ? (
                      solicitudes.map((solicitud) => (
                        <div
                          key={solicitud._id}
                          className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={solicitud.foto || "/placeholder.svg?height=40&width=40"}
                              alt={`${solicitud.nombre} ${solicitud.apellidos}`}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=40&width=40"
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {solicitud.nombre} {solicitud.apellidos}
                              </p>
                              <p className="text-xs text-gray-500">Quiere seguirte</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => aceptarSolicitud(solicitud._id)}
                                disabled={processingRequest[solicitud._id]}
                                className={`p-1.5 rounded-full transition-colors ${
                                  processingRequest[solicitud._id] === "accepting"
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : "bg-green-100 hover:bg-green-200 text-green-600"
                                }`}
                                aria-label="Aceptar solicitud"
                              >
                                {processingRequest[solicitud._id] === "accepting" ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                ) : (
                                  <CheckIcon className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => rechazarSolicitud(solicitud._id)}
                                disabled={processingRequest[solicitud._id]}
                                className={`p-1.5 rounded-full transition-colors ${
                                  processingRequest[solicitud._id] === "rejecting"
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : "bg-red-100 hover:bg-red-200 text-red-600"
                                }`}
                                aria-label="Rechazar solicitud"
                              >
                                {processingRequest[solicitud._id] === "rejecting" ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                ) : (
                                  <XIcon className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <UserPlusIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No tienes solicitudes pendientes</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
                aria-label="Menú de perfil"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Mi Perfil</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <a
                      href="/perfil"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <UserIcon className="mr-3 w-4 h-4" />
                      Ver Perfil
                    </a>
                    <a
                      href="/configuracion"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SettingsIcon className="mr-3 w-4 h-4" />
                      Configuración
                    </a>
                    <hr className="my-1 border-gray-200" />
                    <a
                      onClick={() => {
                        setIsProfileOpen(false)
                        cerrarSesion()
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <LogoutIcon className="mr-3 w-4 h-4" />
                      Cerrar Sesión
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
<div className="md:hidden flex items-center">
  {/* Notificaciones */}
  <div className="relative">
    <button
      onClick={() => {
        setIsNotificationsOpen(!isNotificationsOpen);
        if (!isNotificationsOpen) marcarNotificacionesLeidas();
      }}
      className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
      aria-label="Notificaciones"
    >
      <BellIcon className="w-5 h-5" />
      {notificacionesNoLeidas > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {notificacionesNoLeidas > 9 ? "9+" : notificacionesNoLeidas}
        </span>
      )}
    </button>
    {isNotificationsOpen && (
      <div className="absolute top-full mt-2 right-2 max-w-[90vw] w-64 sm:w-72 md:w-80 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-50">
        {loadingNotificaciones ? (
          <div className="p-3 text-center text-sm text-gray-500">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
            Cargando...
          </div>
        ) : notificaciones.length > 0 ? (
          notificaciones.map((notif) => (
            <div
              key={notif._id}
              className={`p-3 border-b text-sm ${
                !notif.leido ? "bg-blue-50" : "bg-white"
              }`}
            >
              <div className="flex items-start space-x-2">
                {getNotificationIcon(notif.tipo)}
                <div>
                  <p className="text-gray-800">{notif.mensaje}</p>
                  <p className="text-xs text-gray-500">{formatTimeAgo(notif.fecha)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No tienes notificaciones
          </div>
        )}
      </div>
    )}
  </div>

  {/* Solicitudes */}
  <div className="relative">
    <button
      onClick={() => setIsSolicitudesOpen(!isSolicitudesOpen)}
      className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
      aria-label="Solicitudes"
    >
      <UserIcon  className="w-5 h-5" />
      {solicitudesPendientes > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {solicitudesPendientes > 9 ? "9+" : solicitudesPendientes}
        </span>
      )}
    </button>
    {isSolicitudesOpen && (
      <div className="absolute right-0 mt-2 w-64 sm:w-72 md:w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
        {loadingSolicitudes ? (
          <div className="p-3 text-center text-sm text-gray-500">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
            Cargando...
          </div>
        ) : solicitudes.length > 0 ? (
          solicitudes.map((solicitud) => (
            <div
              key={solicitud._id}
              className="p-3 border-b text-sm flex items-center space-x-3"
            >
              <img
                src={solicitud.foto || "/placeholder.svg?height=40&width=40"}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                alt={`${solicitud.nombre} ${solicitud.apellidos}`}
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=40&width=40"
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">
                  {solicitud.nombre} {solicitud.apellidos}
                </p>
                <p className="text-xs text-gray-500">Quiere seguirte</p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => aceptarSolicitud(solicitud._id)}
                  disabled={processingRequest[solicitud._id]}
                  className="text-green-600 hover:bg-green-100 p-1 rounded-full"
                  aria-label="Aceptar solicitud"
                >
                  {processingRequest[solicitud._id] === "accepting" ? (
                    <div className="animate-spin h-4 w-4 border-b-2 border-green-600 rounded-full"></div>
                  ) : (
                    <CheckIcon className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => rechazarSolicitud(solicitud._id)}
                  disabled={processingRequest[solicitud._id]}
                  className="text-red-600 hover:bg-red-100 p-1 rounded-full"
                  aria-label="Rechazar solicitud"
                >
                  {processingRequest[solicitud._id] === "rejecting" ? (
                    <div className="animate-spin h-4 w-4 border-b-2 border-red-600 rounded-full"></div>
                  ) : (
                    <XIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No tienes solicitudes pendientes
          </div>
        )}
      </div>
    )}
  </div>
  {/* Menú desplegable */}
      <div className="relative ml-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Menú de usuario"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1 px-1 space-y-1"> {/* Margenes internos mejorados */}
              {/* Configuración */}
              <Link
                to="/configuracion"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Configuración
                </div>
              </Link>
              
              {/* Cerrar sesión */}
              <button
                onClick={() => {
                  cerrarSesion();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Cerrar sesión
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
</div>

        </div>
      </div>
    

    


    {/* Mobile Bottom Navigation */}
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
      <div className="flex justify-around items-center h-14">
        {mobileItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-blue-600 p-1 flex-1"
            onClick={() => setIsOpen(false)}
          >
            <item.icon className="w-6 h-6 mb-0.5" />
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  </nav>
  </>
)

}
