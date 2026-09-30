"use client";
import {useEffect, useState } from "react";

export default function Home() {
  
  const [isSearching, setIsSearching] = useState(false);  
  const [searchComplete, setSearchComplete] = useState(false);
  const [analysisSteps, setAnalysisSteps] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);  
  const [showApproval, setShowApproval] = useState(false);  
  const [bookingComplete, setBookingComplete] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  const [query, setQuery] = useState("I want to fly from Brussels to Kolkata 02 Oct 2026. Show me the cheapest reasonable option with 20kg baggage.");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/flights')
      .then((response) => response.json())
      .then((data) => setFlights(data.flights))
      .catch((error) => console.error('Error fetching flights:', error));
  }, []);

  const handleSearch = async () => {
        console.log('Searching for flights with query:', query);
        setIsSearching(true);
        setSearchComplete(false);
        setSelectedFlight(null);
        setShowApproval(false);
        setBookingComplete(false);
        setAnalysisSteps(1);
        setTimeout(() => setAnalysisSteps(2), 1000);
        setTimeout(() => setAnalysisSteps(3), 2000);
        setTimeout(() => setAnalysisSteps(4), 2500);
        setTimeout(() => setAnalysisSteps(5), 3000);
        setTimeout(() => {
            setIsSearching(false);
            setSearchComplete(true);
        }, 3500);

        const response = await fetch('http://127.0.0.1:8000/api/search?query=${encodeURIComponent(query)}', {
            method: 'POST' 
        });

        const data = await response.json();
        console.log('Search results:', data);
    }

  const handleSelectFlight = (flightId: number) => {
  
    setSelectedFlight(flightId);
    setShowApproval(true);
  };

  const handleBooking = () => { 
      setBookingComplete(true); 
  };

  const selectedFlightDetails = flights.find(flight => flight.id === selectedFlight);

  return (    

      <main className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-6xl px-8 py-10">
                <div className="mb-10">
                      <p className="text-sm font-medium text-blue-400">ENTERPRISE AI EXPERIENCE PLATFORM</p>
                      <h1 className="mt-3 text-4xl font-semibold tracking-tight"> AI Travel Assistant </h1>
                      <p className="mt-3 max-w-2xl text-slate-400">Express your travel intent. Let AI find, compare and prepare the right travel options for you.</p>
                  </div>
                      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                          <label className="text-sm font-medium text-slate-300">What would you like to accomplish?</label>
                          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                              <input type="text" 
                                    defaultValue="I want to fly from Brussels to Kolkata next 02 Oct 2026. Show me the cheapest reasonable option with 20kg baggage."
                                    className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"/>
                              <button onClick={handleSearch} disabled={isSearching} className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSearching ? 'Searching...' : 'Find Flights'}
                              </button>
                          </div>
                      </div>
                    {isSearching && ( 
                        <div className="mt-6 rounded-2xl border border-blue-900/50 bg-slate-900 p-6">
                          <h2 className="text-lg font-medium"> AI is understanding your travel intent... </h2>
                          <div className="mt-6 space-y-4 text-sm text-slate-300">
                              { analysisSteps === 1 && (
                              <p className="text-green-400">1. Understanding origin and destination</p>
                              )}
                              { analysisSteps === 2 && (
                              <p className="text-green-400">2. Identifying travel date</p>
                              )}
                              { analysisSteps === 3 && (
                              <p className="text-green-400">3. Applying economy class preference</p>
                              )}
                              { analysisSteps === 4 && (
                              <p className="text-green-400">4. Applying 20kg baggage requirement</p>
                              )}
                              { analysisSteps === 5 && (
                              <p className="text-green-400">5. Searching and comparing flight options...</p>
                              )}
                          </div>
                        </div>)}

                  {searchComplete && !bookingComplete && ( 
                      <div className="mt-6 space-y-6">
                        <div className="rounded-2xl border border-green-900/50 bg-slate-900 p-6">
                        <h2 className="text-lg font-semibold">Travel Options Generated</h2>
                        <p className="mt-2 text-sm text-slate-400">AI found options based on your travel intent.</p>
                      </div>
                      <div className="grid gap-4 md:grid-cols-4">
                          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                <p className="text-xs text-slate-500">FROM</p>
                                <p className="mt-2 text-lg font-semibold">Brussels</p>
                          </div>
                          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                <p className="text-xs text-slate-500">TO</p>
                                <p className="mt-2 text-lg font-semibold">Kolkata</p>
                          </div>
                          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                <p className="text-xs text-slate-500">DATE</p>
                                <p className="mt-2 text-lg font-semibold">02 Oct 2026</p>              
                          </div>
                          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                <p className="text-xs text-slate-500">BAGGAGE</p>
                                <p className="mt-2 text-lg font-semibold">20kg</p>
                          </div>
                      </div>
                      <div>
                            <h2 className="mb-4 text-xl font-semibold">Recommended Flights</h2>
                            <div className="space-y-4">
                             {flights.map((flight) => (
    <div
      key={flight.id}
      className={`rounded-2xl border p-6 ${
        selectedFlight === flight.id
          ? "border-blue-500 bg-blue-950/30"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <div>
          <p className="text-lg font-semibold">
            Flight Option {flight.id}
          </p>

          <p className="mt-2 text-slate-300">
            {flight.from} to {flight.to}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {flight.departure} to {flight.arrival} | 1 stop via{" "}
            {flight.layover} | {flight.duration} | {flight.baggage} baggage
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-3xl font-semibold">
            {flight?.currencySymbol} {flight.price}
          </p>

          <p className="mt-1 text-sm text-green-400">
            {flight.id === 6 ? "Lowest price" : "Available option"}
          </p>

          <button
            onClick={() => handleSelectFlight(flight.id)}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium hover:bg-blue-500"
          >
            Select Flight
          </button>
        </div>
      </div>
    </div>
  ))}
                    </div>
                </div>
            {showApproval && !bookingComplete && (
                <div className="rounded-2xl border border-yellow-900/50 bg-slate-900 p-6">
                <h2 className="text-lg font-semibold">Review Before Booking</h2>
                <p className="mt-2 text-sm text-slate-400">AI has prepared the booking. Your approval is required before the transaction.</p>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div>
                          <p className="text-sm text-slate-500">Selected Flight</p>
                          <p className="mt-2 font-semibold">Flight Option {selectedFlightDetails?.id}</p>
                    </div>
                    <div>
                          <p className="text-sm text-slate-500">Passenger</p>
                          <p className="mt-2 font-semibold">1 Passenger </p>
                    </div>
                    <div>                    
                          <p className="text-sm text-slate-500">Total</p>
                          <p className="mt-2 text-xl font-semibold">{selectedFlightDetails?.currencySymbol} {selectedFlightDetails?.price}</p>
                    </div>
                </div>
                <div className="mt-6 flex gap-3">
                      <button onClick={() => { setShowApproval(false); setSelectedFlight(null); }} className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium hover:bg-slate-800">Change Flight</button>
                      <button onClick={handleBooking} className="rounded-xl bg-green-600 px-5 py-3 text-sm font-medium hover:bg-green-500">Approve and Book</button>
                </div>
              </div>)}
          </div>)}

        {bookingComplete && ( 
              <div className="mt-6 rounded-2xl border border-green-900/50 bg-slate-900 p-6">
               <h2 className="text-xl font-semibold">Booking Completed</h2>
               <p className="mt-2 text-sm text-slate-400">The approved travel action has been completed.</p>
               <div className="mt-6 space-y-4">
                    <div className="flex justify-between border-b border-slate-800 pb-3">
                          <span className="text-slate-500">Route</span>
                          <span>{selectedFlightDetails?.from} to {selectedFlightDetails?.to}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-3">
                          <span className="text-slate-500">Flight</span>
                          <span> Option {selectedFlightDetails?.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-3">
                          <span className="text-slate-500">Amount</span>
                          <span> {selectedFlightDetails?.currencySymbol}{selectedFlightDetails?.price}</span>
                    </div>
                </div>
                <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">AUDIT LOG</p>
                      <div className="mt-4 space-y-2 text-sm">
                          <p><span className="text-slate-500">Action: </span>{" "} CREATE_FLIGHT_BOOKING </p>
                          <p><span className="text-slate-500">Status: </span>{" "} <span className="text-green-400"> APPROVED </span> </p>
                          <p><span className="text-slate-500">Approval: </span>{" "} Human-in-the-loop </p>
                      </div>
                 </div>
          </div>)}
      </div>
</main>);
}