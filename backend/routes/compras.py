from flask import Blueprint, jsonify, Flask
from bson.objectid import ObjectId
from extensions import mongo
import cloudinary
import cloudinary.uploader
from cloudinary import api
import os
from flask import request
import math
import bson
from bson.errors import InvalidId
from datetime import datetime
import requests
from bs4 import BeautifulSoup
import time
from google.oauth2 import service_account
from googleapiclient.discovery import build
import stripe

compras = Blueprint('compras', __name__)


# Stripe config
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')  # clave secreta real
endpoint_secret = os.getenv('STRIPE_ENDPOINT_SECRET')  # clave secreta del endpoint


@compras.route('/webhook/stripe', methods=['POST'])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        # Payload inválido
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError:
        # Firma no válida
        return 'Invalid signature', 400

    # Evento de pago exitoso
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        email = session.get('customer_email') or session.get('customer_details', {}).get('email')
        print(f"Pago exitoso para el cliente: {email}")
        # Aquí puedes guardar en base de datos que el usuario pagó
        print(f"Pago confirmado para cliente: {session['customer']} - ID sesión: {session['id']}")

        mongo.db.usuarios.update_one(
            {"gmail": email},
            {"$set": {
                "premium": True,
            }}
        )

        # Ejemplo: guardar compra en DB
        # guardar_compra_en_db(user_id=session['customer'], session_id=session['id'], status='completed')

    return jsonify({'status': 'success'}), 200


# Ruta a tu archivo JSON de credenciales de servicio de Google Cloud
# SERVICE_ACCOUNT_FILE = ''

# # ID del paquete (app) en Google Play
# PACKAGE_NAME = 'com.tuempresa.tuapp'

# # Configura credenciales
# credentials = service_account.Credentials.from_service_account_file(
#     SERVICE_ACCOUNT_FILE,
#     scopes=['https://www.googleapis.com/auth/androidpublisher']
# )

# android_publisher = build('androidpublisher', 'v3', credentials=credentials)

# @compras.route('/verify/google_purchase', methods=['POST'])
# def verify_google_purchase():
#     data = request.json
#     purchase_token = data.get('purchaseToken')
#     product_id = data.get('productId')  # ID del producto comprado

#     if not purchase_token or not product_id:
#         return jsonify({'error': 'Faltan purchaseToken o productId'}), 400

#     try:
#         purchase = android_publisher.purchases().products().get(
#             packageName=PACKAGE_NAME,
#             productId=product_id,
#             token=purchase_token
#         ).execute()

#         # purchase['purchaseState'] == 0 significa compra completada
#         if purchase.get('purchaseState') == 0:
#             # Compra válida
#             # Guarda en tu BD aquí
#             return jsonify({'status': 'compra válida', 'purchase': purchase}), 200
#         else:
#             return jsonify({'status': 'compra no completada'}), 400

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

