"use client";

import { PlusIcon, MoreHorizontalIcon } from "lucide-react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
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

const users = [
  {
    id: 1,
    name: "Front Desk",
    email: "staff@cadenzamusic.com",
    accountType: "Staff",
    status: "Active",
    lastLogin: "Today, 9:32 AM",
  },
  {
    id: 2,
    name: "John Cruz",
    email: "john@cadenzamusic.com",
    accountType: "Instructor",
    status: "Active",
    lastLogin: "Today, 8:45 AM",
  },
  {
    id: 3,
    name: "Anna Lee",
    email: "anna@cadenzamusic.com",
    accountType: "Instructor",
    status: "Active",
    lastLogin: "Yesterday",
  },
];

export default function UserManagementPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">User Management</h1>

              <p className="text-muted-foreground">
                Manage staff and instructor accounts.
              </p>
            </div>

            <Button>
              <PlusIcon />
              Add User
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>

              <CardDescription>
                Accounts that can access the Cadenza system.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Account Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>

                        <TableCell>{user.email}</TableCell>

                        <TableCell>
                          <Badge variant="outline">{user.accountType}</Badge>
                        </TableCell>

                        <TableCell>
                          <Badge>{user.status}</Badge>
                        </TableCell>

                        <TableCell>{user.lastLogin}</TableCell>

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
