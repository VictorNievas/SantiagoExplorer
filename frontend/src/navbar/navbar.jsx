"use client"

import { useState, useEffect } from "react"

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

  // Cargar notificaciones
  const cargarNotificaciones = async () => {
    if (!usuarioId) return

    setLoadingNotificaciones(true)
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/get_notificaciones?usuario_id=${usuarioId}`)
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
      const response = await fetch(`http://localhost:5000/api/usuarios/get_solicitudes?usuario_id=${usuarioId}`)
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
      await fetch("http://localhost:5000/api/usuarios/marcar_notificaciones_leidas", {
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
      const response = await fetch("http://localhost:5000/api/usuarios/gestionar_solicitud", {
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
      const response = await fetch("http://localhost:5000/api/usuarios/gestionar_solicitud", {
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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">SantiagoExplorer</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
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
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
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
              >
                <UserIcon className="w-4 h-4" />
                <span>Mi Perfil</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
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
                      href="/login"
                      onClick={() => {
                        setIsProfileOpen(false)
                        console.log("Cerrando sesión...")
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
              <span className="sr-only">{isOpen ? "Cerrar menú" : "Abrir menú"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              )
            })}

            {/* Mobile Notifications */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen)
                  if (!isNotificationsOpen) {
                    marcarNotificacionesLeidas()
                  }
                }}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <BellIcon className="w-5 h-5" />
                  <span>Notificaciones</span>
                </div>
                {notificacionesNoLeidas > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {notificacionesNoLeidas > 9 ? "9+" : notificacionesNoLeidas}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsSolicitudesOpen(!isSolicitudesOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <UserPlusIcon className="w-5 h-5" />
                  <span>Solicitudes</span>
                </div>
                {solicitudesPendientes > 0 && (
                  <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {solicitudesPendientes > 9 ? "9+" : solicitudesPendientes}
                  </span>
                )}
              </button>

              <a
                href="/perfil"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <UserIcon className="w-5 h-5" />
                <span>Mi Perfil</span>
              </a>

              <a
                href="/login"
                className="flex items-center space-x-3 text-red-600 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-red-50 transition-colors duration-200"
                onClick={() => {
                  setIsOpen(false)
                  console.log("Cerrando sesión...")
                }}
              >
                <LogoutIcon className="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para cerrar dropdowns en desktop */}
      {(isProfileOpen || isNotificationsOpen || isSolicitudesOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false)
            setIsNotificationsOpen(false)
            setIsSolicitudesOpen(false)
          }}
        />
      )}
    </nav>
  )
}
