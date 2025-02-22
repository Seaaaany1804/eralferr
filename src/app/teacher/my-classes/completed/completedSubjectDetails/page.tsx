/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { AppSidebarTeacher } from '@/app/components/app-sidebar-teacher'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ExpressionCharts } from "@/components/expression-charts"

const completedSubjectDetails = () => {
  const [moods] = useState([
    { icon: "😲", percentage: "25.00", label: "Surprised", bgClass: "bg-gray-100/50", color: "text-orange-500" },
    { icon: "😊", percentage: "15.00", label: "Happy", bgClass: "bg-gray-100/50", color: "text-green-500" },
    { icon: "😐", percentage: "20.00", label: "Neutral", bgClass: "bg-gray-100/50", color: "text-blue-500" },
    { icon: "😢", percentage: "10.00", label: "Sad", bgClass: "bg-gray-100/50", color: "text-purple-500" },
    { icon: "🤢", percentage: "8.00", label: "Disgusted", bgClass: "bg-gray-100/50", color: "text-zinc-700" },
    { icon: "😡", percentage: "12.00", label: "Angry", bgClass: "bg-gray-100/50", color: "text-red-500" },
    { icon: "😨", percentage: "10.00", label: "Fearful", bgClass: "bg-gray-100/50", color: "text-slate-500" }
  ]);

  const students = [
    { id: 1, name: 'Emma Wilson', dominantExpression: 'Happy', average: 85 },
    { id: 2, name: 'James Anderson', dominantExpression: 'Neutral', average: 78 },
    { id: 3, name: 'Sophia Garcia', dominantExpression: 'Happy', average: 92 },
    { id: 4, name: 'Lucas Martinez', dominantExpression: 'Sad', average: 65 },
    { id: 5, name: 'Olivia Thompson', dominantExpression: 'Happy', average: 88 },
  ];

  const timelineItems = [
    { time: "8:00AM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    { time: "9:00AM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    { time: "10:00AM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    { time: "2:00PM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    { time: "3:00PM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." }
  ];

  return (
    <SidebarProvider>
      <AppSidebarTeacher />
      <SidebarInset>
        <div className="p-2 sm:p-4 md:p-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/teacher">My Classes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/teacher/my-classes/completed">Completed</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href='/teacher/my-classes/completed/completedSubjectDetails'>Computer Programming 1</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Computer Programming 1</h1>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">Close Semester</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Close This Semester?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will mark the class as finished for the semester. 
                    This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-auto sm:h-[165px] mb-6">
            <ExpressionCharts moods={moods} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-auto lg:h-[63vh]">
            <Card className="w-full">
              <CardContent className="p-4 sm:p-4 lg:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Lesson Plan</h2>
                <div className="overflow-y-auto max-h-[350px] sm:max-h-[400px] lg:max-h-[450px]">
                  <div className="space-y-16 sm:space-y-24 lg:space-y-32 px-2 sm:px-4">
                    {timelineItems.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="bg-black text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm w-fit">
                          {item.time}
                        </div>
                        
                        <div className="absolute left-16 sm:left-20 lg:left-24 top-0 h-full">
                          <div className="relative h-full">
                            <div className="absolute top-3 w-2 h-2 bg-black rounded-full"></div>
                            {index !== timelineItems.length - 1 && (
                              <div className="absolute top-4 left-1 w-0.5 h-[100px] sm:h-[125px] lg:h-[153px] bg-black"></div>
                            )}
                          </div>
                        </div>
                        
                        <div className="absolute left-24 sm:left-28 lg:left-32 top-1 flex flex-col max-w-[150px] sm:max-w-[200px] lg:max-w-none">
                          <span className="text-xs sm:text-sm text-gray-600">{item.title}</span>
                          <span className="text-xs sm:text-sm text-gray-800 line-clamp-3 sm:line-clamp-4">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  Student List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
                  <div className="w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">Name</TableHead>
                          <TableHead className="whitespace-nowrap">Dominant Expression</TableHead>
                          <TableHead className="whitespace-nowrap">Average</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="whitespace-nowrap">{student.name}</TableCell>
                            <TableCell className="whitespace-nowrap">{student.dominantExpression}</TableCell>
                            <TableCell className="whitespace-nowrap">{student.average}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default completedSubjectDetails