/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin } from "lucide-react";
import Image from "next/image";

const PlayerCard = ({ item }: { item: any }) => {
  const levelColorMap: Record<string, string> = {
    Beginner: "bg-[#dcfce7] text-[#016630]",
    Intermediate: "bg-[#f3e8ff] text-purple-700",
    Advanced: "bg-[#ffedd4] text-[#9f2d00]",
  };

  return (
    <div className="rounded-2xl bg-white shadow-md overflow-hidden border">
      <div className="relative h-[360px] w-full">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold">{item.name}</h3>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium 
  ${levelColorMap[item.level] || "bg-gray-100 text-gray-600"}`}
        >
          {item.level}
        </span>

        <div>
          <p className="text-sm text-gray-500">Paddle</p>
          <p className="font-medium">{item.paddle}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={16} />
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
