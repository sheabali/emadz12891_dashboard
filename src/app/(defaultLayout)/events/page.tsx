import Events from "@/components/module/Home/Events/Events";
import EventsUSA from "@/components/module/Home/EventsUSA";
import HeroSection from "@/components/module/Home/HeroSection";
import Membership from "@/components/module/Home/Membership";
import WayEvents from "@/components/module/Home/WayEvents";

const page = () => {
  return (
    <div>
      <HeroSection />
      <Events />
      <EventsUSA />
      <WayEvents />
      <Membership />
    </div>
  );
};

export default page;
