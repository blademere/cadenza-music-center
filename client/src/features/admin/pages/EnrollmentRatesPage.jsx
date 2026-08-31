"use client";

import * as React from "react";
import { BookOpenIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialPackages = [
  {
    id: 1,
    name: "Package 1",
    instruments: [
      "Piano",
      "Guitar",
      "Drums",
      "Ukulele",
      "Violin",
      "Bass Guitar",
    ],
    price: 1550,
    sessions: 4,
    duration: 1,
    frequency: 1,
  },
  {
    id: 2,
    name: "Package 2",
    instruments: [
      "Piano",
      "Guitar",
      "Drums",
      "Ukulele",
      "Violin",
      "Bass Guitar",
    ],
    price: 3000,
    sessions: 4,
    duration: 1,
    frequency: 2,
  },
  {
    id: 3,
    name: "Package 3",
    instruments: [
      "Piano",
      "Guitar",
      "Drums",
      "Ukulele",
      "Violin",
      "Bass Guitar",
    ],
    price: 4300,
    sessions: 4,
    duration: 1,
    frequency: 3,
  },
];

export default function EnrollmentRatesPage() {
  const [packages, setPackages] = React.useState(initialPackages);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingPackage, setEditingPackage] = React.useState(null);

  const [form, setForm] = React.useState({
    name: "",
    instruments: "",
    price: "",
    sessions: "",
    duration: "",
    frequency: "",
  });

  const openAdd = () => {
    setEditingPackage(null);

    setForm({
      name: "",
      instruments: "",
      price: "",
      sessions: "",
      duration: "",
      frequency: "",
    });

    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setEditingPackage(item);

    setForm({
      name: item.name,
      instruments: item.instruments.join(", "),
      price: item.price,
      sessions: item.sessions,
      duration: item.duration,
      frequency: item.frequency,
    });

    setDialogOpen(true);
  };

  const savePackage = () => {
    if (!form.name.trim()) return;
    if (!form.price || !form.sessions) return;

    const newPackage = {
      id: editingPackage ? editingPackage.id : Date.now(),

      name: form.name,

      instruments: form.instruments
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      price: Number(form.price),
      sessions: Number(form.sessions),
      duration: Number(form.duration) || 1,
      frequency: Number(form.frequency) || 1,
    };

    if (editingPackage) {
      setPackages((current) =>
        current.map((item) =>
          item.id === editingPackage.id ? newPackage : item,
        ),
      );
    } else {
      setPackages((current) => [...current, newPackage]);
    }

    setDialogOpen(false);
    setEditingPackage(null);

    setForm({
      name: "",
      instruments: "",
      price: "",
      sessions: "",
      duration: "",
      frequency: "",
    });
  };

  const deletePackage = (id) => {
    setPackages((current) => current.filter((item) => item.id !== id));
  };

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

        <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Enrollment Packages
              </h1>

              <p className="text-muted-foreground">
                Manage the packages available for student enrollment.
              </p>
            </div>

            <Button onClick={openAdd}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Package
            </Button>
          </div>

          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardDescription>Available Packages</CardDescription>

                  <CardTitle className="text-2xl">{packages.length}</CardTitle>
                </div>

                <BookOpenIcon className="h-6 w-6 text-primary" />
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardDescription>Package Price Range</CardDescription>

                  <CardTitle className="text-2xl">
                    ₱
                    {packages.length
                      ? Math.min(
                          ...packages.map((item) => item.price),
                        ).toLocaleString()
                      : 0}
                    {" - "}₱
                    {packages.length
                      ? Math.max(
                          ...packages.map((item) => item.price),
                        ).toLocaleString()
                      : 0}
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Packages */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Packages</CardTitle>

              <CardDescription>
                Packages that students can choose when enrolling.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package</TableHead>
                      <TableHead>Instruments</TableHead>
                      <TableHead>Monthly Price</TableHead>
                      <TableHead>Sessions</TableHead>
                      <TableHead>Session Duration</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {packages.map((item) => (
                      <TableRow key={item.id}>
                        {/* Package */}
                        <TableCell>
                          <span className="font-medium">{item.name}</span>
                        </TableCell>

                        {/* Instruments */}
                        <TableCell>
                          <div className="max-w-[350px] text-sm">
                            {item.instruments.join(", ")}
                          </div>
                        </TableCell>

                        {/* Price */}
                        <TableCell>
                          <span className="font-medium">
                            ₱{item.price.toLocaleString()}
                          </span>

                          <div className="text-xs text-muted-foreground">
                            per month
                          </div>
                        </TableCell>

                        {/* Sessions */}
                        <TableCell>{item.sessions} sessions</TableCell>

                        {/* Duration */}
                        <TableCell>
                          {item.duration}{" "}
                          {item.duration === 1 ? "hour" : "hours"}
                        </TableCell>

                        {/* Frequency */}
                        <TableCell>{item.frequency}x a week</TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(item)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => deletePackage(item.id)}
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {packages.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No enrollment packages configured.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Add / Edit Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingPackage
                    ? "Edit Enrollment Package"
                    : "Add Enrollment Package"}
                </DialogTitle>

                <DialogDescription>
                  Set the price, sessions, duration, and instruments included in
                  the package.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* Package Name */}
                <div className="grid gap-2">
                  <Label htmlFor="package-name">Package Name</Label>

                  <Input
                    id="package-name"
                    placeholder="e.g. Package 1"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                  />
                </div>

                {/* Instruments */}
                <div className="grid gap-2">
                  <Label htmlFor="instruments">Instruments / Courses</Label>

                  <Input
                    id="instruments"
                    placeholder="Piano, Guitar, Drums, Violin"
                    value={form.instruments}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        instruments: event.target.value,
                      })
                    }
                  />

                  <p className="text-xs text-muted-foreground">
                    Separate each instrument with a comma.
                  </p>
                </div>

                {/* Price */}
                <div className="grid gap-2">
                  <Label htmlFor="package-price">Monthly Price</Label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      ₱
                    </span>

                    <Input
                      id="package-price"
                      type="number"
                      min="0"
                      placeholder="1550"
                      className="pl-8"
                      value={form.price}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          price: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Sessions */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sessions">Sessions</Label>

                    <Input
                      id="sessions"
                      type="number"
                      min="1"
                      placeholder="4"
                      value={form.sessions}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          sessions: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="duration">Hours / Session</Label>

                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={form.duration}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          duration: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="frequency">Times / Week</Label>

                    <Input
                      id="frequency"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={form.frequency}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          frequency: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Preview */}
                {form.price &&
                  form.sessions &&
                  form.duration &&
                  form.frequency && (
                    <div className="rounded-md bg-muted p-3 text-sm">
                      <div className="font-medium">
                        {form.name || "Package"}
                      </div>

                      <div className="mt-1">
                        ₱{Number(form.price).toLocaleString()}
                        /month · {form.sessions} sessions · {form.duration}{" "}
                        {Number(form.duration) === 1 ? "hour" : "hours"} per
                        session · {form.frequency}x a week
                      </div>
                    </div>
                  )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>

                <Button onClick={savePackage}>
                  {editingPackage ? "Save Changes" : "Add Package"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
