/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Search } from "lucide-react";

export interface Subject {
  id: number;
  title: string;
  code: string;
  time: string;
  instructor: string;
  instructorimage: string;
  image: string;
  status: string;
  classId: string;
  teacherId?: string;
}

interface SubjectCardProps {
  subject: Subject;
  variant: "student" | "teacher";
  onViewStudents?: () => void;
}

interface Student {
  id: number;
  name: string;
  grade: string;
  section: string;
}

export const SubjectCard = ({ subject, variant, onViewStudents }: SubjectCardProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStudents, setCurrentStudents] = useState<Student[]>([
    { id: 7, name: "Anna Brown", grade: "Grade 10", section: "A" },
    { id: 8, name: "Michael Chen", grade: "Grade 10", section: "B" },
    { id: 9, name: "Sarah Johnson", grade: "Grade 10", section: "C" },
  ]);
  const [studentToRemove, setStudentToRemove] = useState<Student | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const availableStudents = [
    { id: 1, name: "Emma Wilson", grade: "Grade 10", section: "A" },
    { id: 2, name: "James Anderson", grade: "Grade 10", section: "B" },
    { id: 3, name: "Sophia Garcia", grade: "Grade 10", section: "A" },
    { id: 4, name: "Lucas Martinez", grade: "Grade 10", section: "C" },
    { id: 5, name: "Olivia Thompson", grade: "Grade 10", section: "B" },
    { id: 6, name: "William Lee", grade: "Grade 10", section: "A" },
  ];

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !currentStudents.some((selected) => selected.id === student.id)
  );

  const handleAddStudent = (student: Student) => {
    if (!currentStudents.some((selected) => selected.id === student.id)) {
      setCurrentStudents((prev) => [...prev, student]);
      setSearchQuery("");
    }
  };

  const handleRemoveInitiate = (student: Student) => {
    setStudentToRemove(student);
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = () => {
    if (studentToRemove) {
      setCurrentStudents((prev) => 
        prev.filter((student) => student.id !== studentToRemove.id)
      );
      setShowConfirmDialog(false);
      setStudentToRemove(null);
    }
  };

  const handleJoin = () => {
    const basePath = variant === "student" ? "/student" : "/teacher";
    router.push(`${basePath}/my-classes/current/${variant === "student" ? subject.classId : subject.teacherId}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={subject.image}
            alt={subject.title}
            className="w-full h-48 rounded-2xl object-cover"
          />
          <button 
            onClick={handleJoin}
            className={`absolute top-3 right-3 ${
              subject.status === 'ongoing' ? 'bg-white' : 'bg-gray-500'
            } text-black font-bold px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-100 transition-colors`}
          >
            Join
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold mb-2">
            {subject.title} - {subject.code}
          </h3>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={16} className="mr-2" />
            {subject.time}
          </div>
          <div className="flex items-center mt-3">
            <img 
              src={subject.instructorimage}
              alt={subject.instructor}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{subject.instructor}</span>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline" 
              className="flex-1"
              onClick={() => router.push(`/${variant}/my-classes/current/subjectDetails`)}
            >
              Details
            </Button>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  {variant === "student" ? "View Schedule" : "View Students"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {variant === "student" ? "Class Schedule" : "Manage Students"}
                  </DialogTitle>
                  <DialogDescription>
                    {variant === "student" 
                      ? `Weekly schedule for ${subject.title} - ${subject.code}`
                      : `Add or remove students from ${subject.title}`}
                  </DialogDescription>
                </DialogHeader>
                {variant === "student" ? (
                  <div className="space-y-4">
                    <div className="grid gap-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="flex items-center p-3 border rounded-lg">
                          <div className="w-24 font-medium">{day}</div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock size={16} className="text-gray-500" />
                            {day === 'Monday' || day === 'Thursday' ? (
                              <span>{subject.time}</span>
                            ) : (
                              <span className="text-gray-500">No class</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Current Students</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentStudents.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                          >
                            <span className="text-sm">{student.name}</span>
                            <button
                              aria-label='bell'
                              type="button"
                              onClick={() => handleRemoveInitiate(student)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {currentStudents.length === 0 && (
                          <p className="text-sm text-gray-500">No students added yet</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Add Students</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          type="text"
                          placeholder="Search students..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student) => (
                            <div
                              key={student.id}
                              className="p-2 border rounded hover:bg-secondary cursor-pointer"
                              onClick={() => handleAddStudent(student)}
                            >
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-500">
                                {student.grade} - Section {student.section}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-center py-2">No students found</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {showConfirmDialog && (
              <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Removal</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to remove {studentToRemove?.name} from this class?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleConfirmRemove}
                    >
                      Remove
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};