import os
import certifi
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_session import Session
from extensions import mongo
from routes.caminos import caminos
from routes.usuarios import usuarios
from routes.compras import compras
import requests

app = Flask(__name__, static_folder="static", static_url_path="/")

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
app.register_blueprint(compras, url_prefix='/api/compras')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    static_file = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(static_file):
        return send_from_directory(app.static_folder, path)
    else:
        # Aquí siempre servimos index.html para que React gestione la ruta en frontend
        return send_from_directory(app.static_folder, 'index.html')



if __name__ == "__main__":
    # Ejecutar Flask con debug para mejor depuración
    app.run(host="0.0.0.0", port=5000, debug=True)
