import os
import certifi
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_session import Session
from extensions import mongo
from routes.caminos import caminos
from routes.usuarios import usuarios
import requests

app = Flask(__name__)

# CORS: permitir todas las rutas y orígenes con soporte para credenciales
#CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
CORS(app)

# Configuración MongoDB Atlas (solo Atlas, sin local)
app.config["MONGO_URI"] = "mongodb+srv://victor:vnh2002q@santiago.bzig3gy.mongodb.net/santiago?retryWrites=true&w=majority&appName=santiago"

# Claves de seguridad (puedes usar variables de entorno si quieres)
app.config['JWT_SECRET_KEY'] = 'clave_secreta'
app.config['SECRET_KEY'] = 'clave_secreta'

# Configuración de sesiones en sistema de ficheros
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = os.path.abspath('./flask_session')
os.makedirs(app.config['SESSION_FILE_DIR'], exist_ok=True)

# Inicialización de extensiones
jwt = JWTManager(app)
mongo.init_app(app)
Session(app)

# Variables entorno para certificados SSL MongoDB Atlas
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()

# Registro de Blueprints
app.register_blueprint(caminos, url_prefix='/api/caminos')
app.register_blueprint(usuarios, url_prefix='/api/usuarios')

if __name__ == "__main__":
    # Ejecutar Flask con debug para mejor depuración
    app.run(host="0.0.0.0", port=5000, debug=True)
