/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";

const EventsCard = ({ event }: { event?: any }) => {
  const eventData = event;

  return (
    <div className="w-full bg-white rounded-md overflow-hidden">
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={eventData.image}
          alt={eventData.title}
          className="w-full h-full"
          fill
        />
      </div>

      <div className="p-6">
        <h2 className="text-3xl font-serif mb-3">{eventData.title}</h2>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {eventData.description}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700">{eventData.time}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700">{eventData.location}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Ticket className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700">
              {eventData.price} {eventData.isPaid ? "" : "| Free for members"}
            </span>
          </div>
        </div>

        <button className="  bg-pink-200 hover:bg-pink-300 text-black font-medium py-3 px-6 rounded-full transition-colors duration-200">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventsCard;
