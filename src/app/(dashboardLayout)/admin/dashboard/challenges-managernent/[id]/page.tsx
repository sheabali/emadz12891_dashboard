"use client";

import { UpdateChallengeForm } from "@/components/module/ChallengesManagernent/UpdateChallengeForm";
import { useGetSingleChallengeQuery } from "@/redux/api/dashboardApi";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetSingleChallengeQuery(id);

  if (isLoading) {
    return <p>Loading challenge...</p>;
  }

  if (isError || !data?.data) {
    return <p>Failed to load challenge</p>;
  }

  const challenge = data.data;

  return (
    <div>
      <UpdateChallengeForm
        challengeId={challenge.id}
        initialData={{
          title: challenge.title,
          description: challenge.description,
          requirements: challenge.requirements,
          benefits: challenge.benefits,
          points: challenge.points,
          duration: challenge.duration,
          difficulty: challenge.difficulty,
          status: challenge.status,
        }}
        onSuccess={() => router.push("/dashboard/challenges")}
        onCancel={() => router.back()}
      />
    </div>
  );
};

export default Page;
