import { CalendarIcon, MapPinIcon, User2 } from "lucide-react";

const TournamentCard = ({
  tournament: { title, date, location, participants },
}: {
  tournament: {
    title: string;
    date: string;
    location: string;
    participants: string;
  };
}) => {
  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-lg font-semibold mb-4">Advanced Tournament</h2>

      <div className="flex items-center mb-2 text-gray-500">
        <CalendarIcon className="w-5 h-5 mr-2" />
        <span>Saturday, December 28, 2024 at 10:00</span>
      </div>

      <div className="flex items-center mb-2 text-gray-500">
        <MapPinIcon className="w-5 h-5 mr-2" />
        <span>Riverside Sports Complex</span>
      </div>

      <div className="flex items-center mb-4 text-gray-500">
        <User2 className="w-5 h-5 mr-2" />
        <span>1 / 32 participants</span>
      </div>

      <button className="w-full bg-[#ccf64d] hover:bg-[#b8e040] text-black font-medium py-2 rounded-lg">
        View Details
      </button>
    </div>
  );
};

export default TournamentCard;
