"use client"

import React, { useEffect, useState, useRef } from "react"
import Navbar from "../navbar/navbar.jsx"
import CheckoutButtonStripe from "../stripe.jsx";
import html2canvas from "html2canvas";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polyline  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import leafletImage from "leaflet-image";
import L from 'leaflet';
import ModalPremium from "../modalPremium.jsx";

// Corrección para los iconos por defecto en Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});



const apiURL = process.env.REACT_APP_API_URL

// Iconos SVG
const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

const MapIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  </svg>
)

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

const RouteIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

function Inicio() {
  const [caminos, setCaminos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedCaminos, setExpandedCaminos] = useState({})
  const [completedEtapas, setCompletedEtapas] = useState({})
  const [uploadingPhoto, setUploadingPhoto] = useState({})
  const [expandedInfoId, setExpandedInfoId] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [userLocation, setUserLocation] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [etapaActual, setEtapaActual] = useState(null); // Estado para la etapa actual
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [premium, setPremium] = useState(false); // Estado para el premium


  const toggleEtapaInfo = (id) => {
    setExpandedInfoId((prevId) => (prevId === id ? null : id))
  }


  // Función helper para crear la clave compuesta
  const getEtapaKey = (caminoId, etapaId) => `${caminoId}_${etapaId}`

  useEffect(() => {
    const usuario = localStorage.getItem("usuario")
    if (!usuario) {
      setError("No se ha encontrado el usuario.")
      setLoading(false)
      return
    }

    Promise.all([
      fetch(`${apiURL}/api/caminos/get_caminos`).then((res) => {
        if (!res.ok) throw new Error("Error al cargar caminos")
        return res.json()
      }),
      fetch(`${apiURL}/api/caminos/caminos_usuario?usuario_id=${usuario}`).then((res) => {
        if (!res.ok) throw new Error("Error al cargar progreso del usuario")
        return res.json()
      }),
      fetch(`${apiURL}/api/usuarios/get_usuario?usuario_id=${usuario}`).then((res) => {
        if (!res.ok) throw new Error("Error al cargar progreso del usuario")
        return res.json()
      }),
    ])
      .then(([caminosData, progresoData, userData]) => {
        setPremium(userData.premium || false) // Guardar el estado premium del usuario
        setCaminos(caminosData)
        console.log("Caminos cargados:", caminosData) // Para debug
        const progresoMap = {}

        // Procesar el progreso del usuario
        progresoData.forEach((caminoUsuario) => {
          const idCamino = caminoUsuario.id_camino

          // Verificar que etapas_completadas existe y es un array
          if (caminoUsuario.etapas_completadas && Array.isArray(caminoUsuario.etapas_completadas)) {
            caminoUsuario.etapas_completadas.forEach((etapa) => {
              // Crear clave compuesta: camino + etapa
              const key = getEtapaKey(idCamino, etapa.id_etapa)
              progresoMap[key] = {
                completed: true,
                photo: etapa.url_foto || etapa.imagen || null,
                date: etapa.fecha ? new Date(etapa.fecha).toLocaleDateString() : "Fecha no disponible",
                caminoId: idCamino,
                etapaId: etapa.id_etapa,
              }
            })
          }
        })

        console.log("Progreso cargado:", progresoMap) // Para debug
        setCompletedEtapas(progresoMap)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error cargando datos:", err)
        setError("Error cargando los datos: " + err.message)
        setLoading(false)
      })

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error("No se pudo obtener ubicación:", err);
        }
      );
      if (isModalOpen) {
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
            console.log("✅ Mapa invalidado");
          }
        }, 300); // Espera a que el modal esté en el DOM
      }
  }, [])

  const fetchRoute = async (from, to) => {
    const res = await fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", {
      method: "POST",
      headers: {
        "Authorization": process.env.REACT_APP_StreetMapKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [[from.lng, from.lat], [to.coordenadas.lng, to.coordenadas.lat]],
      }),
    });
    const data = await res.json();
    setRouteData(data);
    console.log("Ruta obtenida:", data); // Para debug
  };


