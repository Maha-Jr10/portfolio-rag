from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from rag_utils import get_rag_response
import os

app = Flask(__name__, static_folder='../frontend/static')  # Configure static folder
CORS(app, resources={r"/query": {"origins": "*"}})

# Base directory setup
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')

# Serve static files (CSS, JS, etc.)
@app.route('/static/<path:subpath>')
def serve_static(subpath):
    static_dir = os.path.join(FRONTEND_DIR, 'static')
    file_path = os.path.join(static_dir, subpath)
    print(f"[DEBUG] Requested static file: {subpath}")
    print(f"[DEBUG] Resolved file path: {file_path}")
    print(f"[DEBUG] File exists: {os.path.exists(file_path)}")
    if os.path.exists(file_path):
        return send_file(file_path)
    else:
        return f"File not found: {subpath}", 404



# Serve frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path.startswith('query'):
        return handle_query()
    
    if path == "" or not os.path.exists(os.path.join(FRONTEND_DIR, path)):
        return send_from_directory(FRONTEND_DIR, 'index.html')
    return send_from_directory(FRONTEND_DIR, path)

# Keep your /query endpoint unchanged

# RAG query endpoint
@app.route('/query', methods=['POST'])
def handle_query():
    data = request.get_json()
    if not data or 'query' not in data:
        return jsonify({"error": "Missing query parameter"}), 400
        
    query = data['query']
    try:
        response = get_rag_response(query)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)