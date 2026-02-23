/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/admin/dashboard/ChallengesManagement.tsx
"use client";

import { ClipboardList, PlayCircle, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import MetricCard from "@/components/shared/MetricCardDashboard";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/core/CustomSelect/CustomSelect";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";

import DeleteModal from "@/components/shared/DeleteModal";
import {
  useDeleteChallengeMutation,
  useGetAllChallengesQuery,
} from "@/redux/api/dashboardApi";
import { toast } from "sonner";
import { ChallengesCard, ChallengeStatus } from "./ChallengesCard";

const ChallengesCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-gray-100/70 to-transparent" />

      <div className="h-6 w-4/5 rounded-md bg-gray-200" />

      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>

      {/* Metadata */}
      <div className="mt-5 flex flex-wrap gap-4">
        <div className="h-5 w-20 rounded bg-gray-200" />
        <div className="h-5 w-16 rounded bg-gray-200" />
        <div className="h-5 w-14 rounded bg-gray-200" />
      </div>

      <div className="mt-4 h-6 w-28 rounded-full bg-gray-200" />

      <div className="mt-6 flex gap-3">
        <div className="h-9 w-28 rounded-lg bg-gray-200" />
        <div className="h-9 w-28 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

const ChallengesSkeletonGrid = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ChallengesCardSkeleton key={index} />
      ))}
    </div>
  );
};

const ChallengesManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null,
  );

  const { data: response, isLoading } = useGetAllChallengesQuery({
    page: currentPage,
    searchQuery,
    difficulty: difficulty === "all" ? undefined : difficulty,
    limit: 10,
  });

  const [deleteChallenge] = useDeleteChallengeMutation();

  const challenges = response?.data || [];
  const meta = response?.meta || {
    total: 0,
    totalChallenge: 0,
    totalActiveChallenge: 0,
    totalParticipant: 0,
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const difficultyOptions = [
    { value: "all", label: "All Difficulties" },
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];

  const metrics = [
    {
      title: "Total Challenges",
      value: meta.totalChallenge ?? 0,
      icon: <ClipboardList className="h-6 w-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Active Challenges",
      value: meta.totalActiveChallenge ?? 0,
      icon: <PlayCircle className="h-6 w-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Total Participants",
      value: meta.totalParticipant ?? 0,
      icon: <ClipboardList className="h-6 w-6 text-indigo-600" />,
      bg: "bg-indigo-50",
    },
  ];

  const handleDeleteClick = (id: string) => {
    setSelectedChallengeId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedChallengeId) return;

    try {
      await deleteChallenge(selectedChallengeId).unwrap();
      toast.success("Challenge deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete challenge");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedChallengeId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow sm:flex-row sm:items-end sm:justify-between">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-11 pr-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <CustomSelect
            label="Difficulty"
            placeholder="All Difficulties"
            options={difficultyOptions.map((d) => d.label)}
            onChange={(selectedLabel) => {
              const selected = difficultyOptions.find(
                (d) => d.label === selectedLabel,
              );
              setDifficulty(selected?.value);
              setCurrentPage(1);
            }}
          />

          <Button asChild className="whitespace-nowrap">
            <Link href="/admin/dashboard/challenges-managernent/create-challenges">
              <Plus className="mr-1.5 h-4 w-4" />
              New Challenge
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow">
        {isLoading ? (
          <div className="p-6">
            <ChallengesSkeletonGrid count={8} />
          </div>
        ) : challenges.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-5 py-16 text-center">
            <div className="rounded-full bg-gray-100 p-6">
              <ClipboardList className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                No challenges found
              </h3>
              <p className="mt-2 max-w-md text-gray-500">
                {searchQuery || difficulty
                  ? "Try adjusting your search filters"
                  : "Start by creating your first coding challenge"}
              </p>
            </div>
            {!searchQuery && !difficulty && (
              <Button asChild variant="outline" className="mt-2">
                <Link href="/admin/dashboard/challenges-management/create-challenge">
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Challenge
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {challenges.map((challenge: any) => (
                <ChallengesCard
                  key={challenge.id}
                  title={challenge.title}
                  description={challenge.description}
                  category="Coding"
                  duration={challenge.duration}
                  points={challenge.points}
                  lessonsCount={0}
                  status={challenge.status as ChallengeStatus}
                  onEdit={() => console.log("Edit challenge:", challenge.id)}
                  onDelete={() => handleDeleteClick(challenge.id)}
                />
              ))}
            </div>
          </div>
        )}

        {!isLoading && challenges.length > 0 && meta.total > 0 && (
          <div className="border-t px-6 py-5">
            <TablePagination
              currentPage={currentPage}
              totalPage={Math.ceil(meta.total / 10)}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Challenge"
        description="This action cannot be undone. The challenge and all associated data will be permanently removed."
      />
    </div>
  );
};

export default ChallengesManagement;
