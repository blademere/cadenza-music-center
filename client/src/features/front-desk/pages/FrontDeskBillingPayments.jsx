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

const transactions = [
  {
    id: "TXN-001",
    person: "Juan Dela Cruz",
    email: "juan@example.com",
    type: "Room Booking",
    details: "Practice Room 1",
    date: "Sep 10, 2026",
    amount: "₱300.00",
    method: "Cash",
    status: "Paid",
  },
  {
    id: "TXN-002",
    person: "Maria Santos",
    email: "maria@example.com",
    type: "Instrument Rental",
    details: "Fender Acoustic Guitar",
    date: "Sep 11, 2026",
    amount: "₱500.00",
    method: "GCash",
    status: "Paid",
  },
  {
    id: "TXN-003",
    person: "Pedro Reyes",
    email: "pedro@example.com",
    type: "Room Booking",
    details: "Music Room",
    date: "Sep 12, 2026",
    amount: "₱600.00",
    method: "Cash",
    status: "Pending",
  },
  {
    id: "TXN-004",
    person: "Ana Garcia",
    email: "ana@example.com",
    type: "Enrollment",
    details: "Beginner Guitar Program",
    date: "Sep 13, 2026",
    amount: "₱1,000.00",
    method: "GCash",
    status: "Paid",
  },
  {
    id: "TXN-005",
    person: "Carlos Mendoza",
    email: "carlos@example.com",
    type: "Instrument Rental",
    details: "Yamaha Violin",
    date: "Sep 14, 2026",
    amount: "₱400.00",
    method: "-",
    status: "Pending",
  },
];

export default function BillingPayments() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTransactions =
    statusFilter === "All"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.status === statusFilter,
        );

  const paidCount = transactions.filter(
    (transaction) => transaction.status === "Paid",
  ).length;

  const pendingCount = transactions.filter(
    (transaction) => transaction.status === "Pending",
  ).length;

  const roomBookingCount = transactions.filter(
    (transaction) => transaction.type === "Room Booking",
  ).length;

  const rentalCount = transactions.filter(
    (transaction) => transaction.type === "Instrument Rental",
  ).length;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col gap-6 p-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-semibold">Billing & Payments</h1>

            <p className="text-muted-foreground">
              Review payments and transaction records for students and clients.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Paid Transactions</CardDescription>

                <CardTitle className="text-2xl">{paidCount}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Completed payments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Payments</CardDescription>

                <CardTitle className="text-2xl">{pendingCount}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Awaiting payment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Room Bookings</CardDescription>

                <CardTitle className="text-2xl">{roomBookingCount}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Client booking transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Instrument Rentals</CardDescription>

                <CardTitle className="text-2xl">{rentalCount}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Client rental transactions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Records */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>Transaction Records</CardTitle>

                  <CardDescription>
                    View payment records for enrollments, room bookings, and
                    instrument rentals.
                  </CardDescription>
                </div>

                {/* Status Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[150px] justify-between"
                    >
                      {statusFilter === "All"
                        ? "All Transactions"
                        : statusFilter}

                      <ChevronDown className="ml-2 size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                      All Transactions
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setStatusFilter("Paid")}>
                      Paid
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setStatusFilter("Pending")}
                    >
                      Pending
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
                      <TableHead>Transaction ID</TableHead>

                      <TableHead>Student / Client</TableHead>

                      <TableHead>Service</TableHead>

                      <TableHead>Details</TableHead>

                      <TableHead>Date</TableHead>

                      <TableHead>Amount</TableHead>

                      <TableHead>Payment Method</TableHead>

                      <TableHead>Status</TableHead>

                      <TableHead className="w-[80px] text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => {
                        const isStudent = transaction.type === "Enrollment";

                        return (
                          <TableRow key={transaction.id}>
                            {/* Transaction ID */}
                            <TableCell className="font-medium">
                              {transaction.id}
                            </TableCell>

                            {/* Student / Client */}
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {transaction.person}
                                </div>

                                <div className="text-sm text-muted-foreground">
                                  {isStudent ? "Student" : "Client"} •{" "}
                                  {transaction.email}
                                </div>
                              </div>
                            </TableCell>

                            {/* Service */}
                            <TableCell>
                              <Badge variant="outline">
                                {transaction.type}
                              </Badge>
                            </TableCell>

                            {/* Details */}
                            <TableCell>{transaction.details}</TableCell>

                            {/* Date */}
                            <TableCell>{transaction.date}</TableCell>

                            {/* Amount */}
                            <TableCell className="font-medium">
                              {transaction.amount}
                            </TableCell>

                            {/* Payment Method */}
                            <TableCell>{transaction.method}</TableCell>

                            {/* Status */}
                            <TableCell>
                              <Badge
                                variant={
                                  transaction.status === "Paid"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {transaction.status}
                              </Badge>
                            </TableCell>

                            {/* Actions */}
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                title="View transaction"
                              >
                                <FileIcon className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No transaction records found.
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
