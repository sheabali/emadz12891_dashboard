"use client";

import EventCard from "@/components/Common/EventsCard";
import MetricCard from "@/components/Common/MetricCard";
import EventsCard from "../Home/Events/EventsCard";
import Membership from "../Home/Membership";

const dammyEvents = [
  {
    id: 1,
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
];

const wayEventsData = [
  {
    id: 1,
    name: "Event 1",
  },
  {
    id: 2,
    name: "Event 2",
  },
  {
    id: 2,
    name: "Event 2",
  },
  {
    id: 2,
    name: "Event 2",
  },
];

const EventsPage = () => {
  return (
    <>
      <div className="container mx-auto">
        <div>
          <h1 className="text-4xl mb-4">Upcoming Events</h1>
          <p>
            Browse our curated list of padel courts, check real-time
            availability,
            <br />
            and secure your slot in seconds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 mb-20">
            {dammyEvents.map((event, index) => (
              <EventsCard key={index} event={event} />
            ))}
          </div>
        </div>
        <MetricCard
          metrics={[
            { value: "400+", title: "Organized Events" },
            { value: "120K", title: "Active Users" },
            { value: "98%", title: "Success Rate" },
          ]}
        />
        <div className="container mx-auto my-20">
          <h1 className="text-4xl mb-3">On Its Way events </h1>
          <p>
            Browse our curated list of padel courts, check real-time
            availability,
            <br />
            and secure your slot in seconds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {wayEventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Membership />
      </div>
    </>
  );
};

export default EventsPage;