const mapRef = useRef(null);
const [map, setMap] = React.useState(null);



  // Definimos las posiciones para la línea de la ruta
 

const handleEtapaClick = (etapa) => {
    setEtapaActual(etapa);
    console.log("Etapa actual:", etapa); // Para debug
    if ( userLocation) {
      fetchRoute(userLocation, etapa);
    }
    setIsModalOpen(true);
  };

  const toggleCamino = (caminoId) => {
    setExpandedCaminos((prev) => ({
      ...prev,
      [caminoId]: !prev[caminoId],
    }))
  }

 
  const handlePhotoUpload = async (caminoId, etapaId, file) => {
    if (!file) return

    const etapaKey = getEtapaKey(caminoId, etapaId)
    setUploadingPhoto((prev) => ({ ...prev, [etapaKey]: true }))

    // Obtener la ubicación
    if (!navigator.geolocation) {
      alert("La geolocalización no está disponible en este navegador.")
      setUploadingPhoto((prev) => ({ ...prev, [etapaKey]: false }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        
        // Preparar formData
        const formData = new FormData()
        formData.append("id_usuario", localStorage.getItem("usuario"))
        formData.append("id_camino", caminoId)
        formData.append("id_etapa", etapaId)
        formData.append("file", file)
        formData.append("lat", lat)
        formData.append("lon", lon)
        formData.append("fecha", new Date().toISOString())

        try {
          const response = await fetch(`${apiURL}/api/caminos/subir_imagen`, {
            method: "POST",
            body: formData,
          })

          const result = await response.json()

          if (response.ok) {
            // Actualizar el estado local
            setCompletedEtapas((prev) => ({
              ...prev,
              [etapaKey]: {
                completed: true,
                photo: result.url_foto || URL.createObjectURL(file),
                date: new Date().toLocaleDateString(),
                caminoId: caminoId,
                etapaId: etapaId,
              },
            }))

            alert("¡Etapa completada exitosamente!")
            //Anadir un nivel al usuario y anadir los kilometros recorridos
            try{
              const response = await fetch(`${apiURL}/api/caminos/get_camino?camino_id=${caminoId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              });
              
              const camino = await response.json()
              if(response.ok) {
                const distanciaRecorrida = camino.etapas[etapaId-1].distancia_km || 0
                const usuarioId = localStorage.getItem('usuario')

                await fetch(`${apiURL}/api/usuarios/actualizar_distancia`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    usuario_id: usuarioId,
                    distancia_recorrida: distanciaRecorrida
                  })
                })



                await fetch(`${apiURL}/api/usuarios/actualizar_nivel`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    usuario_id: usuarioId,
                    nivel: premium? 2 : 1
                  })
                })

                const completedCount =
                camino.etapas?.filter((etapa) => {
                  const etapaKey = getEtapaKey(camino._id, etapa._id)
                  return completedEtapas[etapaKey]?.completed
                }).length || 0

                const totalEtapas = camino.etapas?.length || 0
                if (completedCount === totalEtapas) {
                  await fetch(`${apiURL}/api/usuarios/actualizar_nivel`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      usuario_id: usuarioId,
                      nivel: premium ? 10 : 5
                    })
                  })

                  await fetch(`${apiURL}/api/usuarios/anadir_logro`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      usuario_id: usuarioId,
                      camino_id: caminoId,
                    })
                  })
                }
              }
            }
            catch (error) {
              console.error(error)
            }
          } else {
            alert(`Error al subir la foto: ${result.error || "Error desconocido"}`)
          }
        } catch (error) {
          console.error("Error al subir la foto:", error)
          alert("Error al subir la foto.")
        } finally {
          setUploadingPhoto((prev) => ({ ...prev, [etapaKey]: false }))
        }
      },
      (error) => {
        alert("No se pudo obtener tu ubicación: " + error.message)
        setUploadingPhoto((prev) => ({ ...prev, [etapaKey]: false }))
      },
    )
  }

  const caminosFiltrados = caminos.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );


  const toggleEtapaCompletion = async (caminoId, etapaId) => {
    const etapaKey = getEtapaKey(caminoId, etapaId)

    if (completedEtapas[etapaKey]?.completed) {
      // Confirmar antes de desmarcar
      if (window.confirm("¿Estás seguro de que quieres desmarcar esta etapa como completada?")) {
        try {
          // Aquí podrías hacer una llamada al backend para eliminar el progreso
          // const response = await fetch(${apiURL}/api/caminos/eliminar_progreso`, {
          //   method: 'DELETE',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     usuario_id: localStorage.getItem('usuario'),
          //     camino_id: caminoId,
          //     etapa_id: etapaId
          //   })
          // })

          // Por ahora solo actualizamos el estado local
          setCompletedEtapas((prev) => {
            const newState = { ...prev }
            delete newState[etapaKey]
            return newState
          })
        } catch (error) {
          console.error("Error al desmarcar etapa:", error)
          alert("Error al desmarcar la etapa")
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <LoadingSpinner />
          <p className="text-center text-gray-600 mt-4">Cargando caminos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-xl mb-2">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar los caminos</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }
//<CheckoutButtonStripe productName="Camino de Santiago" price={1.95} />
  return (
    <div>
      <Navbar />
      {
        !premium && (
          <ModalPremium />
        )
      }
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <RouteIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Caminos de Santiago</h1>
            <p className="text-lg text-gray-600">Descubre y completa las etapas de cada camino</p>
          </div>
          {/* Filtros y búsqueda */}
           <div className="flex-1 mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar caminos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          {/* Caminos Grid */}
          <div className="grid gap-6">
            {caminosFiltrados.map((camino) => {
              const isExpanded = expandedCaminos[camino._id]

              // Calcular progreso correctamente usando las claves compuestas
              const completedCount =
                camino.etapas?.filter((etapa) => {
                  const etapaKey = getEtapaKey(camino._id, etapa._id)
                  return completedEtapas[etapaKey]?.completed
                }).length || 0

              const totalEtapas = camino.etapas?.length || 0
              const progressPercentage = totalEtapas > 0 ? (completedCount / totalEtapas) * 100 : 0
              
              return (
                <div key={camino._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Camino Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <MapIcon className="w-6 h-6 text-blue-600" />
                          <h2 className="text-2xl font-bold text-gray-900">{camino.nombre}</h2>
                        </div>
                        <div className="mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {camino.distancia_km} km
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{camino.descripcion}</p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>
                              {completedCount}/{totalEtapas} etapas completadas ({Math.round(progressPercentage)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleCamino(camino._id)}
                        className="ml-4 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <span>{isExpanded ? "Ocultar" : "Ver más"}</span>
                        <ChevronDownIcon
                          className={`w-4 h-4 transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Etapas */}
                  {isExpanded && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Etapas del Camino</h3>
                      <div className="grid gap-4">
                        {camino.etapas?.map((etapa, index) => {
                          const etapaKey = getEtapaKey(camino._id, etapa._id)
                          const isCompleted = completedEtapas[etapaKey]?.completed
                          const isUploading = uploadingPhoto[etapaKey]
                          const etapaData = completedEtapas[etapaKey]
                          
                          return (
                            <div
                              key={etapa._id}
                              className={`border rounded-lg p-4 transition-all duration-200 ${
                                isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                {/* IZQUIERDA */}
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                                      {index + 1}
                                    </span>
                                    <h4 className={`text-lg font-semibold ${isCompleted ? "text-green-800" : "text-gray-900"}`}>
                                      {etapa.nombre}
                                    </h4>
                                    {isCompleted && (
                                      <div className="flex items-center space-x-1 text-green-600">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="text-sm font-medium">Completada</span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {etapa.distancia_km} km
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {etapa.duracion}
                                    </span>
                                    <a
                                      href={`https://www.google.com/maps?q=${etapa.coordenadas.lat},${etapa.coordenadas.lng}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 text-xs font-medium rounded hover:bg-blue-600 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 select-none cursor-pointer"
                                    >
                                      📍 Cómo llegar
                                    </a>
                                    <button
                                      onClick={() => toggleEtapaInfo(etapa._id)}
                                      className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-medium rounded hover:bg-blue-200 transition"
                                    >
                                      ℹ️ Más info
                                    </button>
                                  </div>

                                  <p className="text-gray-600 mb-3">{etapa.descripcion}</p>

                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                    <div className="flex flex-col space-y-1 text-sm text-gray-700">
                                      <div>
                                        <strong>Dificultad:</strong>{" "}
                                        <span className="text-yellow-500">
                                          {"★".repeat(etapa.dificultad || 0)}
                                          {"☆".repeat(5 - (etapa.dificultad || 0))}
                                        </span>
                                      </div>
                                      <div>
                                        <strong>Paisaje:</strong>{" "}
                                        <span className="text-green-500">
                                          {"★".repeat(etapa.paisaje || 0)}
                                          {"☆".repeat(5 - (etapa.paisaje || 0))}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {expandedInfoId === etapa._id && (
                                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3 text-sm text-blue-900">
                                      🛏️ <strong>Albergue más barato:</strong> {etapa.albergue} <br />
                                      💰 <strong>Precio:</strong> {etapa.precio} €
                                    </div>
                                  )}

                                  {isCompleted && etapaData?.photo && (
                                    <div className="mb-3">
                                      <p className="text-sm text-green-600 mb-2">Completada el {etapaData.date}</p>
                                      <img
                                        src={etapaData.photo || "/placeholder.svg"}
                                        alt={`Foto de ${etapa.nombre}`}
                                        className="w-32 h-32 object-cover rounded-lg border-2 border-green-200"
                                        onError={(e) => {
                                          e.target.src = "/placeholder.svg?height=128&width=128"
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                {/* MAPA Y DESCARGA */}
                                {premium && userLocation && (
                                  <button
                                    onClick={() => handleEtapaClick(etapa)} // Abre el modal al hacer clic
                                    className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                                  >
                                  Ver Mapa
                                 </button>
                                )}
                                {/* Modal para mostrar el mapa */}
                                {isModalOpen && (
                                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
                                      <h2 className="text-xl font-semibold mb-4">Mapa de {etapaActual?.nombre}</h2>
                                      {etapaActual && (
                                        <div className="mt-4 space-y-2">
                                          <div id="mi-mapa" className="h-64 w-full rounded overflow-hidden shadow">
                                            <MapContainer
                                              center={[etapaActual.coordenadas.lat, etapaActual.coordenadas.lng]}
                                              zoom={13}
                                              scrollWheelZoom={false}
                                              style={{ height: "100%", width: "100%" }}
                                              whenCreated={setMap}
                                            >
                                              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                              <Marker position={[userLocation.lat, userLocation.lng]}>
                                                <Popup>Tu ubicación</Popup>
                                              </Marker>
                                              <Marker position={[etapaActual.coordenadas.lat, etapaActual.coordenadas.lng]}>
                                                <Popup>{etapaActual.nombre}</Popup>
                                              </Marker>
                                              {routeData && <GeoJSON data={routeData} style={{ color: "blue", weight: 4 }} />}
                                          </MapContainer>
                                          </div>
                                          <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="mt-2 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded hover:bg-gray-400 transition"
                                          >
                                            Cerrar
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}


                                {/* DERECHA */}
                                {!isCompleted && (
                                  <div className="w-full sm:w-auto">
                                    <div className="relative">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handlePhotoUpload(camino._id, etapa._id, e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        disabled={isUploading}
                                      />
                                      <button
                                        className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                          isUploading
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700 text-white"
                                        }`}
                                        disabled={isUploading}
                                      >
                                        {isUploading ? (
                                          <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Subiendo...</span>
                                          </>
                                        ) : (
                                          <>
                                            <CameraIcon className="w-4 h-4" />
                                            <span>Completar</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );

                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {caminos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🚶‍♂️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay caminos disponibles</h3>
              <p className="text-gray-600">Los caminos aparecerán aquí cuando estén disponibles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inicio
