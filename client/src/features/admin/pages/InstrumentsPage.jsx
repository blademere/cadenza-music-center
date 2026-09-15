"use client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const instruments = [
  {
    id: "INS-001",
    name: "Yamaha Grand Piano",
    type: "Piano",
    condition: "Good",
    status: "Available",
  },
  {
    id: "INS-002",
    name: "Fender Acoustic Guitar",
    type: "Guitar",
    condition: "Good",
    status: "In Use",
  },
  {
    id: "INS-003",
    name: "Yamaha Violin",
    type: "Violin",
    condition: "Needs Maintenance",
    status: "Maintenance",
  },
];

export default function InstrumentsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [instrumentName, setInstrumentName] = useState("");
  const [instrumentType, setInstrumentType] = useState("");
  const [instrumentCondition, setInstrumentCondition] = useState("Good");
  const [instrumentStatus, setInstrumentStatus] = useState("Available");

  const filtered = instruments.filter((instrument) => {
    const matchesSearch = `${instrument.name} ${instrument.type}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Categories" || instrument.type === category;

    return matchesSearch && matchesCategory;
  });

  const handleAddInstrument = () => {
    console.log({
      name: instrumentName,
      type: instrumentType,
      condition: instrumentCondition,
      status: instrumentStatus,
    });

    setShowAddDialog(false);

    setInstrumentName("");
    setInstrumentType("");
    setInstrumentCondition("Good");
    setInstrumentStatus("Available");
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Instruments</h1>

              <p className="text-muted-foreground">
                Manage instruments and their availability.
              </p>
            </div>

            <Button onClick={() => setShowAddDialog(true)}>
              <PlusIcon />
              Add Instrument
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Instrument List</CardTitle>

              <CardDescription>
                All instruments currently registered in the system.
              </CardDescription>

              <div className="flex items-center justify-between gap-2 pt-4">
                <div className="relative max-w-sm flex-1">
                  <SearchIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />

                  <Input
                    className="pl-9"
                    placeholder="Search instrument..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category..." />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="All Categories">
                      All Categories
                    </SelectItem>
                    <SelectItem value="Piano">Piano</SelectItem>
                    <SelectItem value="Guitar">Guitar</SelectItem>
                    <SelectItem value="Violin">Violin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filtered.map((instruments) => (
                      <TableRow key={instruments.id}>
                        <TableCell className="font-medium">
                          {instruments.name}
                        </TableCell>
                        <TableCell>{instruments.type}</TableCell>
                        <TableCell>{instruments.condition}</TableCell>
                        <TableCell>{instruments.status}</TableCell>

                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Instrument</DialogTitle>

                <DialogDescription>
                  Add a new instrument to the system.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-5 py-4">
                {/* Instrument Name */}
                <div className="grid gap-2">
                  <Label htmlFor="instrument-name">Instrument Name</Label>

                  <Input
                    id="instrument-name"
                    placeholder="e.g. Yamaha Grand Piano"
                    value={instrumentName}
                    onChange={(event) => setInstrumentName(event.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="grid gap-2">
                  <Label>Category</Label>

                  <Select
                    value={instrumentType}
                    onValueChange={setInstrumentType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Piano">Piano</SelectItem>
                      <SelectItem value="Guitar">Guitar</SelectItem>
                      <SelectItem value="Violin">Violin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleAddInstrument}
                  disabled={!instrumentName.trim() || !instrumentType}
                >
                  Add Instrument
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
