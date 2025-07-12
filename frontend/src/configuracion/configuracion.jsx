"use client"

import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar.jsx"

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

const LockIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
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

const ShieldIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const EyeOffIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
)

const SaveIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
)

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

function Configuracion() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("perfil")
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Estados para el formulario de perfil
  const [perfilForm, setPerfilForm] = useState({
    nombre: "",
    apellidos: "",
    gmail: "",
    foto: null,
    publico: false, // Asumiendo que el perfil es público por defecto
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  // Estados para cambio de contraseña
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })


  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const usuarioId = localStorage.getItem("usuario")
        if (!usuarioId) {
          throw new Error("No se encontró el usuario")
        }

        const response = await fetch(`http://localhost:5000/api/usuarios/get_usuario?usuario_id=${usuarioId}`)
        if (!response.ok) throw new Error("Error al cargar datos del usuario")

        const usuario = await response.json()
        setUserData(usuario)
        console.log("Datos del usuario:", usuario)

        // Inicializar formularios con datos del usuario
        setPerfilForm({
          nombre: usuario.nombre || "",
          apellidos: usuario.apellidos || "",
          gmail: usuario.gmail || "",
          foto: null,
          publico: usuario.publico === "true" || usuario.publico === true,
        })

        setPhotoPreview(usuario.foto || null)


        setLoading(false)
      } catch (err) {
        console.error("Error cargando configuración:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    cargarDatosUsuario()
  }, [])

  const handlePerfilChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPerfilForm({
      ...perfilForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPerfilForm({
        ...perfilForm,
        foto: file,
      })
      // Crear preview de la imagen
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    })
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    })
  }

  const guardarPerfil = async () => {
    setSaving(true)
    setError("")
    setSuccessMessage("")

    try {
      const usuarioId = localStorage.getItem("usuario");

      if (!usuarioId) {
        console.error("No se encontró el usuario en localStorage");
        // Puedes redirigir al login o mostrar un mensaje
        return;
      }

      const formData = new FormData();
      formData.append("usuario_id", usuarioId);
      formData.append("nombre", perfilForm.nombre);
      formData.append("apellidos", perfilForm.apellidos);
      formData.append("gmail", perfilForm.gmail);
      formData.append("publico", perfilForm.publico ? "true" : "false");

      if (perfilForm.foto) {
        formData.append("foto", perfilForm.foto)
      }

      const response = await fetch("http://localhost:5000/api/usuarios/actualizar_perfil", {
        method: "PUT",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setSuccessMessage("Perfil actualizado correctamente")
        // Actualizar datos locales
        setUserData({ ...userData, ...perfilForm })
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        throw new Error(result.error || "Error al actualizar perfil")
      }
    } catch (err) {
      console.error("Error guardando perfil:", err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const cambiarPassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres")
      return
    }

    setSaving(true)
    setError("")
    setSuccessMessage("")

    try {
      const usuarioId = localStorage.getItem("usuario")
      const response = await fetch("http://localhost:5000/api/usuarios/cambiar_password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
          password_actual: passwordForm.currentPassword,
          password_nueva: passwordForm.newPassword,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccessMessage("Contraseña cambiada correctamente")
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        throw new Error(result.error || "Error al cambiar contraseña")
      }
    } catch (err) {
      console.error("Error cambiando contraseña:", err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <LoadingSpinner />
          <p className="text-center text-gray-600 mt-4">Cargando configuración...</p>
        </div>
      </div>
    )
  }

  if (error && !userData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-xl mb-2">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar la configuración</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "perfil", name: "Perfil", icon: UserIcon },
    { id: "seguridad", name: "Seguridad", icon: LockIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <SettingsIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p className="text-lg text-gray-600">Gestiona tu perfil y preferencias</p>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <XIcon className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              <p className="text-green-700">{successMessage}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de navegación */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        activeTab === tab.id
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Tab de Perfil */}
              {activeTab === "perfil" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Información del Perfil</h2>

                  <div className="space-y-6">
                    {/* Foto de perfil */}
                    <div className="flex items-center space-x-6">
                      <div className="relative group">
                        <img
                          src={photoPreview || "/placeholder.svg?height=100&width=100"}
                          alt="Foto de perfil"
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=100&width=100";
                          }}
                        />
                        <label
                          htmlFor="fileInput"
                          className="absolute bottom-0 right-0 bg-purple-600 group-hover:bg-purple-700 p-2 rounded-full cursor-pointer shadow-md transition duration-300"
                          title="Cambiar foto"
                        >
                          <CameraIcon className="w-4 h-4 text-white" />
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Foto de Perfil</h3>
                        <p className="text-gray-600 text-sm">Haz clic en el icono de cámara para subir una nueva imagen</p>
                        <p className="text-gray-500 text-xs mt-1">Formatos permitidos: JPG, PNG. Tamaño máx: 5MB</p>
                      </div>
                    </div>

                    {/* Formulario de datos personales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                        <input
                          type="text"
                          name="nombre"
                          value={perfilForm.nombre}
                          onChange={handlePerfilChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Tu nombre"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                        <input
                          type="text"
                          name="apellidos"
                          value={perfilForm.apellidos}
                          onChange={handlePerfilChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Tus apellidos"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="gmail"
                        value={perfilForm.gmail}
                        onChange={handlePerfilChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label htmlFor="publico" className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="publico"
                          name="publico"
                          type="checkbox"
                          checked={perfilForm.publico}
                          onChange={handlePerfilChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                            perfilForm.publico ? "bg-purple-600" : "bg-gray-300"
                          }`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                            perfilForm.publico ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></div>
                      </label>

                      <div className="flex items-center space-x-2">
                        <label htmlFor="publico" className="text-sm font-medium text-gray-700 select-none">
                          ¿Perfil Público?
                        </label>
                        <span className={`text-sm font-semibold ${perfilForm.publico ? "text-purple-600" : "text-gray-500"}`}>
                          {perfilForm.publico ? "Sí" : "No"}
                        </span>
                      </div>
                    </div>


                    <div className="flex justify-end">
                      <button
                        onClick={guardarPerfil}
                        disabled={saving}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                          saving
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        }`}
                      >
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Guardando...</span>
                          </>
                        ) : (
                          <>
                            <SaveIcon className="w-5 h-5" />
                            <span>Guardar Cambios</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab de Seguridad */}
              {activeTab === "seguridad" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Seguridad</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Contraseña</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña Actual</label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? "text" : "password"}
                              name="currentPassword"
                              value={passwordForm.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Contraseña actual"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility("current")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.current ? (
                                <EyeOffIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? "text" : "password"}
                              name="newPassword"
                              value={passwordForm.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Nueva contraseña"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility("new")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.new ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmar Nueva Contraseña
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? "text" : "password"}
                              name="confirmPassword"
                              value={passwordForm.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Confirmar nueva contraseña"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility("confirm")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.confirm ? (
                                <EyeOffIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={cambiarPassword}
                            disabled={
                              saving ||
                              !passwordForm.currentPassword ||
                              !passwordForm.newPassword ||
                              !passwordForm.confirmPassword
                            }
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                              saving ||
                              !passwordForm.currentPassword ||
                              !passwordForm.newPassword ||
                              !passwordForm.confirmPassword
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            }`}
                          >
                            {saving ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Cambiando...</span>
                              </>
                            ) : (
                              <>
                                <LockIcon className="w-5 h-5" />
                                <span>Cambiar Contraseña</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configuracion
