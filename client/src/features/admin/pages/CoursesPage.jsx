"use client";

import * as React from "react";
import {
  FileIcon,
  MoreHorizontalIcon,
  PlusIcon,
  UploadIcon,
  Trash2Icon,
  PencilIcon,
} from "lucide-react";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialCourses = [
  {
    id: 1,
    instrument: "Piano",
    level: "Beginner",
    files: ["Piano Beginner Module.pdf", "Piano Exercises.pdf"],
  },
  {
    id: 2,
    instrument: "Guitar",
    level: "Intermediate",
    files: ["Guitar Chords.pdf", "Guitar Practice Sheet.pdf"],
  },
  {
    id: 3,
    instrument: "Violin",
    level: "Beginner",
    files: ["Violin Beginner Guide.pdf"],
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = React.useState(initialCourses);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingCourse, setEditingCourse] = React.useState(null);

  const [form, setForm] = React.useState({
    instrument: "",
    level: "",
    files: [],
  });

  const openAdd = () => {
    setEditingCourse(null);

    setForm({
      instrument: "",
      level: "",
      files: [],
    });

    setDialogOpen(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);

    setForm({
      instrument: course.instrument,
      level: course.level,
      files: course.files,
    });

    setDialogOpen(true);
  };

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    setForm((current) => ({
      ...current,
      files: [...current.files, ...selectedFiles.map((file) => file.name)],
    }));
  };

  const removeFile = (fileName) => {
    setForm((current) => ({
      ...current,
      files: current.files.filter((file) => file !== fileName),
    }));
  };

  const saveCourse = () => {
    if (!form.instrument.trim() || !form.level.trim()) return;

    const course = {
      id: editingCourse ? editingCourse.id : Date.now(),
      instrument: form.instrument.trim(),
      level: form.level.trim(),
      files: form.files,
    };

    if (editingCourse) {
      setCourses((current) =>
        current.map((item) => (item.id === editingCourse.id ? course : item)),
      );
    } else {
      setCourses((current) => [...current, course]);
    }

    setDialogOpen(false);
    setEditingCourse(null);

    setForm({
      instrument: "",
      level: "",
      files: [],
    });
  };

  const deleteCourse = (id) => {
    setCourses((current) => current.filter((course) => course.id !== id));
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
              <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>

              <p className="text-muted-foreground">
                Manage course materials for students and instructors.
              </p>
            </div>

            <Button onClick={openAdd}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </div>

          {/* Course Table */}
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>

              <CardDescription>
                Upload and manage learning materials for each instrument and
                level.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Materials</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        {/* Instrument */}
                        <TableCell>
                          <span className="font-medium">
                            {course.instrument}
                          </span>
                        </TableCell>

                        {/* Level */}
                        <TableCell>
                          <Badge variant="outline">{course.level}</Badge>
                        </TableCell>

                        {/* Files */}
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {course.files.length > 0 ? (
                              course.files.map((file) => (
                                <div
                                  key={file}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <FileIcon className="h-4 w-4 text-muted-foreground" />

                                  <span>{file}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                No materials uploaded
                              </span>
                            )}
                          </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={<Button variant="ghost" size="icon" />}
                              >
                                <MoreHorizontalIcon />

                                <span className="sr-only">Course actions</span>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => openEdit(course)}
                                >
                                  <PencilIcon />
                                  Edit Course
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => deleteCourse(course.id)}
                                >
                                  <Trash2Icon />
                                  Delete Course
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {courses.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No courses found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Add / Edit Course */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? "Edit Course" : "Add Course"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-5 py-4">
                {/* Instrument */}
                <div className="grid gap-2">
                  <Label htmlFor="instrument">Instrument</Label>

                  <Input
                    id="instrument"
                    placeholder="e.g. Piano"
                    value={form.instrument}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        instrument: event.target.value,
                      })
                    }
                  />
                </div>

                {/* Level */}
                <div className="grid gap-2">
                  <Label htmlFor="level">Level</Label>

                  <Input
                    id="level"
                    placeholder="e.g. Beginner"
                    value={form.level}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        level: event.target.value,
                      })
                    }
                  />
                </div>

                {/* Files */}
                <div className="grid gap-2">
                  <Label>Course Materials</Label>

                  <label
                    htmlFor="course-files"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center hover:bg-muted/50"
                  >
                    <UploadIcon className="mb-2 h-6 w-6 text-muted-foreground" />

                    <span className="text-sm font-medium">Upload files</span>

                    <span className="mt-1 text-xs text-muted-foreground">
                      Add PDFs, documents, music sheets, or other materials.
                    </span>

                    <Input
                      id="course-files"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFiles}
                    />
                  </label>

                  {/* Selected files */}
                  {form.files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {form.files.map((file) => (
                        <div
                          key={file}
                          className="flex items-center justify-between rounded-md border p-2"
                        >
                          <div className="flex items-center gap-2">
                            <FileIcon className="h-4 w-4 text-muted-foreground" />

                            <span className="text-sm">{file}</span>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => removeFile(file)}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>

                <Button onClick={saveCourse}>
                  {editingCourse ? "Save Changes" : "Add Course"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
