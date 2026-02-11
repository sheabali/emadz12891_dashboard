// components/course-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

interface ChallengesCardProps {
  title: string;
  description: string;
  category: string;
  lessonsCount: number;
  status: "active" | "deleted";
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ChallengesCard(props: ChallengesCardProps) {
  const {
    title,
    description,
    category,
    lessonsCount,
    status,
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
              status === "active"
                ? "bg-green-500 text-white"
                : "bg-red-600 text-white",
            )}
          >
            {status === "active" ? "Active" : "Inactive"}
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
          <h3 className="text-xl ">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        <Separator />
        <div className="flex items-center justify-between pt-2">
          {/* <span className="text-blue-600 font-medium">{category}</span> */}
          <span className="text-purple-600 font-medium">300 pts 30 days</span>
          <span className="text-blue-600 font-medium">
            {lessonsCount} joined
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
