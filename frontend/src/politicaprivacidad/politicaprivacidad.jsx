import React from "react";

const PoliticaPrivacidad = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>

      <p className="mb-4">
        En <strong>Nombre de tu aplicación</strong>, valoramos tu privacidad y nos
        comprometemos a proteger tus datos personales. Esta política explica cómo
        recopilamos, usamos y protegemos tu información.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Información que recopilamos</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Datos personales: nombre, correo electrónico, contraseña (encriptada), etc.</li>
        <li>Datos de uso: páginas visitadas, clics, tiempo de navegación, etc.</li>
        <li>Información técnica: dirección IP, tipo de dispositivo, sistema operativo, navegador.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Cómo usamos tu información</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Para ofrecer y mejorar nuestros servicios.</li>
        <li>Para gestionar tu cuenta y autenticación.</li>
        <li>Para enviarte notificaciones relevantes (si lo aceptas).</li>
        <li>Para cumplir con obligaciones legales.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Cookies</h2>
      <p className="mb-4">
        Utilizamos cookies para mejorar tu experiencia. Puedes gestionar tus preferencias
        desde la configuración de tu navegador.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Compartición de datos</h2>
      <p className="mb-4">
        No compartimos tus datos con terceros, salvo en los siguientes casos:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Cuando sea necesario para prestar nuestros servicios.</li>
        <li>Cuando lo exija la ley o una autoridad competente.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Seguridad</h2>
      <p className="mb-4">
        Tomamos medidas razonables para proteger tu información personal, incluyendo cifrado y
        almacenamiento seguro.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Tus derechos</h2>
      <p className="mb-4">
        Puedes ejercer tus derechos de acceso, rectificación, eliminación u oposición
        escribiéndonos a <a href="mailto:tuemail@ejemplo.com" className="text-blue-600 underline">tuemail@ejemplo.com</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Cambios en esta política</h2>
      <p className="mb-4">
        Nos reservamos el derecho a modificar esta política de privacidad. Te notificaremos
        cualquier cambio importante.
      </p>

      <p className="mt-6 text-sm text-gray-600">
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  );
};

export default PoliticaPrivacidad;
