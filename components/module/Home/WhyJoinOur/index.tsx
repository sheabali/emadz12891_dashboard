import Image from "next/image";

const WhyJoinOur = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <p className="text-xl border-l-4 border-primary pl-4 font-medium">
          About Us
        </p>

        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl mb-4">
            Why Join Our Pickleball Club
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Experience the perfect blend of competition, community, and growth.
          </p>
        </div>
      </div>
      <div className="mt-14">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-start text-start border border-primary rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/logo/ValueSection.png"
              width={60}
              height={60}
              alt="Competitive & Social Events"
              className="mb-4"
            />
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Competitive & Social Events
            </h2>
            <p className="text-gray-600">
              From tournaments to casual play, there&apos;s something for
              everyone looking to enjoy the game.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col border border-primary rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/logo/logo_1.png"
              width={60}
              height={60}
              alt="Community & Networking"
              className="mb-4"
            />
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Community & Networking
            </h2>
            <p className="text-gray-600">
              Connect with fellow players, make friends, and grow your
              pickleball network.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col  border border-primary rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/logo/logo_2.png"
              width={60}
              height={60}
              alt="Skill Improvement"
              className="mb-4"
            />
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Skill Improvement
            </h2>
            <p className="text-gray-600">
              Participate in clinics and workshops to elevate your game to the
              next level.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col border border-primary rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/logo/logo_3.png"
              width={60}
              height={60}
              alt="Fun & Fitness"
              className="mb-4"
            />
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Fun & Fitness
            </h2>
            <p className="text-gray-600">
              Enjoy a healthy lifestyle while having a great time on the court.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinOur;
