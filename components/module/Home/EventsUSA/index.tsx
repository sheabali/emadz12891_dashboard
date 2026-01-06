import MetricCard from "@/components/Common/MetricCard";

const EventsUSA = () => {
  return (
    <div className="container mx-auto">
      <span className="text-xl font-semibold border border-black px-3 py-1 my-4 inline-block rounded-xl">
        Events
      </span>
      <h1 className="text-6xl mb-10">
        Upcoming Events <br /> Across the USA
      </h1>
      <MetricCard
        metrics={[
          { value: "400+", title: "Organized Events" },
          { value: "120K", title: "Active Users" },
          { value: "98%", title: "Success Rate" },
        ]}
      />
    </div>
  );
};

export default EventsUSA;
