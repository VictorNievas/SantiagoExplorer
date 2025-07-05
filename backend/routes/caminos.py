from flask import Blueprint, jsonify
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

caminos = Blueprint('caminos', __name__)

cloudinary.config(
    cloud_name= os.getenv('Cloudname'),
    api_key=os.getenv('Apikey'),
    api_secret= os.getenv('Apisecret')
)

@caminos.route('/get_caminos', methods=['GET'])
def get_caminos():
    try:
        data = list(mongo.db.caminos.find())
        serialized_data = []

        for doc in data:
            doc_serialized = dict(doc)  # Crear copia para no modificar el original
            if '_id' in doc_serialized:
                doc_serialized['_id'] = str(doc_serialized['_id'])  # Convertir ObjectId a str
            serialized_data.append(doc_serialized)

        return jsonify(serialized_data), 200

    except Exception as e:
        # Aquí puedes loguear el error si quieres para debug
        return jsonify({"error": str(e)}), 500


@caminos.route('/subir_imagen', methods=['POST'])
def subir_imagen():
    file_to_upload = request.files.get('file')
    id_usuario = request.form.get('id_usuario')
    id_camino = request.form.get('id_camino')
    id_etapa = request.form.get('id_etapa', type=int)
    fecha = request.form.get('fecha')
    lat = request.form.get('lat', type=float)
    lon = request.form.get('lon', type=float)

    if not all([file_to_upload, id_usuario, id_camino, id_etapa, fecha, lat, lon]):
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    # Paso 1: Obtener datos de la etapa desde la colección caminos
    camino = mongo.db.caminos.find_one({"_id": ObjectId(id_camino)})
    if not camino:
        return jsonify({"error": "Camino no encontrado"}), 404

    etapa = next((e for e in camino['etapas'] if e['orden'] == id_etapa), None)
    if not etapa:
        return jsonify({"error": "Etapa no encontrada"}), 404

    lat_etapa = etapa['coordenadas']['lat']
    lon_etapa = etapa['coordenadas']['lng']

    # Paso 2: Calcular distancia en metros (Haversine)
    def calcular_distancia_metros(lat1, lon1, lat2, lon2):
        R = 6371000  # Radio de la Tierra en metros
        phi1 = math.radians(lat1)
        phi2 = math.radians(lat2)
        delta_phi = math.radians(lat2 - lat1)
        delta_lambda = math.radians(lon2 - lon1)

        a = math.sin(delta_phi / 2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    distancia = calcular_distancia_metros(lat, lon, lat_etapa, lon_etapa)

    if distancia > 300:
        return jsonify({"error": f"Estás a {int(distancia)} m de la etapa. Debes estar a menos de 300 m para subir la foto."}), 403

    # Paso 3: Subir imagen
    upload_result = cloudinary.uploader.upload(file_to_upload)
    imagen_url = upload_result['secure_url']

    nueva_etapa = {
        "id_etapa": id_etapa,
        "fecha": fecha,
        "imagen": imagen_url
    }

    # Paso 4: Insertar en el usuario
    user = mongo.db.usuarios.find_one({
        "_id": ObjectId(id_usuario),
        "caminos.id_camino": ObjectId(id_camino)
    })

    if user:
        mongo.db.usuarios.update_one(
            {
                "_id": ObjectId(id_usuario),
                "caminos.id_camino": ObjectId(id_camino)
            },
            {
                "$push": {
                    "caminos.$.etapas_completadas": nueva_etapa
                }
            }
        )
    else:
        mongo.db.usuarios.update_one(
            {"_id": ObjectId(id_usuario)},
            {
                "$push": {
                    "caminos": {
                        "id_camino": ObjectId(id_camino),
                        "etapas_completadas": [nueva_etapa]
                    }
                }
            }
        )

    return jsonify({
        "mensaje": "Imagen subida y etapa registrada correctamente.",
        "imagen_url": imagen_url
    }), 200

@caminos.route('/caminos_usuario', methods=['GET'])
def caminos_usuario():
    usuario_id = request.args.get('usuario_id')
    
    if not usuario_id:
        return jsonify({"error": "ID de usuario no proporcionado"}), 400

    try:
        print("ID de usuario recibido:", ObjectId(usuario_id))
        usuario = mongo.db.usuarios.find_one({"_id": ObjectId(usuario_id)})
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404

        caminos_completados = usuario.get('caminos', [])

        caminos_serializados = []
        for camino in caminos_completados:
            camino_id = camino.get('id_camino')
            camino_serializado = {
                'id_camino': str(camino_id) if camino_id else None,
                'etapas_completadas': camino.get('etapas_completadas', [])
            }
        caminos_serializados.append(camino_serializado)
        print("Caminos serializados:", caminos_serializados)
        return jsonify(caminos_serializados), 200


    except InvalidId:
        return jsonify({"error": "ID de usuario inválido"}), 400

    except Exception as e:
        print("Error en /caminos_usuario:", e)
        return jsonify({"error": "Error interno del servidor"}), 500


@caminos.route('/get_camino', methods=['GET'])
def get_camino():
    id_camino = request.args.get('id_camino')
    if not id_camino:
        return jsonify({"error": "ID de camino no proporcionado"}), 400
    try:
        camino = mongo.db.caminos.find_one({"_id": ObjectId(id_camino)})
        if not camino:
            return jsonify({"error": "Camino no encontrado"}), 404

        # Convertir ObjectId a str
        camino['_id'] = str(camino['_id'])
        return jsonify(camino), 200
    except InvalidId:
        return jsonify({"error": "ID de camino inválido"}), 400