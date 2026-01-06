import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const dammyData = [
  { id: 1, image: "https://i.ibb.co.com/XZrQX1rt/Court-Image-3.png" },
  { id: 2, image: "https://i.ibb.co.com/TxNxcNys/Court-Image-2.png" },
  { id: 3, image: "https://i.ibb.co.com/6JRc91c6/Court-Card.png" },
  { id: 4, image: "https://i.ibb.co.com/TxNxcNys/Court-Image-2.png" },
  { id: 5, image: "https://i.ibb.co.com/XZrQX1rt/Court-Image-3.png" },
  { id: 6, image: "https://i.ibb.co.com/XZrQX1rt/Court-Image-3.png" },
  { id: 7, image: "https://i.ibb.co.com/TxNxcNys/Court-Image-2.png" },
];

const MeetsCommunity = () => {
  return (
    <section>
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <p className="text-sm sm:text-base md:text-lg font-medium border-l-4 border-primary pl-4 w-fit">
            Life at the Club
          </p>

          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
              Where the game meets community.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Experience the energy, camaraderie, and passion that makes our
              community special.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {dammyData.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={item.image}
                      alt="Community image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default MeetsCommunity;
