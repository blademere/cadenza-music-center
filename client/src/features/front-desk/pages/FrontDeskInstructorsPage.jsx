"use client";

import { SearchIcon, File  } from "lucide-react";
import { useState } from "react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    query: "Update Schedule",
    status: "Active",
  },
  {
    id: 2,
    name: "Anna Lee",
    email: "anna@cadenzamusic.com",
    specialization: "Violin",
    students: 12,
    query: "Update Schedule",
    status: "Active",
  },
  {
    id: 3,
    name: "Mark Reyes",
    email: "mark@cadenzamusic.com",
    specialization: "Guitar",
    students: 15,
    status: "Active",
    query: "Update Schedule",
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
                Instructor's schedule approval.
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
              <div className="rounded-md border w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Query</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                      
                      <TableHead />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filtered.map((instructor) => (
                      <TableRow key={instructor.id}>
                        <TableCell className="font-medium">
                          {instructor.name}
                        </TableCell>

                        <TableCell>{instructor.query}</TableCell>

                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="hover:bg-muted">
                            <File />
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
