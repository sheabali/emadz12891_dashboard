/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Search, UserCheck, Users2, UserX } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import MetricCard from "@/components/shared/MetricCardDashboard";
import { CustomSelect } from "@/components/ui/core/CustomSelect/CustomSelect";
import { EMTable } from "@/components/ui/core/NRTable";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import { RevenueGrowthChart } from "../DashboardOverview/UserChart";

type UserStatus = "ACTIVE" | "SUSPENDED";

type Customer = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  status: UserStatus;
  profileImage?: string;
  phoneNumber?: string;
  createdAt?: string;
  endDate?: string;
};

const statusStyles: Record<UserStatus, string> = {
  ACTIVE: "bg-green-100 text-green-600 border-green-200",
  SUSPENDED: "bg-red-100 text-red-600 border-red-200",
};

const StatusBadge = ({ status }: { status: UserStatus }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
  >
    {status === "ACTIVE" ? "Active" : "Suspended"}
  </span>
);

const Subcription = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  const response = {
    data: [
      {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "ACTIVE",
        profileImage: "/boy.png",
        phoneNumber: "+1 234 567 890",
        createdAt: "2024-01-10",
        endDate: "2024-01-10",
      },
      {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "ACTIVE",
        profileImage: "/boy.png",
        phoneNumber: "+1 234 567 890",
        createdAt: "2024-01-10",
        endDate: "2024-01-10",
      },
      {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "ACTIVE",
        profileImage: "/boy.png",
        phoneNumber: "+1 234 567 890",
        createdAt: "2024-01-10",
        endDate: "2024-01-10",
      },
    ] as Customer[],
    meta: {
      total: 2,
    },
  };

  const dashboard = {
    totalUsers: 2,
    activeUsers: 1,
    suspendedUsers: 1,
    revenueChart: [
      {
        name: "Jan",
        value: 12,
      },

      {
        name: "Feb",
        value: 45,
      },
      {
        name: "Mar",
        value: 98,
      },

      {
        name: "Apr",
        value: 12,
      },

      {
        name: "May",
        value: 45,
      },
    ],
  };

  const metrics = [
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: <Users2 className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: dashboard.activeUsers,
      icon: <UserCheck className="text-green-700" />,
      bg: "bg-green-100",
    },
    {
      title: "Suspended Users",
      value: dashboard.suspendedUsers,
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
        `User ${status === "SUSPENDED" ? "suspended" : "activated"} successfully`,
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        id: "customer",
        header: "Customer",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Image
              src={row.original.profileImage || "/boy.png"}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">
                {row.original.fullName}
              </p>
              <p className="text-xs text-gray-500">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone",
        cell: ({ row }) => (
          <p className="text-sm text-gray-700">
            {row.original.phoneNumber || "N/A"}
          </p>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => (
          <p className="text-sm text-gray-700">
            {row.original.createdAt
              ? new Date(row.original.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        ),
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => (
          <p className="text-sm text-gray-700">
            {row.original.endDate
              ? new Date(row.original.endDate).toLocaleDateString()
              : "N/A"}
          </p>
        ),
      },
    ],
    [],
  );

  return (
    <div className="rounded-xl bg-white shadow mt-4">
      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="border-b p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Subcription Growth
        </h2>
      </div>

      <div className="lg:col-span-2 ">
        <RevenueGrowthChart data={dashboard?.revenueChart ?? []} />
      </div>

      <div className="flex justify-between items-center gap-4 mt-6">
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
            options={["All", "Active", "Suspended"]}
            onChange={(value) => {
              setCategory(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="pb-4 px-4">
        <EMTable columns={columns} data={userData} />
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPage={Math.ceil(totalItems / 10)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Subcription;
