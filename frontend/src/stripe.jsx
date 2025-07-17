import React, { useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';

const platform = Capacitor.getPlatform(); // 'web', 'ios', 'android'

const CheckoutButtonStripe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (platform !== 'web') return; // solo ejecuta en web

    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (containerRef.current) {
        const stripeElement = document.createElement("stripe-buy-button");
        stripeElement.setAttribute("buy-button-id", "buy_btn_1RlEMdLlS9xmUM4JCBBwbPT3");
        stripeElement.setAttribute("publishable-key", "pk_live_51RlDm4LlS9xmUM4JEmdF65DVWlUIE7j8syNnF60OTF1Ui3Assl4qCclWKKKXfaMOYRyKMqOp2yGtcFlOhvcGFZld00YcwbHqZz");
        containerRef.current.appendChild(stripeElement);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Solo renderiza en web
  if (platform !== 'web') return null;

  return <div ref={containerRef} />;
};

export default CheckoutButtonStripe;
