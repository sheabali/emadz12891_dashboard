"use client";

import MetricCard from "@/components/shared/MetricCardDashboard";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";
import { BookCheck, BookOpen, UserCheck, Users } from "lucide-react";
import DashboardOverviewSkeleton from "./DashboardOverviewSkeleton";
import AnalyticsPage from "./TournamentCategories";
import { UserGrowthChart } from "./UserActivity";
import { RevenueGrowthChart } from "./UserChart";

const DashboardOverview = () => {
  const { data: response, isLoading } = useGetDashboardStatsQuery(undefined);

  const dashboard = response?.data;
  const overview = dashboard?.overview;

  if (isLoading) return <DashboardOverviewSkeleton />;

  const metrics = [
    {
      title: "Total Users",
      value: overview?.totalUsers ?? 0,
      icon: <Users className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: overview?.activeUsers ?? 0,
      icon: <UserCheck className="text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Total Courses",
      value: overview?.totalCourses ?? 0,
      icon: <BookOpen className="text-slate-700" />,
      bg: "bg-slate-200",
    },
    {
      title: "Total Challenges",
      value: overview?.totalChallenges ?? 0,
      icon: <BookCheck className="text-orange-600" />,
      bg: "bg-orange-100",
    },
  ];

  const activeCourses =
    (overview?.totalCourses ?? 0) - (overview?.unusedCourses ?? 0);
  const utilizationRate = overview?.totalCourses
    ? Math.round((activeCourses / overview.totalCourses) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="w-full">
        <UserGrowthChart data={dashboard?.userGrowth ?? []} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsPage data={overview ?? []} />
        </div>

        <div className="lg:col-span-1">
          <div className="grid grid-rows-3 grid-flow-col gap-4">
            <div className="bg-linear-to-br from-[#5d8cbd] to-[#4a76a8] p-8 rounded-2xl shadow-lg">
              <p className="text-sm uppercase tracking-wide text-blue-100">
                Total Published Courses
              </p>
              <span className="block mt-2 text-5xl font-bold text-white">
                {overview?.totalCourses ?? 0}
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
                {activeCourses}
              </span>
              <p className="mt-1 text-sm text-blue-200">
                {utilizationRate}% utilization rate
              </p>
            </div>

            <div className="bg-linear-to-br from-[#5d8cbd] to-[#4a76a8] p-8 rounded-2xl shadow-lg">
              <p className="text-sm uppercase tracking-wide text-blue-100">
                Unused Courses
              </p>
              <span className="block mt-2 text-5xl font-bold text-white">
                {overview?.unusedCourses ?? 0}
              </span>
              <p className="mt-1 text-sm text-blue-200">
                No active enrollments
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <RevenueGrowthChart data={dashboard?.challengeJoinGrowth ?? []} />
      </div>
    </div>
  );
};

export default DashboardOverview;
