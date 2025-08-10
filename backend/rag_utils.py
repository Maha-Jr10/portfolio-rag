import pandas as pd
import numpy as np
import faiss
import ollama
import os

# Configuration
EMBEDDING_MODEL = "mxbai-embed-large"  # Ollama embedding model name
LLM_MODEL = "llama3.2"                # Ollama LLM model name
CSV_FILE = "portfolio.csv"
INDEX_FILE = "embeddings.faiss"

if not os.path.exists(CSV_FILE):
    raise FileNotFoundError(f"CSV file '{CSV_FILE}' not found.")
portfolio = pd.read_csv(CSV_FILE)
documents = [f"{row['Category']}: {row['Details']}" for _, row in portfolio.iterrows()]

# Load or create FAISS index
def get_ollama_embeddings(texts, model=EMBEDDING_MODEL):
    # Use Ollama's local API to get embeddings for a list of texts
    embeddings = []
    for text in texts:
        response = ollama.embeddings(model=model, prompt=text)
        embeddings.append(response["embedding"])
    return np.array(embeddings)

def load_or_create_index():
    if os.path.exists(INDEX_FILE):
        index = faiss.read_index(INDEX_FILE)
        print("Loaded existing FAISS index")
    else:
        # Create new index using Ollama embeddings
        embeddings = get_ollama_embeddings(documents)
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(embeddings.astype(np.float32))
        faiss.write_index(index, INDEX_FILE)
        print("Created and saved new FAISS index")
    return index

index = load_or_create_index()

def get_rag_response(query, k=3):
    # Embed query using Ollama
    query_embed = get_ollama_embeddings([query])

    # Search index
    distances, indices = index.search(query_embed.astype(np.float32), k)

    # Get context
    context = "\n\n".join([documents[i] for i in indices[0]])

    # Generate response
    prompt = f"""You are an AI assistant for Muhammed John's portfolio.
Answer the question concisely using ONLY the following context:

{context}

Question: {query}

If the context doesn't contain the answer, reply: 'I don't have that information in my portfolio data. Contact muhammedjohn3@gmail.com'."""

    try:
        response = ollama.generate(
            model=LLM_MODEL,
            prompt=prompt,
            options={'temperature': 0.6}
        )
        return response.get('response', str(response))
    except Exception as e:
        return f"Error generating response: {e}"