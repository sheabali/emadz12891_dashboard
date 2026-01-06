import MeetsCommunity from "@/components/module/Home/MeetsCommunity";
import Membership from "@/components/module/Home/Membership";
import PlayCompete from "@/components/module/Home/PlayCompete";
import WhyJoinOur from "@/components/module/Home/WhyJoinOur";

const HomePage = () => {
  return (
    <div>
      <MeetsCommunity />
      <WhyJoinOur />
      <PlayCompete />
      <Membership />
    </div>
  );
};

export default HomePage;
