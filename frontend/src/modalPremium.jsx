import { useEffect, useState } from "react";

export default function ModalPremium() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const ultimaVez = localStorage.getItem("ultimoModalPremium");
    const ahora = Date.now();
    const unaHora = 1000 * 60 * 60 * 4; // cada 4 hora

    if (!ultimaVez || ahora - parseInt(ultimaVez) > unaHora) {
      setMostrar(true);
      localStorage.setItem("ultimoModalPremium", ahora.toString());
    }
  }, []);

  const cerrarModal = () => {
    setMostrar(false);
  };

  if (!mostrar) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full animate-fade-in scale-95 transition-transform">
      <h2 className="text-3xl font-extrabold text-yellow-500 mb-2 text-center">
        ¡Hazte Premium ahora!
      </h2>

      <div className="text-center mb-4">
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
          Antes <span className="line-through">4,99 €</span> — <span className="text-green-700 font-bold">Ahora 1,95 €</span> <span className="text-gray-600">(pago único)</span>
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-6 text-center">
        Usa el mismo correo electrónico asociado a tu cuenta para activar la suscripción.
      </p>

      <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-200">
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 text-xl">📍</span>
            <span>
              Visualiza el mapa <strong>en tiempo real</strong> de cualquier etapa.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span>
              Gana el <strong>doble de experiencia</strong> para subir de nivel más rápido.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 text-xl">📏</span>
            <span>
              Completa etapas a una distancia de hasta <strong>1000 metros</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 text-xl">🏅</span>
            <span>
              Logro <strong>exclusivo</strong> solo para usuarios Premium.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 text-xl">🚀</span>
            <span>
              Soporte <strong>prioritario</strong> para resolver tus dudas rápido.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 text-xl">✨</span>
            <span>
              Acceso <strong>prioritario a novedades</strong> y funcionalidades nuevas.
            </span>
          </li>
        </ul>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={cerrarModal}
          className="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          No, gracias
        </button>
        <button
          onClick={() => {
            cerrarModal();
            window.location.href = "/configuracion?tab=suscripciones";
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm py-2 px-4 rounded-lg shadow"
        >
          ¡Quiero ser Premium!
        </button>
      </div>
    </div>
  </div>
);



}
