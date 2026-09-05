"use client";

import { useState } from "react";
import {  SearchIcon, MoreHorizontalIcon } from "lucide-react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

const students = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "09171234567",
    instrument: "Piano",
    instructor: "John Cruz",
    status: "Active",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "09181234567",
    instrument: "Guitar",
    instructor: "Mark Reyes",
    status: "Active",
  },
  {
    id: 3,
    name: "Sofia Garcia",
    email: "sofia@example.com",
    phone: "09191234567",
    instrument: "Violin",
    instructor: "Anna Lee",
    status: "Inactive",
  },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.instrument}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Students</h1>
              <p className="text-muted-foreground">
                Manage students registered at Cadenza Music Center.
              </p>
            </div>

          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                View and manage all registered students.
              </CardDescription>

              <div className="relative max-w-sm">
                <SearchIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {student.email}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>{student.phone}</TableCell>

                        <TableCell>{student.instrument}</TableCell>

                        <TableCell>{student.instructor}</TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              student.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
