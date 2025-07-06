from flask import Blueprint, jsonify
from bson.objectid import ObjectId
from extensions import mongo
import os
from flask import request
import bcrypt
import cloudinary
import cloudinary.uploader
from cloudinary import api

usuarios = Blueprint('usuarios', __name__)

cloudinary.config(
    cloud_name= os.getenv('Cloudname'),
    api_key=os.getenv('Apikey'),
    api_secret= os.getenv('Apisecret')
)

@usuarios.route('/crear_usuario', methods=['POST'])
def crear_usuario():
    # En formulario multipart, los datos no están en JSON sino en form y files
    nombre = request.form.get('nombre')
    apellidos = request.form.get('apellidos')
    foto = request.files.get('foto')
    password = request.form.get('password')
    gmail = request.form.get('email')
    publico = request.form.get('publico')

    print(f"Datos recibidos: {nombre}, {apellidos}, {gmail}, {foto}, {password}")
    if not all([nombre, apellidos, foto, password, gmail]):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400
    
    if mongo.db.usuarios.find_one({'gmail': gmail}):
        return jsonify({'error': 'El correo ya está registrado'}), 409
    
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Subir foto a Cloudinary
    upload_result = cloudinary.uploader.upload(foto)
    imagen_url = upload_result['secure_url']

    nuevo_usuario = {
        "nombre": nombre,
        "apellidos": apellidos,
        "foto": imagen_url,
        "contrasena": hashed_pw.decode('utf-8'),
        "gmail": gmail,
        "nivel": 1,
        "logros": [],
        "caminos": [],
        "distancia_recorrida": 0.0,
        "publico": publico,
        "seguidores": [],
        "siguiendo": [],
        "solicitudesSeguimiento": [],
    }

    mongo.db.usuarios.insert_one(nuevo_usuario)
    return jsonify({'mensaje': 'Usuario creado exitosamente'}), 201


@usuarios.route('login', methods=['POST'])
def login_usuario():
    data = request.get_json()

    gmail = data.get('email')
    contrasena = data.get('password')

    if not gmail or not contrasena:
        return jsonify({'error': 'Faltan el correo o la contraseña'}), 400

    # Buscar usuario por correo
    usuario = mongo.db.usuarios.find_one({'gmail': gmail})

    if not usuario:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    # Verificar contraseña
    if bcrypt.checkpw(contrasena.encode('utf-8'), usuario['contrasena'].encode('utf-8')):
        # Devuelve solo algunos datos, sin la contraseña
        del usuario['contrasena']
        del usuario['caminos']
        usuario['_id'] = str(usuario['_id'])
        return jsonify({'mensaje': 'Inicio de sesión exitoso', 'usuario': usuario}), 200
    else:
        return jsonify({'error': 'Contraseña incorrecta'}), 401

@usuarios.route('/actualizar_distancia', methods=['POST'])
def actualizar_distancia_recorrida():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    distancia = data.get('distancia_recorrida')

    if not usuario_id or not distancia:
        return jsonify({'error': 'Faltan el ID del usuario o la distancia'}), 400

    try:
        distancia = float(distancia)
    except ValueError:
        return jsonify({'error': 'La distancia debe ser un número'}), 400

    mongo.db.usuarios.update_one(
        {'_id': ObjectId(usuario_id)},
        {'$inc': {'distancia_recorrida': distancia}}
    )

    return jsonify({'mensaje': 'Distancia actualizada exitosamente'}), 200

@usuarios.route('/actualizar_nivel', methods=['POST'])
def actualizar_nivel_usuario():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    nuevo_nivel = data.get('nivel')

    if not usuario_id or not nuevo_nivel:
        return jsonify({'error': 'Faltan el ID del usuario o el nuevo nivel'}), 400

    try:
        nuevo_nivel = int(nuevo_nivel)
    except ValueError:
        return jsonify({'error': 'El nivel debe ser un número entero'}), 400

    mongo.db.usuarios.update_one(
        {'_id': ObjectId(usuario_id)},
        {'$inc': {'nivel': nuevo_nivel}}
    )

    return jsonify({'mensaje': 'Nivel actualizado exitosamente'}), 200


@usuarios.route('/get_usuario', methods=['GET'])
def get_usuario():
    usuario_id = request.args.get('usuario_id')

    if not usuario_id:
        return jsonify({'error': 'ID de usuario no proporcionado'}), 400

    try:
        usuario = mongo.db.usuarios.find_one({'_id': ObjectId(usuario_id)})
        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        # Convertir ObjectId a string
        usuario['_id'] = str(usuario['_id'])

        # Serializar caminos y dentro likes y comentarios
        for camino in usuario.get('caminos', []):
            camino['id_camino'] = str(camino.get('id_camino', ''))

            for etapa in camino.get('etapas_completadas', []):
                if 'id_etapa' in etapa and isinstance(etapa['id_etapa'], ObjectId):
                    etapa['id_etapa'] = str(etapa['id_etapa'])

                if 'likes' in etapa:
                    etapa['likes'] = [str(uid) for uid in etapa['likes']]

                if 'comentarios' in etapa:
                    for comentario in etapa['comentarios']:
                        if 'usuario_id' in comentario:
                            comentario['usuario_id'] = str(comentario['usuario_id'])

        # Serializar seguidores, siguiendo y solicitudesSeguimiento
        usuario['seguidores'] = [str(uid) for uid in usuario.get('seguidores', [])]
        usuario['siguiendo'] = [str(uid) for uid in usuario.get('siguiendo', [])]
        usuario['solicitudesSeguimiento'] = [str(uid) for uid in usuario.get('solicitudesSeguimiento', [])]

        return jsonify(usuario), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    

