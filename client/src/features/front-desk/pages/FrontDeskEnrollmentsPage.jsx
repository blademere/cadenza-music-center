"use client";

import {  SearchIcon } from "lucide-react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";

import {File} from "lucide-react";

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

const enrollments = [
  {
    id: "ENR-001",
    student: "Maria Santos",
    course: "Piano Beginner",
    instructor: "John Cruz",
    rate: "₱4,000",
    startDate: "Aug 01, 2026",
    status: "Active",
    package: "2",
    instrument: "Piano"
  },
  {
    id: "ENR-002",
    student: "Juan Dela Cruz",
    course: "Guitar Intermediate",
    instructor: "Mark Reyes",
    rate: "₱4,500",
    startDate: "Aug 05, 2026",
    status: "Active",
    package: "3",
    instrument: "Guitar"
  },
];

export default function EnrollmentsPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Enrollments</h1>

              <p className="text-muted-foreground">
                Manage student course enrollments.
              </p>
            </div>

          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enrollment Records</CardTitle>

              <CardDescription>
                Students currently enrolled in music programs.
              </CardDescription>

              <div className="relative max-w-sm">
                <SearchIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />

                <Input className="pl-9" placeholder="Search enrollments..." />
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Enrollment</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {enrollments.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">
                          {enrollment.id}
                        </TableCell>

                        <TableCell>{enrollment.student}</TableCell>

                        <TableCell>{enrollment.package} {enrollment.instrument}</TableCell>

                        <TableCell>{enrollment.instructor}</TableCell>

                        <TableCell>
                          <File></File>
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
