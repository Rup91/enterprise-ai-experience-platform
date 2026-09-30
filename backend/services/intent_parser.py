import re

def parse_travel_intent(text: str) -> dict:

    text_lower = text.lower()
    origin = "Brussels (BRU)" if "brussels" in text_lower else ("New York (JFK)" if "new york" in text_lower else None)
    destination = "Kolkata (CCU)" if "kolkata" in text_lower else ("Delhi (DEL)" if "delhi" in text_lower else None)

    date_match = re.search(r"(\d{2})\s*(october|november|december|oct|nov|dec)\s*(2026)", text_lower)

    date = None
    if date_match:
        day = date_match.group(1)
        month = date_match.group(2)
        year = date_match.group(3)
        month_map = {
            "october": "10", "november": "11", "december": "12",
            "oct": "10", "nov": "11", "dec": "12"
        }

        date = f"{year}-{month_map[month]}-{day}"
        baggage_match = re.search(r"(\d+)\s*kg", text_lower)

        baggage = None
        if baggage_match:
            baggage = int(baggage_match.group(1))

        preference = None
        if "non-stop" in text_lower or "direct" in text_lower:
            preference = "non-stop"
        elif "1 stop" in text_lower or "one stop" in text_lower:
            preference = "1 stop"
        elif "2 stops" in text_lower or "two stops" in text_lower:
            preference = "2 stops"
        elif "cheapest" in text_lower:
            preference = "cheapest"

        return {
            "origin": origin,
            "destination": destination,
            "date": date,
            "baggage": baggage,
            "preference": preference
        }