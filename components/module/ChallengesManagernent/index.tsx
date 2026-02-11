/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Plus, Search, UserCheck, Users2, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import MetricCard from "@/components/shared/MetricCardDashboard";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/core/CustomSelect/CustomSelect";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import Link from "next/link";
import { ChallengesCard } from "./ChallengesCard";

type UserStatus = "ACTIVE" | "DELETED";

type Customer = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  status: UserStatus;
  profileImage?: string;
  phoneNumber?: string;
  createdAt?: string;
};

const statusStyles: Record<UserStatus, string> = {
  ACTIVE: "bg-green-100 text-green-600 border-green-200",
  DELETED: "bg-red-100 text-red-600 border-red-200",
};

const StatusBadge = ({ status }: { status: UserStatus }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
  >
    {status === "ACTIVE" ? "Active" : "deleted"}
  </span>
);

const ChallengesManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  const response = {
    data: [
      {
        id: 1,
        title: "Tajweed Fundamentals",
        description: "Learn proper Quran recitation with correct pronunciation",
        category: "Quran Studies",
        lessonsCount: 12,
        status: "active",
      },
      {
        id: 1,
        title: "Tajweed Fundamentals",
        description: "Learn proper Quran recitation with correct pronunciation",
        category: "Quran Studies",
        lessonsCount: 12,
        status: "active",
      },
      {
        id: 1,
        title: "Tajweed Fundamentals",
        description: "Learn proper Quran recitation with correct pronunciation",
        category: "Quran Studies",
        lessonsCount: 12,
        status: "active",
      },
      {
        id: 1,
        title: "Tajweed Fundamentals",
        description: "Learn proper Quran recitation with correct pronunciation",
        category: "Quran Studies",
        lessonsCount: 12,
        status: "deleted",
      },
      {
        id: 1,
        title: "Tajweed Fundamentals",
        description: "Learn proper Quran recitation with correct pronunciation",
        category: "Quran Studies",
        lessonsCount: 12,
        status: "active",
      },
      {
        id: 1,
        title: "Tajweed Fundamentals",
        description: "Learn proper Quran recitation with correct pronunciation",
        category: "Quran Studies",
        lessonsCount: 12,
        status: "active",
      },
    ] as any,
    meta: {
      total: 2,
    },
  };

  const dashboard = {
    totalCourses: 2,
    activeCourses: 1,
    completionRate: 1,
  };

  const metrics = [
    {
      title: "Total Courses",
      value: dashboard.totalCourses,
      icon: <Users2 className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Active Courses",
      value: dashboard.activeCourses,
      icon: <UserCheck className="text-green-700" />,
      bg: "bg-green-100",
    },
    {
      title: "Completion Rate",
      value: dashboard.completionRate,
      icon: <UserX className="text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  const userData = response.data;
  const totalItems = response.meta.total;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusChange = async (customer: Customer, status: UserStatus) => {
    try {
      // await suspendUser({ id: customer.id, status }).unwrap();
      toast.success(
        `User ${status === "DELETED" ? "suspended" : "activated"} successfully`,
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="rounded-xl bg-white shadow mt-4">
      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="p-4 text-end">
        <Link href="/admin/dashboard/create-challenges">
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
            options={["All", "Active", "Deleted"]}
            onChange={(value) => {
              setCategory(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="grid grid-cols-3 gap-6 p-5">
        {response?.data.map((course: any) => (
          <ChallengesCard
            key={course.id}
            title={course.title}
            description={course.description}
            category={course.category}
            lessonsCount={course.lessonsCount}
            status={course.status}
            onEdit={() => console.log("Edit", course.id)}
            onDelete={() => console.log("Delete", course.id)}
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

export default ChallengesManagement;
