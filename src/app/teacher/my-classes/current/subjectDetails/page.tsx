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
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarDays, Users, ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ExpressionCharts } from "@/components/expression-charts"
import { useState } from 'react'

const SubjectDetails = () => {
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
  ]

  const schedules = [
    { id: 1, date: '2024-02-20', time: '10:00 AM', status: 'Finished' },
    { id: 2, date: '2024-02-22', time: '2:00 PM', status: 'Upcoming' },
    { id: 3, date: '2024-02-19', time: '11:30 AM', status: 'Canceled' },
    { id: 4, date: '2024-02-25', time: '9:00 AM', status: 'Upcoming' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Finished':
        return 'bg-green-500'
      case 'Upcoming':
        return 'bg-blue-500'
      case 'Canceled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebarTeacher />
      <SidebarInset>
        <div className="p-2 sm:p-4 md:p-6">
        <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/my-classes">My Classes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/teacher/my-classes/current">Current</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href='/teacher/my-classes/current/subjectDetails'>Computer Programming 1</BreadcrumbLink>
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
                  Class Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
                  <div className="w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">Date</TableHead>
                          <TableHead className="whitespace-nowrap">Time</TableHead>
                          <TableHead className="whitespace-nowrap">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schedules.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell className="whitespace-nowrap">{schedule.date}</TableCell>
                            <TableCell className="whitespace-nowrap">{schedule.time}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={`${getStatusColor(schedule.status)} text-white whitespace-nowrap`}>
                                {schedule.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
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

export default SubjectDetails