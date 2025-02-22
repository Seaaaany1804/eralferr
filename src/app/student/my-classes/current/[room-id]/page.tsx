'use client'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarStudent } from "@/app/components/app-sidebar-student";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Book } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@radix-ui/react-separator";

// Dynamically import the FaceExpressionRecognition component with no SSR
const FaceExpressionRecognition = dynamic(
  () => import('@/app/components/face-expression-recognition'),
  { ssr: false } // This ensures the component only loads on client side
);

export default function Page() {
    // Set initial moods state
    const [moods, setMoods] = useState([
        { icon: "😲", percentage: "0.00", label: "Surprised", bgClass: "bg-gray-100/50" },
        { icon: "😊", percentage: "0.00", label: "Happy", bgClass: "bg-gray-100/50" },
        { icon: "😐", percentage: "0.00", label: "Neutral", bgClass: "bg-gray-100/50" },
        { icon: "😢", percentage: "0.00", label: "Sad", bgClass: "bg-gray-100/50" },
        { icon: "🤢", percentage: "0.00", label: "Disgusted", bgClass: "bg-gray-100/50" },
        { icon: "😡", percentage: "0.00", label: "Angry", bgClass: "bg-gray-100/50" },
        { icon: "😨", percentage: "0.00", label: "Fearful", bgClass: "bg-gray-100/50" }
    ]);
    
      const timelineItems = [
        { time: "8:00AM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { time: "9:00AM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { time: "10:00AM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { time: "2:00PM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { time: "3:00PM", title: "What is Java?", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." }
      ];

    const handleExpressionsDetected = (expressions: { [key: string]: number } | null) => {        
        if (expressions) {
          // Map expressions to moods and update state
            const updatedMoods = moods.map((mood) => {
                const expressionKey = mood.label.toLowerCase(); // Matching expression keys with mood labels
                const percentage = expressions[expressionKey] * 100 || 0; // Default to 0 if no match

                return {
                ...mood,
                percentage: percentage.toFixed(2), // Update the percentage to two decimal places
                };
            });

            // Update the state with the new moods array
            setMoods(updatedMoods);   
        } else {
            const updatedMoods = [
                { icon: "😲", percentage: "0.00", label: "Surprised", bgClass: "bg-gray-100/50" },
                { icon: "😊", percentage: "0.00", label: "Happy", bgClass: "bg-gray-100/50" },
                { icon: "😐", percentage: "0.00", label: "Neutral", bgClass: "bg-gray-100/50" },
                { icon: "😢", percentage: "0.00", label: "Sad", bgClass: "bg-gray-100/50" },
                { icon: "🤢", percentage: "0.00", label: "Disgusted", bgClass: "bg-gray-100/50" },
                { icon: "😡", percentage: "0.00", label: "Angry", bgClass: "bg-gray-100/50" },
                { icon: "😨", percentage: "0.00", label: "Fearful", bgClass: "bg-gray-100/50" }
            ];
            setMoods(updatedMoods);             
        }
      };

  const [currentTime, setCurrentTime] = useState(new Date());  
  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (    
    <SidebarProvider>
      <AppSidebarStudent />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="horizontal" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/student/my-classes/current">
                    List of Subjects
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    Current Subject Details
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>              
            </Breadcrumb>            
          </div>          
            {/* Right Side: Icons and Profile Picture */}
          <div className="flex items-center space-x-4">
             {/* Notification Bell with Counter */}
              <div className="relative">
                {/* Bell Icon */}
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Bell className="w-6 h-6 text-gray-600" />
                </button>
              </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Book size={24} className="text-black" />
                    <h1 className="text-black font-semibold text-lg">Computer Programming 1</h1>
                </div>             
                <p className="text-black font-semibold text-lg">Time: {currentTime.toLocaleTimeString()}</p>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {moods.map((mood, index) => (
                  <Card key={index} className="shadow-lg">
                    <CardContent className={`flex flex-col items-center justify-center p-2 sm:p-4 rounded-[7px] ${mood.bgClass}`}>                    
                      <p className="text-base sm:text-lg font-semibold text-gray-800">{mood.icon} {mood.label}</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-800">{mood.percentage} %</p>
                    </CardContent>
                  </Card>
                ))}
              </div>              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <Card className="col-span-1 shadow-lg">
                  <CardContent className="flex items-center justify-center p-2 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[570px]">
                    <FaceExpressionRecognition onExpressionsDetected={handleExpressionsDetected} />                      
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 shadow-lg">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-center">Lesson Plan</h2>
                    <div className="overflow-y-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[450px]">
                      <div className="space-y-12 sm:space-y-16 md:space-y-24 lg:space-y-32 px-2 sm:px-4">
                        {timelineItems.map((item, index) => (
                          <div key={index} className="relative">
                            <div className="bg-black text-white px-2 py-1 rounded text-xs sm:text-sm w-fit">
                              {item.time}
                            </div>
                            
                            <div className="absolute left-12 sm:left-16 md:left-20 lg:left-24 top-0 h-full">
                              <div className="relative h-full">
                                <div className="absolute top-3 w-2 h-2 bg-black rounded-full"></div>
                                {index !== timelineItems.length - 1 && (
                                  <div className="absolute top-4 left-1 w-0.5 h-[80px] sm:h-[100px] md:h-[125px] lg:h-[153px] bg-black"></div>
                                )}
                              </div>
                            </div>
                            
                            <div className="absolute left-20 sm:left-24 md:left-28 lg:left-32 top-1 flex flex-col max-w-[120px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-none">
                              <span className="text-xs sm:text-sm text-gray-600">{item.title}</span>
                              <span className="text-xs sm:text-sm text-gray-800 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">{item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>                                
              </div>
            </div>          
        </div>
      </SidebarInset>
    </SidebarProvider>    
  );
}