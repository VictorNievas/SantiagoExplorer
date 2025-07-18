from flask import Blueprint, jsonify
from bson.objectid import ObjectId
from extensions import mongo
import os
from flask import request
import bcrypt
import cloudinary
import cloudinary.uploader
from cloudinary import api
from datetime import datetime
import traceback

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
    publico_raw = request.form.get('publico')
    publico = publico_raw.lower() == 'true' if publico_raw else False

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
        "premium": False,
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
        del usuario['seguidores']
        del usuario['siguiendo']
        del usuario['solicitudesSeguimiento']
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

@usuarios.route('/get_solicitudes', methods=['GET'])
def get_solicitudes():
    usuario_id = request.args.get('usuario_id')

    if not usuario_id:
        return jsonify({'error': 'ID de usuario no proporcionado'}), 400

    try:
        usuario = mongo.db.usuarios.find_one({'_id': ObjectId(usuario_id)}, {'solicitudesSeguimiento': 1})
        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        solicitudes_ids = usuario.get('solicitudesSeguimiento', [])
        
        if not solicitudes_ids:
            return jsonify([]), 200

        # Buscar todos los usuarios con esos IDs de golpe
        solicitudes_usuarios = list(
            mongo.db.usuarios.find(
                {'_id': {'$in': solicitudes_ids}},
                {'nombre': 1, 'apellidos': 1, 'foto': 1}
            )
        )

        # Convertir ObjectId a string
        for s in solicitudes_usuarios:
            s['_id'] = str(s['_id'])

        return jsonify(solicitudes_usuarios), 200

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
            mongo.db.notificaciones.insert_one({
                "id_usuario_r": ObjectId(usuario_a_seguir_id),
                "tipo": "seguimiento",
                "id_usuario_e": ObjectId(usuario_id),
                "id_camino": None,
                "id_etapa": None,
                "fecha": datetime.now().isoformat(),
                "leido": False,
                "mensaje": f"{usuario_a_seguir['nombre']} {usuario_a_seguir['apellidos']} ha empezado a seguirte"
            })
            return jsonify({'mensaje': 'Usuario seguido exitosamente'}), 200
        else:
            # Perfil privado: crear solicitud pendiente
            mongo.db.usuarios.update_one(
                {'_id': ObjectId(usuario_a_seguir_id)},
                {'$addToSet': {'solicitudesSeguimiento': ObjectId(usuario_id)}}
            )
            mongo.db.notificaciones.insert_one({
                "id_usuario_r": ObjectId(usuario_a_seguir_id),
                "tipo": "solicitud",
                "id_usuario_e": ObjectId(usuario_id),
                "id_camino": None,
                "id_etapa": None,
                "fecha": datetime.now().isoformat(),
                "leido": False,
                "mensaje": f"{usuario_a_seguir['nombre']} {usuario_a_seguir['apellidos']} ha solicitado seguirte"
            })
            return jsonify({'mensaje': 'Solicitud de seguimiento enviada'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@usuarios.route('/dejar_seguir', methods=['POST'])
def dejar_seguir():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    usuario_a_dejar_id = data.get('usuario_a_dejar_id')

    if not usuario_id or not usuario_a_dejar_id:
        return jsonify({'error': 'Faltan el ID del usuario o el usuario a dejar de seguir'}), 400

    if usuario_id == usuario_a_dejar_id:
        return jsonify({'error': 'No puedes dejar de seguirte a ti mismo'}), 400

    try:
        usuario_a_dejar = mongo.db.usuarios.find_one({'_id': ObjectId(usuario_a_dejar_id)}, {'seguidores': 1})
        usuario = mongo.db.usuarios.find_one({'_id': ObjectId(usuario_id)}, {'siguiendo': 1})

        if not usuario_a_dejar:
            return jsonify({'error': 'Usuario a dejar de seguir no encontrado'}), 404
        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        # Eliminar usuario_id de los seguidores del usuario_a_dejar
        mongo.db.usuarios.update_one(
            {'_id': ObjectId(usuario_a_dejar_id)},
            {'$pull': {'seguidores': ObjectId(usuario_id)}}
        )

        # Eliminar usuario_a_dejar_id de la lista de seguidos del usuario
        mongo.db.usuarios.update_one(
            {'_id': ObjectId(usuario_id)},
            {'$pull': {'siguiendo': ObjectId(usuario_a_dejar_id)}}
        )

        return jsonify({'mensaje': 'Has dejado de seguir al usuario correctamente'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@usuarios.route('/cancelar_solicitud', methods=['POST'])
def cancelar_solicitud():
    data = request.get_json()
    usuario_id = data.get('usuario_id')  # El que envió la solicitud
    destinatario_id = data.get('destinatario_id')  # El que iba a recibir la solicitud

    if not usuario_id or not destinatario_id:
        return jsonify({'error': 'Faltan el ID del usuario o el destinatario'}), 400

    if usuario_id == destinatario_id:
        return jsonify({'error': 'No puedes cancelarte una solicitud a ti mismo'}), 400

    try:
        destinatario = mongo.db.usuarios.find_one({'_id': ObjectId(destinatario_id)}, {'solicitudesSeguimiento': 1})

        if not destinatario:
            return jsonify({'error': 'Usuario destinatario no encontrado'}), 404

        # Eliminar la solicitud del destinatario
        mongo.db.usuarios.update_one(
            {'_id': ObjectId(destinatario_id)},
            {'$pull': {'solicitudesSeguimineto': ObjectId(usuario_id)}}
        )
        return jsonify({'mensaje': 'Solicitud cancelada correctamente'}), 200

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
            mongo.db.notificaciones.insert_one({
                "id_usuario_r": ObjectId(solicitante_id),
                "tipo": "aceptacion",
                "id_usuario_e": ObjectId(usuario_privado_id),
                "id_camino": None,
                "id_etapa": None,
                "fecha": datetime.now().isoformat(),
                "leido": False,
                "mensaje": f"{usuario_privado['nombre']} {usuario_privado['apellidos']} ha aceptado tu solicitud de seguimiento"
            })
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


@usuarios.route('/marcar_notificaciones_leidas', methods=['POST'])
def marcar_leidas():
    usuario_id = request.json.get('usuario_id')
    if not usuario_id:
        return jsonify({"error": "ID de usuario no proporcionado"}), 400

    try:
        resultado = mongo.db.notificaciones.delete_many(
            {"id_usuario_r": ObjectId(usuario_id), "leido": False}
        )
        return jsonify({"mensaje": f"{resultado.deleted_count} notificaciones eliminadas"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@usuarios.route('/get_notificaciones', methods=['GET'])
def get_notificaciones():
    usuario_id = request.args.get('usuario_id')
    print(f"Obteniendo notificaciones para el usuario: {usuario_id}")

    if not usuario_id:
        return jsonify({"error": "ID de usuario no proporcionado"}), 400

    try:
        notificaciones = list(mongo.db.notificaciones.find(
            {"id_usuario_r": ObjectId(usuario_id), "leido": False},
        ).sort("fecha", -1))

        for n in notificaciones:
            n['_id'] = str(n['_id'])
            n['id_usuario_r'] = str(n.get('id_usuario_r', ''))
            n['id_usuario_e'] = str(n.get('id_usuario_e', ''))
            n['id_camino'] = str(n.get('id_camino', ''))
            # Solo convertir si es datetime
            if isinstance(n.get('fecha'), datetime):
                n['fecha'] = n['fecha'].isoformat()
        return jsonify(notificaciones), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@usuarios.route('/relacion', methods=['GET'])
def relacion():
    usuario_id_e = request.args.get('usuario_id_e')
    usuario_id_r = request.args.get('usuario_id_r')

    if not usuario_id_e or not usuario_id_r:
        return jsonify({"error": "Faltan IDs de usuario"}), 400
    
    try:
        SegSol = mongo.db.usuarios.find_one(
            {"_id": ObjectId(usuario_id_r)},
            {"seguidores": 1, "solicitudesSeguimiento": 1}
        )

        if not SegSol:
            return jsonify({"error": "Usuario receptor no encontrado"}), 404
        
        seguidores = SegSol.get('seguidores', [])
        solicitudes = SegSol.get('solicitudesSeguimiento', [])

        if ObjectId(usuario_id_e) in seguidores:
            return jsonify({"relacion": "siguiendo"}), 200
        elif ObjectId(usuario_id_e) in solicitudes:
            return jsonify({"relacion": "pendiente"}), 200
        else:
            return jsonify({"relacion": "ninguna"}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@usuarios.route('/actualizar_perfil', methods=['PUT'])
def actualizar_perfil():
    data = request.form
    usuario_id = data.get('usuario_id')
    nombre = data.get('nombre')
    apellidos = data.get('apellidos')
    foto = request.files.get('foto')
    publico_raw = data.get('publico')
    publico = publico_raw.lower() == 'true' if publico_raw else False
    if not usuario_id or not nombre or not apellidos:
        return jsonify({'error': 'Faltan campos obligatorios'}), 400
    try:
        mongo.db.usuarios.update_one(
            {"_id": ObjectId(usuario_id)},
            {"$set": {
                "nombre": nombre,
                "apellidos": apellidos,
                "publico": publico
            }}
        )
        if foto:
            # Subir nueva foto a Cloudinary
            upload_result = cloudinary.uploader.upload(foto)
            imagen_url = upload_result['secure_url']
            mongo.db.usuarios.update_one(
                {"_id": ObjectId(usuario_id)},
                {"$set": {"foto": imagen_url}}
            )
        return jsonify({'mensaje': 'Perfil actualizado exitosamente'}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

import bcrypt

@usuarios.route('/cambiar_password', methods=['PUT'])
def cambiar_password():
    data = request.get_json()

    usuario_id = data.get('usuario_id')
    password_actual = data.get('password_actual')
    password_nueva = data.get('password_nueva')

    if not usuario_id or not password_actual or not password_nueva:
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    try:
        usuario = mongo.db.usuarios.find_one({"_id": ObjectId(usuario_id)})
        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        hashed_password = usuario.get("contrasena")
        if not hashed_password:
            return jsonify({'error': 'No hay contraseña almacenada para este usuario'}), 400

        # bcrypt espera bytes, aseguramos la conversión
        if not bcrypt.checkpw(password_actual.encode('utf-8'), hashed_password.encode('utf-8')):
            return jsonify({'error': 'La contraseña actual es incorrecta'}), 401

        # Hashear la nueva contraseña
        nueva_password_hash = bcrypt.hashpw(password_nueva.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Actualizar en BD
        mongo.db.usuarios.update_one(
            {"_id": ObjectId(usuario_id)},
            {"$set": {"contrasena": nueva_password_hash}}
        )

        return jsonify({'mensaje': 'Contraseña actualizada correctamente'}), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
