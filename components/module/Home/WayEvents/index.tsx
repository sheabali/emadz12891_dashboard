import EventCard from "@/components/Common/EventsCard";

const wayEventsData = [
  {
    id: 1,
    name: "Event 1",
  },
  {
    id: 2,
    name: "Event 2",
  },
];

const WayEvents = () => {
  return (
    <div className="container mx-auto my-20">
      <h1 className="text-4xl mb-3">On Its Way events </h1>
      <p>
        Browse our curated list of padel courts, check real-time availability,
        <br />
        and secure your slot in seconds.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {wayEventsData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default WayEvents;
