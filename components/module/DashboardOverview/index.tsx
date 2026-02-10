"use client";

// import { useGetDashbaordOverviewQuery } from "@/redux/api/dashboardApi";
import { CalendarDays, UserCheck, Users } from "lucide-react";

// import { TournamentCategoriesBreakdown } from "./TournamentCategories";
import MetricCard from "@/components/shared/MetricCardDashboard";
import TournamentCategoriesBreakdown from "./TournamentCategories";
import UserActivity from "./UserActivity";
import { RevenueGrowthChart } from "./UserChart";

const DashboardOverview = () => {
  //   const { data: response, isLoading } = useGetDashbaordOverviewQuery(undefined);

  //   const dashboard = response?.data;

  //   if (isLoading) return <DashboardOverviewSkeleton />;

  const dashboard = {
    totalTournaments: 0,
    totalTeams: 0,
    approvedTeams: 0,
    pendingTeams: 0,
    totalPlayers: 0,
    totalRevenue: 0,
    revenueGrowth: [],
    categories: [],
    userActivity: [
      {
        name: "Players",
        managers: 12,
        players: 32,
        month: "Jan",
      },
      {
        name: "Managers",
        managers: 45,
        players: 98,
        month: "Jan",
      },
    ],
    tournamentCategoryData: [
      {
        name: "Category 1",
        value: 12,
      },
      {
        name: "Category 2",
        value: 45,
      },
      {
        name: "Category 3",
        value: 98,
      },
    ],
    userActivityData: [],
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
    ],
  };

  const metrics = [
    {
      title: "Total Tournaments",
      value: dashboard?.totalTournaments ?? 0,
      icon: <CalendarDays className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Teams",
      value: dashboard?.totalTeams ?? 0,
      icon: <Users className="text-slate-700" />,
      bg: "bg-slate-200",
    },
    {
      title: "Approved Teams",
      value: dashboard?.approvedTeams ?? 0,
      icon: <UserCheck className="text-orange-600" />,
      bg: "bg-orange-100",
    },
    {
      title: "Approved Teams",
      value: dashboard?.approvedTeams ?? 0,
      icon: <UserCheck className="text-orange-600" />,
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="w-full">
        <UserActivity data={dashboard?.userActivity ?? []} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TournamentCategoriesBreakdown
            data={dashboard?.tournamentCategoryData ?? []}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="grid grid-rows-3 grid-flow-col gap-4">
            <div className="bg-linear-to-br from-[#5d8cbd] to-[#4a76a8] p-8 rounded-2xl shadow-lg">
              <p className="text-sm uppercase tracking-wide text-blue-100">
                Total Published Courses
              </p>

              <span className="block mt-2 text-5xl font-bold text-white">
                98
              </span>

              <p className="mt-1 text-sm text-blue-200">
                Active & available courses
              </p>
            </div>

            <div className="bg-linear-to-br from-[#5d8cbd] to-[#4a76a8] p-8 rounded-2xl shadow-lg">
              <p className="text-sm uppercase tracking-wide text-blue-100">
                Courses with Active Users
              </p>

              <span className="block mt-2 text-5xl font-bold text-white">
                82
              </span>

              <p className="mt-1 text-sm text-blue-200">84% utilization rate</p>
            </div>

            <div className="bg-linear-to-br from-[#5d8cbd] to-[#4a76a8] p-8 rounded-2xl shadow-lg">
              <p className="text-sm uppercase tracking-wide text-blue-100">
                Unused Courses
              </p>

              <span className="block mt-2 text-5xl font-bold text-white">
                16
              </span>

              <p className="mt-1 text-sm text-blue-200">
                No active enrollments
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <RevenueGrowthChart data={dashboard?.revenueChart ?? []} />
      </div>
    </div>
  );
};

export default DashboardOverview;
