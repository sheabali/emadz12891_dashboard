import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

export enum ChallengeStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  UPCOMING = "UPCOMING",
}

interface ChallengesCardProps {
  title: string;
  description: string;
  category: string;
  lessonsCount: number;
  status: ChallengeStatus;
  points: number;
  duration: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const statusStyles: Record<ChallengeStatus, string> = {
  ACTIVE: "bg-green-500 text-white",
  DELETED: "bg-red-600 text-white",
  COMPLETED: "bg-blue-500 text-white",
  CANCELLED: "bg-gray-500 text-white",
  UPCOMING: "bg-yellow-500 text-white",
};

const statusLabel: Record<ChallengeStatus, string> = {
  ACTIVE: "Active",
  DELETED: "Deleted",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  UPCOMING: "Upcoming",
};

export function ChallengesCard(props: ChallengesCardProps) {
  const {
    title,
    description,
    category,
    lessonsCount,
    status,
    points,
    duration,
    onEdit,
    onDelete,
  } = props;

  return (
    <Card className="rounded-2xl bg-slate-50 shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <span
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-full",
              statusStyles[status],
            )}
          >
            {statusLabel[status]}
          </span>

          <div className="flex gap-3">
            <button onClick={onEdit} className="text-blue-600 hover:opacity-70">
              <Pencil size={18} />
            </button>
            <button
              onClick={onDelete}
              className="text-red-500 hover:opacity-70"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        <Separator />
        <div className="flex items-center justify-between pt-2">
          <span className="text-purple-600 font-medium">
            {points} pts • {duration} days
          </span>
          <span className="text-blue-600 font-medium">
            {lessonsCount} joined
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
