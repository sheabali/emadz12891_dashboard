/* eslint-disable react-hooks/preserve-manual-memoization */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Ban,
  CheckCircle,
  MoreVertical,
  Search,
  UserCheck,
  Users2,
  UserX,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import MetricCard from "@/components/shared/MetricCardDashboard";
import LoadingSpinner from "@/components/shared/spinner";
import { CustomSelect } from "@/components/ui/core/CustomSelect/CustomSelect";
import { EMTable } from "@/components/ui/core/NRTable";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useActiveOrSuspendedUserMutation,
  useGetAllUserQuery,
} from "@/redux/api/dashboardApi";

type UserStatus = "ACTIVE" | "SUSPENDED";
type UserFilter = "ACTIVE" | "SUSPENDED";

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
  SUSPENDED: "bg-red-100 text-red-600 border-red-200",
};

const StatusBadge = ({ status }: { status: UserStatus }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
  >
    {status === "ACTIVE" ? "Active" : "Suspended"}
  </span>
);

const CustomersTable = () => {
  const limit = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<UserFilter | undefined>(undefined);

  console.log("searchQuery, category", searchQuery, filter);

  const [makeStatusChange, { isLoading: isStatusChanging }] =
    useActiveOrSuspendedUserMutation();

  const { data: res, isLoading } = useGetAllUserQuery({
    limit,
    page: currentPage,
    search: searchQuery,
    status: filter,
  });

  const user = res?.data || [];
  const meta = res?.meta || { total: 0 };
  const totalItems = meta.total || 0;

  console.log("user", user);

  const metrics = [
    {
      title: "Total Users",
      value: meta?.total || 0,
      icon: <Users2 className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: meta?.totalActiveUsers || 0,
      icon: <UserCheck className="text-green-700" />,
      bg: "bg-green-100",
    },
    {
      title: "Suspended Users",
      value: meta?.totalSuspendUsers || 0,
      icon: <UserX className="text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusChange = async (customer: Customer, status: UserStatus) => {
    try {
      await makeStatusChange({ userId: customer.id, status }).unwrap();
      toast.success(
        `User ${customer.fullName} has been ${
          status === "ACTIVE" ? "activated" : "suspended"
        }.`,
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
              className="rounded-full w-10 h-10 object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">
                {row.original.fullName}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <p className="text-sm text-gray-700">{row.original.email || "N/A"}</p>
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
        id: "action",
        header: "",
        cell: ({ row }) => {
          const customer = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-md p-1 hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44">
                {customer.status === "ACTIVE" ? (
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(customer, "SUSPENDED")}
                    className="flex items-center gap-2"
                  >
                    <Ban className="h-5 w-5" />
                    Suspend
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(customer, "ACTIVE")}
                    className="flex items-center gap-2 text-green-600"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Activate
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="rounded-xl bg-white shadow mt-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="border-b p-4">
        <h2 className="text-lg font-semibold text-gray-900">Customers</h2>
        <p className="text-sm text-gray-500">Manage your customers</p>
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
            label="Filter"
            placeholder="Filter Users"
            options={["ACTIVE", "SUSPENDED"]}
            onChange={(value) => {
              setFilter(value as UserFilter);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="pb-4 px-4">
        <EMTable columns={columns} data={user} />
      </div>

      {totalItems > 10 && (
        <TablePagination
          currentPage={currentPage}
          totalPage={Math.ceil(totalItems / 10)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CustomersTable;
