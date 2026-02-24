"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Search, Users2 } from "lucide-react";
import { useMemo, useState } from "react";

import MetricCard from "@/components/shared/MetricCardDashboard";
import { EMTable } from "@/components/ui/core/NRTable";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import { useGetAllSubscriptionsQuery } from "@/redux/api/dashboardApi";
import { RevenueGrowthChart } from "../DashboardOverview/UserChart";

type SubscriptionStatus = "ACTIVE" | "SUSPENDED";

type Subscription = {
  id: string;
  name: string;
  email: string;
  price: number;
  planType: "FREE" | "PREMIUM";
  status: SubscriptionStatus;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
};

const statusStyles: Record<SubscriptionStatus, string> = {
  ACTIVE: "bg-green-100 text-green-600 border-green-200",
  SUSPENDED: "bg-red-100 text-red-600 border-red-200",
};

const StatusBadge = ({ status }: { status: SubscriptionStatus }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
  >
    {status === "ACTIVE" ? "Active" : "Suspended"}
  </span>
);

const Subcription = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const dashboard = {
    revenueChart: [
      {
        month: "Feb",
        year: 2026,
        count: 1,
      },

      {
        month: "Feb",
        year: 2026,
        count: 5,
      },
      {
        month: "Feb",
        year: 2026,
        count: 1,
      },

      {
        month: "Feb",
        year: 2026,
        count: 10,
      },

      {
        month: "Feb",
        year: 2026,
        count: 6,
      },
    ],
  };

  const { data: subscriptions } = useGetAllSubscriptionsQuery({
    page: currentPage,
    limit: 10,
    searchQuery,
    // category: category === "All" ? undefined : category,
  });

  const userData = subscriptions?.data ?? [];
  const meta = subscriptions?.meta;
  const totalItems = subscriptions?.meta?.total ?? 0;

  const metrics = [
    {
      title: "Total Subscriptions",
      value: meta?.totalSubscriptions ?? 0,
      icon: <Users2 className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Active Subscriptions",
      value: meta?.activeSubscriptions ?? 0,
      icon: <Users2 className="text-blue-600" />,
      bg: "bg-blue-100",
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // const handleStatusChange = async (
  //   subscription: Subscription,
  //   status: SubscriptionStatus,
  // ) => {
  //   try {
  //     // await suspendUser({ id: customer.id, status }).unwrap();
  //     toast.success(
  //       `User ${status === "SUSPENDED" ? "suspended" : "activated"} successfully`,
  //     );
  //   } catch (error: any) {
  //     toast.error(error?.data?.message || "Something went wrong");
  //   }
  // };

  const columns = useMemo<ColumnDef<Subscription>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Plan",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-gray-500">{row.original.planType}</p>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "User Email",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `$${row.original.price}`,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) =>
          row.original.startDate
            ? new Date(row.original.startDate).toLocaleDateString()
            : "N/A",
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) =>
          row.original.endDate
            ? new Date(row.original.endDate).toLocaleDateString()
            : "N/A",
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
          Subcription Growth (Static)
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
              placeholder="Search by plan or email"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
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
