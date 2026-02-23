/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Plus, Search, UserCheck, Users2, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import MetricCard from "@/components/shared/MetricCardDashboard";
import LoadingSpinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/core/CustomSelect/CustomSelect";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/api/dashboardApi";
import Link from "next/link";
import { CourseCard } from "./CourseCard";

const mapCourseStatus = (status: string): "active" | "deleted" => {
  if (status === "PUBLISHED") return "active";
  return "deleted";
};

const categories = [
  { value: "all", label: "All" },
  { value: "ISLAMIC_KNOWLEDGE", label: "Islamic Knowledge" },
  { value: "LIFE_SKILLS", label: "Life Skills" },
  { value: "PERSONAL_DEVELOPMENT", label: "Personal Development" },
  { value: "ARABIC", label: "Arabic" },
];

const CoursesManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  console.log("categories", category);

  const { data: response, isLoading } = useGetAllCoursesQuery({
    page: currentPage,
    searchQuery: searchQuery,
    category: category === "all" ? undefined : category,
    limit: 10,
  });

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const courses = response?.data || [];
  const meta = response?.meta || { total: 0 };
  const totalItems = meta.total;

  const metrics = [
    {
      title: "Total Courses",
      value: meta.totalCourse,
      icon: <Users2 className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Active Courses",
      value: meta.activeCourse,
      icon: <UserCheck className="text-green-700" />,
      bg: "bg-green-100",
    },
    {
      title: "Completion Rate",
      value: meta.completationRate,
      icon: <UserX className="text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  const handleSearch = (query: string) => {
    console.log("query", query);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusChange = async (course: any) => {
    console.log("course", course.id);

    try {
      await deleteCourse(course.id).unwrap();
      toast.success("Course deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="rounded-xl bg-white shadow mt-4">
      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="p-4 text-end">
        <Link href="/admin/dashboard/courses-management/create-courses">
          <Button className="py-5">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="px-4 mt-4 w-1/4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name, email, or phone"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        <div>
          <CustomSelect
            label="Category"
            placeholder="Select category"
            options={categories.map((category) => category.value)}
            onChange={(value) => {
              setCategory(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 p-5">
        {courses?.map((course: any) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            category={course.category}
            lessonsCount={course.courseLessons || 0}
            status={mapCourseStatus(course.status)}
            onEdit={() => console.log("Edit", course.id)}
            onDelete={() => handleStatusChange(course)}
          />
        ))}
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPage={Math.ceil(totalItems / 10)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CoursesManagement;
