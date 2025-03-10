"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore } from "date-fns";

export default function InquiryForm() {
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleDepartureDateChange = (date: Date | undefined) => {
    setDepartureDate(date);
    if (returnDate && date && isBefore(returnDate, date)) {
      setReturnDate(undefined);
    }
  };

  const handleReturnDateChange = (date: Date | undefined) => {
    if (departureDate && date && isBefore(date, departureDate)) {
      setError("Return date cannot be before departure date");
      return;
    }
    setError("");
    setReturnDate(date);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    const inquiryData = {
      departure,
      destination,
      departureDate,
      returnDate,
      fullName,
      email,
      phone,
    };
  
    const response = await fetch("/api/SendInquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiryData),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert("Inquiry submitted successfully!");
    } else {
      alert("Error submitting inquiry.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <CardHeader className="flex items-center justify-center text-4xl">
          <CardTitle>Flight Inquiry Form</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Top row: Departure & Destination locations and Dates */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="departure">Departure Location</Label>
                <Input
                  id="departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  placeholder="Enter departure city"
                  required
                />
              </div>
              <div>
                <Label htmlFor="destination">Destination Location</Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination city"
                  required
                />
              </div>
              <div>
                <Label>Departure Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Input
                      readOnly
                      value={
                        departureDate
                          ? format(departureDate, "PPP")
                          : "Select a date"
                      }
                      placeholder="Select departure date"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={handleDepartureDateChange}
                      className="cursor-pointer"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Input
                      readOnly
                      value={
                        returnDate ? format(returnDate, "PPP") : "Select a date"
                      }
                      placeholder="Select return date"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={handleReturnDateChange}
                      className="cursor-pointer"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* Bottom row: Personal Details */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Submit Inquiry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
