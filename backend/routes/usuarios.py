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