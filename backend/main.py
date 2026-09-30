from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
from services.intent_parser import parse_travel_intent
from services.flight_search import search_flights

app = FastAPI(title="Enterprise AI Experience Platform")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("../data/flights.json", "r", encoding="utf-8") as f:
    flights_data = json.load(f)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "enterprise-ai-backend"
    }


@app.post("/api/search")
def flight_search(query: str):
    print(f"Received query: {query}")
    intent = parse_travel_intent(query)
    print(f"Parsed intent: {intent}")
    if not intent:
        return {"error": "Could not parse travel intent from the query."}

    flights = search_flights(intent)
    return {
        "intent": intent,
        "flights": flights
    }

@app.get("/api/flights")
def get_flights():
    return flights_data