@usuarios.route('/seguir', methods=['POST'])
def seguir_usuario():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    usuario_a_seguir_id = data.get('usuario_a_seguir_id')

    if not usuario_id or not usuario_a_seguir_id:
        return jsonify({'error': 'Faltan el ID del usuario o el usuario a seguir'}), 400

    if usuario_id == usuario_a_seguir_id:
        return jsonify({'error': 'No puedes seguirte a ti mismo'}), 400

    try:
        usuario_a_seguir = mongo.db.usuarios.find_one({'_id': ObjectId(usuario_a_seguir_id)})

        if not usuario_a_seguir:
            return jsonify({'error': 'Usuario a seguir no encontrado'}), 404

        if usuario_a_seguir.get('publico', False):
            # Perfil público: seguir directamente
            mongo.db.usuarios.update_one(
                {'_id': ObjectId(usuario_id)},
                {'$addToSet': {'siguiendo': ObjectId(usuario_a_seguir_id)}}
            )
            mongo.db.usuarios.update_one(
                {'_id': ObjectId(usuario_a_seguir_id)},
                {'$addToSet': {'seguidores': ObjectId(usuario_id)}}
            )
            return jsonify({'mensaje': 'Usuario seguido exitosamente'}), 200
        else:
            # Perfil privado: crear solicitud pendiente
            mongo.db.usuarios.update_one(
                {'_id': ObjectId(usuario_a_seguir_id)},
                {'$addToSet': {'solicitudesSeguimiento': ObjectId(usuario_id)}}
            )
            return jsonify({'mensaje': 'Solicitud de seguimiento enviada'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@usuarios.route('/gestionar_solicitud', methods=['POST'])
def gestionar_solicitud():
    data = request.get_json()
    usuario_privado_id = data.get('usuario_privado_id')          # quien recibe la solicitud
    solicitante_id = data.get('solicitante_id')                  # quien envió la solicitud
    accion = data.get('accion')                                  # 'aceptar' o 'rechazar'

    if not usuario_privado_id or not solicitante_id or accion not in ['aceptar', 'rechazar']:
        return jsonify({'error': 'Faltan datos o acción inválida'}), 400

    try:
        usuario_privado = mongo.db.usuarios.find_one({'_id': ObjectId(usuario_privado_id)})
        if not usuario_privado:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        if ObjectId(solicitante_id) not in usuario_privado.get('solicitudesSeguimiento', []):
            return jsonify({'error': 'Solicitud no encontrada'}), 404

        if accion == 'aceptar':
            # Añadir seguidores/siguiendo
            mongo.db.usuarios.update_one(
                {'_id': ObjectId(usuario_privado_id)},
                {
                    '$addToSet': {'seguidores': ObjectId(solicitante_id)},
                    '$pull': {'solicitudesSeguimiento': ObjectId(solicitante_id)}
                }
            )
            mongo.db.usuarios.update_one(
                {'_id': ObjectId(solicitante_id)},
                {'$addToSet': {'siguiendo': ObjectId(usuario_privado_id)}}
            )
            return jsonify({'mensaje': 'Solicitud aceptada, ahora eres seguidor'}), 200

        else:  # rechazar
            mongo.db.usuarios.update_one(
                {'_id': ObjectId(usuario_privado_id)},
                {'$pull': {'solicitudesSeguimiento': ObjectId(solicitante_id)}}
            )
            return jsonify({'mensaje': 'Solicitud rechazada'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@usuarios.route('/get_usuarios', methods=['GET'])
def get_usuarios():
    usuarios = list(mongo.db.usuarios.find({}, {'contrasena': 0}))

    for usuario in usuarios:
        usuario['_id'] = str(usuario['_id'])
        caminos_serializados = []
        for camino in usuario.get('caminos', []):
            camino_id = camino.get('id_camino')
            etapas_completadas = camino.get('etapas_completadas', [])

            for etapa in etapas_completadas:
                # Serializar likes
                if 'likes' in etapa:
                    etapa['likes'] = [str(user_id) for user_id in etapa['likes']]
                # Serializar comentarios
                if 'comentarios' in etapa:
                    for comentario in etapa['comentarios']:
                        if 'usuario_id' in comentario:
                            comentario['usuario_id'] = str(comentario['usuario_id'])
                        # También podrías formatear la fecha si quieres

                # Serializar id_etapa si es ObjectId
                if 'id_etapa' in etapa and isinstance(etapa['id_etapa'], ObjectId):
                    etapa['id_etapa'] = str(etapa['id_etapa'])

            caminos_serializados.append({
                'id_camino': str(camino_id) if camino_id else None,
                'etapas_completadas': etapas_completadas
            })

        usuario['caminos'] = caminos_serializados

        usuario['seguidores'] = [str(s) for s in usuario.get('seguidores', [])]
        usuario['siguiendo'] = [str(s) for s in usuario.get('siguiendo', [])]
        usuario['solicitudesSeguimiento'] = [str(s) for s in usuario.get('solicitudesSeguimiento', [])]

    return jsonify(usuarios), 200
