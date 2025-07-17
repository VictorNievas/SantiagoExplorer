import { Capacitor } from '@capacitor/core';
const platform = Capacitor.getPlatform();

const buyWithGooglePlay = async () => {
  if (platform !== 'android') return;

  if (!window.cordova?.plugins?.purchase) {
    alert("Google Play Billing no está disponible.");
    return;
  }

  const productId = "com.tuapp.producto"; // ← usa el ID exacto del producto creado en Google Play

  window.cordova.plugins.purchase.getProducts([productId], function(products) {
    console.log("Productos:", products);

    window.cordova.plugins.purchase.order(productId, function(success) {
      console.log("Compra completada:", success);
      alert("¡Compra realizada con éxito!");
      // ✅ Aquí puedes enviar confirmación a tu backend si quieres registrar el pago
    }, function(err) {
      console.error("Error al comprar:", err);
      alert("No se pudo completar la compra.");
    });
  }, function(err) {
    console.error("Error al obtener productos:", err);
  });
};


const CheckoutButton = () => {
  const platform = Capacitor.getPlatform();

  const handlePurchase = () => {
    if (platform === 'android') {
      buyWithGooglePlay();
    }
  };

  return platform === 'android' ? (
    <button
      onClick={handlePurchase}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Comprar con Google Play
    </button>
  ) : null;
};

export default CheckoutButton;