import { useState } from "react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import {
  DoorOpen,
  Plus,
  Pencil,
  Trash2,
  PhilippinePeso,
} from "lucide-react";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RoomRentalsPage() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Studio Room A",
      rate: 300,
      hours: 2,
    },
    {
      id: 2,
      name: "Studio Room B",
      rate: 300,
      hours: 2,
    },
    {
      id: 3,
      name: "Piano Room",
      rate: 500,
      hours: 2,
    },
    {
      id: 4,
      name: "Recording Room",
      rate: 800,
      hours: 3,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [form, setForm] = useState({
    name: "",
    rate: "",
    hours: "",
  });

  const openAdd = () => {
    setEditingRoom(null);

    setForm({
      name: "",
      rate: "",
      hours: "",
    });

    setDialogOpen(true);
  };

  const openEdit = (room) => {
    setEditingRoom(room);

    setForm({
      name: room.name,
      rate: room.rate,
      hours: room.hours,
    });

    setDialogOpen(true);
  };

  const saveRoom = () => {
    if (!form.name.trim()) return;
    if (!form.rate || !form.hours) return;

    const room = {
      id: editingRoom ? editingRoom.id : Date.now(),
      name: form.name,
      rate: Number(form.rate),
      hours: Number(form.hours),
    };

    if (editingRoom) {
      setRooms((currentRooms) =>
        currentRooms.map((item) =>
          item.id === editingRoom.id ? room : item,
        ),
      );
    } else {
      setRooms((currentRooms) => [
        ...currentRooms,
        room,
      ]);
    }

    setDialogOpen(false);
  };

  const deleteRoom = (id) => {
    setRooms((currentRooms) =>
      currentRooms.filter((room) => room.id !== id),
    );
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

        <div className="flex flex-1 flex-col gap-6 p-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                Room Rentals
              </h1>

              <p className="text-sm text-muted-foreground">
                Set the rental price and duration for each room.
              </p>
            </div>

            <Button onClick={openAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Room Rental
            </Button>
          </div>

          {/* Summary */}
          <div className="grid gap-4 md:grid-cols-2">

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-primary/10 p-3">
                  <DoorOpen className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Rooms
                  </p>

                  <p className="text-2xl font-bold">
                    {rooms.length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                  <PhilippinePeso className="h-5 w-5 text-green-600" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Rental Rates
                  </p>

                  <p className="text-2xl font-bold">
                    {rooms.length}
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Rental Rates */}
          <Card>
            <CardHeader>
              <CardTitle>
                Room Rental Rates
              </CardTitle>

              <CardDescription>
                Each room can have its own rental price and duration.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>

                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Rental Rate</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price per Hour</TableHead>
                      <TableHead className="text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>

                        {/* Room */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="rounded-md bg-muted p-2">
                              <DoorOpen className="h-4 w-4" />
                            </div>

                            <span className="font-medium">
                              {room.name}
                            </span>
                          </div>
                        </TableCell>

                        {/* Rate */}
                        <TableCell>
                          <span className="font-medium">
                            ₱{room.rate.toLocaleString()}
                          </span>
                        </TableCell>

                        {/* Duration */}
                        <TableCell>
                          {room.hours}{" "}
                          {room.hours === 1
                            ? "hour"
                            : "hours"}
                        </TableCell>

                        {/* Hourly Rate */}
                        <TableCell>
                          ₱
                          {Math.round(
                            room.rate / room.hours,
                          ).toLocaleString()}
                          /hour
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex justify-end gap-2">

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                openEdit(room)
                              }
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() =>
                                deleteRoom(room.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                          </div>
                        </TableCell>

                      </TableRow>
                    ))}

                    {rooms.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-24 text-center"
                        >
                          No room rental rates configured.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>

                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Add / Edit Dialog */}
          <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          >
            <DialogContent>

              <DialogHeader>
                <DialogTitle>
                  {editingRoom
                    ? "Edit Room Rental"
                    : "Add Room Rental"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">

                {/* Room */}
                <div className="space-y-2">
                  <Label>Room Name</Label>

                  <Input
                    placeholder="e.g. Studio Room A"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Rate */}
                <div className="space-y-2">
                  <Label>Rental Rate</Label>

                  <div className="relative">
                    <PhilippinePeso className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      type="number"
                      min="0"
                      placeholder="300"
                      value={form.rate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          rate: e.target.value,
                        })
                      }
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Hours */}
                <div className="space-y-2">
                  <Label>Duration</Label>

                  <Input
                    type="number"
                    min="1"
                    placeholder="2"
                    value={form.hours}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hours: e.target.value,
                      })
                    }
                  />

                  <p className="text-xs text-muted-foreground">
                    Example: ₱300 for 2 hours.
                  </p>
                </div>

              </div>

              <DialogFooter>

                <Button
                  variant="outline"
                  onClick={() =>
                    setDialogOpen(false)
                  }
                >
                  Cancel
                </Button>

                <Button onClick={saveRoom}>
                  {editingRoom
                    ? "Save Changes"
                    : "Add Room Rental"}
                </Button>

              </DialogFooter>

            </DialogContent>
          </Dialog>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
