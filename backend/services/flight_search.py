import json
from pathlib import Path

def search_flights(intent: dict) -> list:
   data_path = Path(__file__).resolve().parents[2] / "data" / "flights.json"
   with open(data_path, "r", encoding="utf-8") as f:
            flights_data = json.load(f)["flights"]

            print("FIRST FLIGHT DATA:", flights_data[0])  # Print the first flight data for debugging

            results = []
            for flight in flights_data:
                if flight["from"] != intent["origin"]: continue
                if flight["to"] != intent["destination"]: continue
                if flight["date"] != intent["date"]: continue
                if intent.get("baggage"):
                    baggage_kg = int(flight["baggage"].replace("kg", "").strip())

                if baggage_kg < intent["baggage"]: continue

                results.append(flight)

            if intent.get("preference") == "cheapest":
                results.sort(key=lambda flight: flight["price"])

            return results

    