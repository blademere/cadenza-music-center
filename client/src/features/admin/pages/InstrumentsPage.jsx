"use client";

import { PlusIcon, GuitarIcon } from "lucide-react";

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

            <Button>
              <PlusIcon />
              Add Instrument
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {instruments.map((instrument) => (
              <Card key={instrument.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <GuitarIcon className="size-5 text-muted-foreground" />

                    <Badge>{instrument.status}</Badge>
                  </div>

                  <CardTitle>{instrument.name}</CardTitle>

                  <CardDescription>{instrument.type}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID</span>
                    <span>{instrument.id}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Condition</span>
                    <span>{instrument.condition}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
