"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// ✅ Define the TypeScript interface for an inquiry
interface Inquiry {
  id: string;
  fullName: string;
  departure: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  email: string;
  phone: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]); // ✅ Specify the type

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch("/api/inquiries");
        if (!response.ok) throw new Error("Failed to fetch inquiries");
        const data: Inquiry[] = await response.json(); // ✅ Ensure TypeScript knows the response type
        setInquiries(data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle>Flight Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Departure Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>{inquiry.fullName}</TableCell>
                    <TableCell>{inquiry.departure}</TableCell>
                    <TableCell>{inquiry.destination}</TableCell>
                    <TableCell>{new Date(inquiry.departureDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {inquiry.returnDate ? new Date(inquiry.returnDate).toLocaleDateString() : "N/A"}
                    </TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.phone}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
