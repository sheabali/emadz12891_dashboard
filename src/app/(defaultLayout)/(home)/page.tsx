import Events from "@/components/module/Home/Events/Events";
import EventsUSA from "@/components/module/Home/EventsUSA";
import HeroSection from "@/components/module/Home/HeroSection";
import EventCard from "@/components/module/Home/WayEvents";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Events />
      <EventsUSA />
      <EventCard />
    </div>
  );
};

export default HomePage;
