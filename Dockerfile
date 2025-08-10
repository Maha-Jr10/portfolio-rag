FROM python:3.10-slim

# Set working directory for backend
WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend and frontend files
COPY backend /app/backend
COPY frontend /app/frontend

# Expose Flask port
EXPOSE 5000

# Start the Flask app
CMD ["python", "app.py"]