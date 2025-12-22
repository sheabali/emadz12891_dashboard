import { Button } from "@/components/ui/button";
import UserCard from "./UserCard";

const HeroSection = () => {
  return (
    <div className="mt-6 bg-[#f5fddb]">
      <div className="flex justify-center">
        <div className="max-w-5xl flex flex-col items-center py-20 px-4 gap-6">
          <h1 className="text-center text-7xl">
            USA&apos;s Most Connected <br /> Tech Communitys
          </h1>
          <p className="text-center mt-4">
            Engage with leaders, exchange ideas, and build connections <br />{" "}
            that unlock new opportunities.
          </p>
          <Button className="text-center py-7 rounded-4xl px-6">
            See Upcoming Events
          </Button>
        </div>
      </div>
      <UserCard />
    </div>
  );
};

export default HeroSection;
