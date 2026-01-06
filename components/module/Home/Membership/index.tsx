import { Button } from "@/components/ui/button";
import Image from "next/image";

const Membership = () => {
  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl overflow-hidden bg-black">
          <div className="text-center px-6 pt-10 pb-12">
            <span className="inline-block mb-4 rounded-full bg-lime-400/10 px-4 py-1 text-sm font-medium text-lime-400">
              Membership
            </span>

            <h1 className="text-3xl sm:text-5xl font-semibold leading-tight mb-4">
              Become a Member — Play <br />
              <span className="text-white">More, Pay Less</span>
            </h1>

            <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg mb-8">
              Unlock exclusive benefits, discounts, and early access to bookings
              with our membership plans.
            </p>

            <Button
              size="lg"
              className="rounded-xl bg-lime-400 text-black px-10 py-6 text-base font-semibold hover:bg-lime-300"
            >
              Join now
            </Button>
          </div>

          <div className="relative h-80 sm:h-[420px] w-full">
            <Image
              src="/images/man.jpg"
              alt="Membership Court"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
