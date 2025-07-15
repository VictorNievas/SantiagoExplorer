import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";


const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-cover bg-center bg-no-repeat h-screen relative" style={{ backgroundImage: "url('https://media.cnn.com/api/v1/images/stellar/prod/cnne-1446577-230829154445-06-body-camino-de-santiago-spain-pilgrimage-milestone.jpg?c=16x9&q=h_833,w_1480,c_fill')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white" data-aos="fade-down">
            SantiagoExplorer
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl" data-aos="fade-up">
            Explora, comparte y conecta con peregrinos del Camino de Santiago.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4" data-aos="zoom-in">
            <Link to="/login" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
              Registrarse
            </Link>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-12" data-aos="fade-up">¿Qué puedes hacer?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center" data-aos="fade-right">
            <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Explora Caminos" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Explora Caminos</h3>
            <p className="text-gray-600">Descubre todos los caminos oficiales del Camino de Santiago con sus etapas y localización exacta.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center" data-aos="zoom-in">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Comparte Fotos" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comparte tu Camino</h3>
            <p className="text-gray-600">Sube fotos, deja comentarios y gana logros a medida que avanzas.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center" data-aos="fade-left">
            <img src="https://cdn-icons-png.flaticon.com/512/2910/2910791.png" alt="Red Social" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Conecta con otros</h3>
            <p className="text-gray-600">Sigue a otros peregrinos, chatea con ellos y crea comunidad mientras avanzas.</p>
          </div>
        </div>
      </section>

      {/* Imagen destacada */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10" data-aos="fade-up">
          <img src="https://www.spain.info/export/sites/segtur/.content/imagenes/destacados-homes-cuadrados/camino-santiago/peregrinos-camino-santiago-s1468341605.jpg" alt="Peregrino" className="rounded-2xl w-full md:w-1/2 shadow-lg" />
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4">Una experiencia inolvidable</h3>
            <p className="text-gray-700 text-lg">
              Cada paso cuenta. Guarda tus avances, desbloquea medallas, sigue el progreso de otros peregrinos y revive tu experiencia cada vez que lo desees.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6 text-center">
        <p>© 2025 Santiago Explorer. Todos los derechos reservados. Victor Nievas Heredia</p>
      </footer>
    </div>
  );
};

export default LandingPage;
