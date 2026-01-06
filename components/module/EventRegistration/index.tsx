import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Membership from "../Home/Membership";

const EventRegistration = () => {
  return (
    <>
      <section className="relative h-screen w-full">
        <Image
          src="/images/event-registration.png"
          alt="Event Registration Background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        {/* Card */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-lime-400 px-6 py-4">
              <h2 className="text-lg font-semibold">Event Registration</h2>
              <p className="text-sm text-black/70">
                Complete the form below to register for the event
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Event Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Event Details</p>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Spring Pickleball Tournament 2025</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Saturday, March 15, 2025 • 9:00 AM – 4:00 PM</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>
                    Riverside Community Sports Center, 123 Park Avenue
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Member Name</label>
                  <input
                    type="text"
                    value="Alex Johnson"
                    disabled
                    className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-gray-400">
                    This information is auto-filled from your profile
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Skill Level</label>
                  <input
                    type="text"
                    placeholder="Beginner / Intermediate / Advanced"
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Special Requests{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter any special requests or notes for the organizer..."
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-gray-400">
                    Let us know if you have any dietary restrictions,
                    accessibility needs, or other requests
                  </p>
                </div>
              </div>

              <button className="w-full rounded-md bg-lime-400 py-2 text-sm font-semibold hover:bg-lime-500 transition">
                Register for Event
              </button>
            </div>
          </div>
        </div>
      </section>

      <Membership />
    </>
  );
};

export default EventRegistration;
