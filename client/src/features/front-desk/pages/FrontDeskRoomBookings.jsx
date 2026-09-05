"use client";

import { FileIcon, ChevronDown } from "lucide-react";
import { useState } from "react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

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

const roomBookings = [
  {
    id: "RB-001",
    student: "Juan Dela Cruz",
    email: "juan@example.com",
    room: "Practice Room 1",
    date: "Sep 10, 2026",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    status: "Pending",
  },
  {
    id: "RB-002",
    student: "Maria Santos",
    email: "maria@example.com",
    room: "Practice Room 2",
    date: "Sep 11, 2026",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Approved",
  },
  {
    id: "RB-003",
    student: "Pedro Reyes",
    email: "pedro@example.com",
    room: "Music Room",
    date: "Sep 12, 2026",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    status: "Pending",
  },
  {
    id: "RB-004",
    student: "Ana Garcia",
    email: "ana@example.com",
    room: "Practice Room 3",
    date: "Sep 13, 2026",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    status: "Rejected",
  },
];

export default function RoomBookingsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings =
    statusFilter === "All"
      ? roomBookings
      : roomBookings.filter(
          (booking) => booking.status === statusFilter
        );

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col gap-6 p-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-semibold">
              Room Bookings
            </h1>

            <p className="text-muted-foreground">
              Review and manage student room booking requests.
            </p>
          </div>

          {/* Room Bookings Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>Room Booking Requests</CardTitle>

                  <CardDescription>
                    View and manage all room booking requests.
                  </CardDescription>
                </div>

                {/* Status Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[140px] justify-between"
                    >
                      {statusFilter === "All"
                        ? "All Bookings"
                        : statusFilter}

                      <ChevronDown className="ml-2 size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("All")}
                    >
                      All Bookings
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
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px] text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          {/* Booking ID */}
                          <TableCell className="font-medium">
                            {booking.id}
                          </TableCell>

                          {/* Student */}
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {booking.student}
                              </div>

                              <div className="text-sm text-muted-foreground">
                                {booking.email}
                              </div>
                            </div>
                          </TableCell>

                          {/* Room */}
                          <TableCell>
                            {booking.room}
                          </TableCell>

                          {/* Date */}
                          <TableCell>
                            {booking.date}
                          </TableCell>

                          {/* Time */}
                          <TableCell>
                            <div>
                              <div>{booking.startTime}</div>

                              <div className="text-sm text-muted-foreground">
                                to {booking.endTime}
                              </div>
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <Badge
                              variant={
                                booking.status === "Approved"
                                  ? "default"
                                  : booking.status === "Rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="View booking details"
                            >
                              <FileIcon className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No room bookings found.
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
