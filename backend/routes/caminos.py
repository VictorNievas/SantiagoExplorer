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
from datetime import datetime

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
            etapas_completadas = camino.get('etapas_completadas', [])

            # Serializar likes y comentarios en cada etapa
            for etapa in etapas_completadas:
                # Serializar lista de likes (ObjectId -> str)
                if 'likes' in etapa:
                    etapa['likes'] = [str(user_id) for user_id in etapa['likes']]
                # Serializar comentarios
                if 'comentarios' in etapa:
                    for comentario in etapa['comentarios']:
                        if 'usuario_id' in comentario:
                            comentario['usuario_id'] = str(comentario['usuario_id'])
                        # Puedes serializar otros campos si es necesario

                # Si quieres también serializar id_etapa, si es ObjectId
                if 'id_etapa' in etapa and isinstance(etapa['id_etapa'], ObjectId):
                    etapa['id_etapa'] = str(etapa['id_etapa'])

            camino_serializado = {
                'id_camino': str(camino_id) if camino_id else None,
                'etapas_completadas': etapas_completadas
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
    id_camino = request.args.get('camino_id')
    print("ID de camino recibido:", id_camino)
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

@caminos.route('/dar_like', methods=['POST'])
def dar_like():
    usuario_id = request.json.get('usuario_id')          # quien da el like
    otro_usuario_id = request.json.get('otro_usuario_id')# dueño del post
    camino_id = request.json.get('camino_id')
    etapa_id = int(request.json.get('etapa_id'))         # aseguramos que sea int

    if not all([usuario_id, camino_id, etapa_id, otro_usuario_id]):
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    try:
        # Validar que ambos usuarios existen
        if not mongo.db.usuarios.find_one({"_id": ObjectId(usuario_id)}):
            return jsonify({"error": "Usuario que da like no encontrado"}), 404

        if not mongo.db.usuarios.find_one({"_id": ObjectId(otro_usuario_id)}):
            return jsonify({"error": "Usuario dueño del post no encontrado"}), 404

        # Actualizar el documento usando filtro + positional operators
        result = mongo.db.usuarios.update_one(
            {
                "_id": ObjectId(otro_usuario_id),
                "caminos.id_camino": ObjectId(camino_id),
                "caminos.etapas_completadas.id_etapa": etapa_id,
                "caminos.etapas_completadas.likes": {"$ne": ObjectId(usuario_id)}  # para evitar likes repetidos
            },
            {
                "$addToSet": {
                    "caminos.$[camino].etapas_completadas.$[etapa].likes": ObjectId(usuario_id)
                }
            },
            array_filters=[
                {"camino.id_camino": ObjectId(camino_id)},
                {"etapa.id_etapa": etapa_id}
            ]
        )

        if result.modified_count == 0:
            return jsonify({"mensaje": "El usuario ya dio like o la etapa no existe"}), 200

        return jsonify({"mensaje": "Like registrado correctamente"}), 200

    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400
    
@caminos.route('/comentar_etapa', methods=['POST'])
def comentar_etapa():
    usuario_id = request.json.get('usuario_id')           # quien comenta
    otro_usuario_id = request.json.get('otro_usuario_id') # dueño del post
    camino_id = request.json.get('camino_id')
    etapa_id = int(request.json.get('etapa_id'))
    texto = request.json.get('texto')

    if not all([usuario_id, otro_usuario_id, camino_id, etapa_id, texto]):
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    try:
        # Validar que el usuario existe
        if not mongo.db.usuarios.find_one({"_id": ObjectId(usuario_id)}):
            return jsonify({"error": "Usuario que comenta no encontrado"}), 404

        if not mongo.db.usuarios.find_one({"_id": ObjectId(otro_usuario_id)}):
            return jsonify({"error": "Usuario dueño del post no encontrado"}), 404

        comentario = {
            "usuario_id": ObjectId(usuario_id),
            "texto": texto,
            "fecha": datetime.utcnow().isoformat()
        }

        result = mongo.db.usuarios.update_one(
            {
                "_id": ObjectId(otro_usuario_id),
                "caminos.id_camino": ObjectId(camino_id),
                "caminos.etapas_completadas.id_etapa": etapa_id
            },
            {
                "$push": {
                    "caminos.$[camino].etapas_completadas.$[etapa].comentarios": comentario
                }
            },
            array_filters=[
                {"camino.id_camino": ObjectId(camino_id)},
                {"etapa.id_etapa": etapa_id}
            ]
        )

        if result.modified_count == 0:
            return jsonify({"error": "Etapa no encontrada"}), 404

        return jsonify({"mensaje": "Comentario añadido correctamente"}), 200

    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400