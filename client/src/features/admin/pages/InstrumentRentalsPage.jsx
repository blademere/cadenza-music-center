"use client";

import * as React from "react";
import {
  GuitarIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  PhilippinePesoIcon,
} from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const initialRates = [
  {
    id: 1,
    instrument: "Yamaha F310 Guitar",
    price: 300,
    duration: 2,
    unit: "hours",
  },
  {
    id: 2,
    instrument: "Suzuki Violin 220",
    price: 400,
    duration: 1,
    unit: "days",
  },
  {
    id: 3,
    instrument: "Yamaha Keyboard",
    price: 500,
    duration: 3,
    unit: "days",
  },
  {
    id: 4,
    instrument: "Acoustic Guitar",
    price: 200,
    duration: 1,
    unit: "hours",
  },
  {
    id: 5,
    instrument: "Digital Piano",
    price: 600,
    duration: 2,
    unit: "hours",
  },
];

export default function InstrumentRentalsPage() {
  const [rates, setRates] = React.useState(initialRates);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingRate, setEditingRate] = React.useState(null);

  const [form, setForm] = React.useState({
    instrument: "",
    price: "",
    duration: "",
    unit: "hours",
  });

  const openAdd = () => {
    setEditingRate(null);

    setForm({
      instrument: "",
      price: "",
      duration: "",
      unit: "hours",
    });

    setDialogOpen(true);
  };

  const openEdit = (rate) => {
    setEditingRate(rate);

    setForm({
      instrument: rate.instrument,
      price: rate.price,
      duration: rate.duration,
      unit: rate.unit,
    });

    setDialogOpen(true);
  };

  const saveRate = () => {
    if (!form.instrument.trim()) return;
    if (!form.price || !form.duration) return;

    const newRate = {
      id: editingRate ? editingRate.id : Date.now(),
      instrument: form.instrument,
      price: Number(form.price),
      duration: Number(form.duration),
      unit: form.unit,
    };

    if (editingRate) {
      setRates((current) =>
        current.map((rate) => (rate.id === editingRate.id ? newRate : rate)),
      );
    } else {
      setRates((current) => [...current, newRate]);
    }

    setDialogOpen(false);

    setForm({
      instrument: "",
      price: "",
      duration: "",
      unit: "hours",
    });

    setEditingRate(null);
  };

  const deleteRate = (id) => {
    setRates((current) => current.filter((rate) => rate.id !== id));
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
                Instrument Rental Rates
              </h1>

              <p className="text-muted-foreground">
                Set the rental price and time period for each instrument.
              </p>
            </div>

            <Button onClick={openAdd}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Rental Rate
            </Button>
          </div>

          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardDescription>
                    Instruments with Rental Rates
                  </CardDescription>

                  <CardTitle className="text-2xl">{rates.length}</CardTitle>
                </div>

                <GuitarIcon className="h-6 w-6 text-primary" />
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardDescription>Average Rental Price</CardDescription>

                  <CardTitle className="text-2xl">
                    ₱
                    {rates.length
                      ? Math.round(
                          rates.reduce((total, rate) => total + rate.price, 0) /
                            rates.length,
                        ).toLocaleString()
                      : 0}
                  </CardTitle>
                </div>

                <PhilippinePesoIcon className="h-6 w-6 text-green-600" />
              </CardHeader>
            </Card>
          </div>

          {/* Rental Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Rates</CardTitle>

              <CardDescription>
                Each instrument can have its own rental price and duration.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Rental Price</TableHead>
                      <TableHead>Time Period</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {rates.map((rate) => (
                      <TableRow key={rate.id}>
                        {/* Instrument */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="rounded-md bg-muted p-2">
                              <GuitarIcon className="h-4 w-4" />
                            </div>

                            <span className="font-medium">
                              {rate.instrument}
                            </span>
                          </div>
                        </TableCell>

                        {/* Price */}
                        <TableCell>
                          <span className="font-medium">
                            ₱{rate.price.toLocaleString()}
                          </span>
                        </TableCell>

                        {/* Duration */}
                        <TableCell>
                          {rate.duration}{" "}
                          {rate.unit === "hours"
                            ? rate.duration === 1
                              ? "hour"
                              : "hours"
                            : rate.duration === 1
                              ? "day"
                              : "days"}
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(rate)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => deleteRate(rate.id)}
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {rates.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No rental rates configured.
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
            <DialogContent className="sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle>
                  {editingRate ? "Edit Rental Rate" : "Add Rental Rate"}
                </DialogTitle>

                <DialogDescription>
                  Set the rental price and how long that price covers.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* Instrument */}
                <div className="grid gap-2">
                  <Label htmlFor="instrument">Instrument</Label>

                  <Input
                    id="instrument"
                    placeholder="e.g. Yamaha F310 Guitar"
                    value={form.instrument}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        instrument: event.target.value,
                      })
                    }
                  />
                </div>

                {/* Price */}
                <div className="grid gap-2">
                  <Label htmlFor="price">Rental Price</Label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      ₱
                    </span>

                    <Input
                      id="price"
                      type="number"
                      min="0"
                      placeholder="300"
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

                {/* Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>

                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      placeholder="2"
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
                    <Label>Unit</Label>

                    <Select
                      value={form.unit}
                      onValueChange={(value) =>
                        setForm({
                          ...form,
                          unit: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>

                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preview */}
                {form.price && form.duration && (
                  <div className="rounded-md bg-muted p-3 text-sm">
                    Rental price:
                    <strong className="ml-1">
                      ₱{Number(form.price).toLocaleString()}
                      {" / "}
                      {form.duration}{" "}
                      {form.unit === "hours"
                        ? Number(form.duration) === 1
                          ? "hour"
                          : "hours"
                        : Number(form.duration) === 1
                          ? "day"
                          : "days"}
                    </strong>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>

                <Button onClick={saveRate}>
                  {editingRate ? "Save Changes" : "Add Rental Rate"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
