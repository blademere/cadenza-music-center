"use client";

import { SearchIcon, MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

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

const instructors = [
  {
    id: 1,
    name: "John Cruz",
    email: "john@cadenzamusic.com",
    specialization: "Piano",
    students: 18,
    status: "Active",
  },
  {
    id: 2,
    name: "Anna Lee",
    email: "anna@cadenzamusic.com",
    specialization: "Violin",
    students: 12,
    status: "Active",
  },
  {
    id: 3,
    name: "Mark Reyes",
    email: "mark@cadenzamusic.com",
    specialization: "Guitar",
    students: 15,
    status: "Active",
  },
];

export default function InstructorsPage() {
  const [search, setSearch] = useState("");

  const filtered = instructors.filter((instructor) =>
    `${instructor.name} ${instructor.specialization}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Instructors</h1>

              <p className="text-muted-foreground">
                Manage music instructors and their assigned students.
              </p>
            </div>

          </div>

          <Card>
            <CardHeader>
              <CardTitle>Instructor List</CardTitle>

              <CardDescription>
                All instructors currently registered in the system.
              </CardDescription>

              <div className="relative max-w-sm">
                <SearchIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />

                <Input
                  className="pl-9"
                  placeholder="Search instructors..."
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
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filtered.map((instructor) => (
                      <TableRow key={instructor.id}>
                        <TableCell className="font-medium">
                          {instructor.name}
                        </TableCell>

                        <TableCell>{instructor.email}</TableCell>

                        <TableCell>{instructor.specialization}</TableCell>

                        <TableCell>{instructor.students}</TableCell>

                        <TableCell>
                          <Badge>{instructor.status}</Badge>
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
