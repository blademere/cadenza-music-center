"use client";

import * as React from "react";
import { DoorOpenIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const initialRooms = [
  {
    id: 1,
    name: "Room 101",
  },
  {
    id: 2,
    name: "Room 102",
  },
  {
    id: 3,
    name: "Room 103",
  },
];

export default function RoomsPage() {
  const [rooms, setRooms] = React.useState(initialRooms);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingRoom, setEditingRoom] = React.useState(null);

  const [roomName, setRoomName] = React.useState("");

  const openAdd = () => {
    setEditingRoom(null);
    setRoomName("");
    setDialogOpen(true);
  };

  const openEdit = (room) => {
    setEditingRoom(room);
    setRoomName(room.name);
    setDialogOpen(true);
  };

  const saveRoom = () => {
    if (!roomName.trim()) return;

    if (editingRoom) {
      setRooms((current) =>
        current.map((room) =>
          room.id === editingRoom.id
            ? {
                ...room,
                name: roomName.trim(),
              }
            : room,
        ),
      );
    } else {
      setRooms((current) => [
        ...current,
        {
          id: Date.now(),
          name: roomName.trim(),
        },
      ]);
    }

    setDialogOpen(false);
    setRoomName("");
    setEditingRoom(null);
  };

  const deleteRoom = (id) => {
    setRooms((current) => current.filter((room) => room.id !== id));
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
              <h1 className="text-2xl font-semibold tracking-tight">Rooms</h1>

              <p className="text-muted-foreground">
                Manage the rooms available at the music center.
              </p>
            </div>

            <Button onClick={openAdd}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </div>

          {/* Room List */}
          <Card>
            <CardHeader>
              <CardTitle>Room List</CardTitle>

              <CardDescription>Add, edit, or remove rooms.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>

                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="rounded-md bg-muted p-2">
                              <DoorOpenIcon className="h-4 w-4" />
                            </div>

                            <span className="font-medium">{room.name}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(room)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => deleteRoom(room.id)}
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {rooms.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No rooms added yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Add / Edit Room */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>
                  {editingRoom ? "Edit Room" : "Add Room"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-2 py-4">
                <Label className="text-sm text-muted-foreground">
                  Room Type
                </Label>
                <div className="grid gap-2 py-4">
                  <Label htmlFor="room-name">Room Name</Label>

                  <Input
                    id="room-name"
                    placeholder="e.g. Room 101"
                    value={roomName}
                    onChange={(event) => setRoomName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        saveRoom();
                      }
                    }}
                  />

                  <Label className="text-sm text-muted-foreground">
                    Room Type
                  </Label>

                  <Select >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a room type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Band Room">Band Room</SelectItem>

                      <SelectItem value="Class Session Room">
                        Class Session Room
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>

                <Button onClick={saveRoom}>
                  {editingRoom ? "Save Changes" : "Add Room"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
