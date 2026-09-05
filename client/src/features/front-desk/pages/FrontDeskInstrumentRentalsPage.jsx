"use client";

import { FileIcon, ChevronDown } from "lucide-react";
import { useState } from "react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const rentals = [
  {
    id: "RNT-001",
    student: "Juan Dela Cruz",
    email: "juan@example.com",
    instrument: "Yamaha Grand Piano",
    type: "Piano",
    rentalDate: "Sep 10, 2026",
    returnDate: "Sep 17, 2026",
    status: "Pending",
  },
  {
    id: "RNT-002",
    student: "Maria Santos",
    email: "maria@example.com",
    instrument: "Fender Acoustic Guitar",
    type: "Guitar",
    rentalDate: "Sep 11, 2026",
    returnDate: "Sep 18, 2026",
    status: "Approved",
  },
  {
    id: "RNT-003",
    student: "Pedro Reyes",
    email: "pedro@example.com",
    instrument: "Yamaha Violin",
    type: "Violin",
    rentalDate: "Sep 12, 2026",
    returnDate: "Sep 19, 2026",
    status: "Pending",
  },
  {
    id: "RNT-004",
    student: "Ana Garcia",
    email: "ana@example.com",
    instrument: "Fender Electric Guitar",
    type: "Guitar",
    rentalDate: "Sep 13, 2026",
    returnDate: "Sep 20, 2026",
    status: "Rejected",
  },
];

export default function RentalsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRentals =
    statusFilter === "All"
      ? rentals
      : rentals.filter((rental) => rental.status === statusFilter);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col gap-6 p-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-semibold">Rentals</h1>

            <p className="text-muted-foreground">
              Review and manage instrument rental requests.
            </p>
          </div>

          {/* Rental Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>Rental Requests</CardTitle>

                  <CardDescription>
                    View and manage all instrument rental requests.
                  </CardDescription>
                </div>

                {/* Status Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[140px] justify-between"
                    >
                      {statusFilter === "All" ? "All Rentals" : statusFilter}

                      <ChevronDown className="ml-2 size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                      All Rentals
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setStatusFilter("Pending")}
                    >
                      Pending
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setStatusFilter("Approved")}
                    >
                      Approved
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setStatusFilter("Rejected")}
                    >
                      Rejected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rental ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Rental Period</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px] text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredRentals.length > 0 ? (
                      filteredRentals.map((rental) => (
                        <TableRow key={rental.id}>
                          {/* Rental ID */}
                          <TableCell className="font-medium">
                            {rental.id}
                          </TableCell>

                          {/* Student */}
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {rental.student}
                              </div>

                              <div className="text-sm text-muted-foreground">
                                {rental.email}
                              </div>
                            </div>
                          </TableCell>

                          {/* Instrument */}
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {rental.instrument}
                              </div>

                              <div className="text-sm text-muted-foreground">
                                {rental.type}
                              </div>
                            </div>
                          </TableCell>

                          {/* Rental Period */}
                          <TableCell>
                            <div>
                              <div>{rental.rentalDate}</div>

                              <div className="text-sm text-muted-foreground">
                                to {rental.returnDate}
                              </div>
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <Badge
                              variant={
                                rental.status === "Approved"
                                  ? "default"
                                  : rental.status === "Rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {rental.status}
                            </Badge>
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="View rental details"
                            >
                              <FileIcon className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No rental requests found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
