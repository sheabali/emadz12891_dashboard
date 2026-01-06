"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import EventSearch from "../EventSearch";
import EventsCard from "./EventsCard";

const users = [
  {
    id: 1,
    profileImage:
      "https://framerusercontent.com/images/qyN2CKkv6G5gxPKHn8LlwjzAE.jpeg?scale-down-to=1024",
    name: "Event 1",
  },
  {
    id: 2,
    profileImage:
      "https://framerusercontent.com/images/zf2KY4R2f7Wvq4TM9dVsfLBzhz8.png",
    name: "Event 2",
  },
  {
    id: 3,
    profileImage:
      "https://framerusercontent.com/images/5j6KwYErDZMO63uF5f09XuQHd7E.jpeg?scale-down-to=1024",
    name: "Event 3",
  },
  {
    id: 4,
    profileImage:
      "https://framerusercontent.com/images/zf2KY4R2f7Wvq4TM9dVsfLBzhz8.png",
    name: "Event 4",
  },
  {
    id: 5,
    profileImage:
      "https://framerusercontent.com/images/5j6KwYErDZMO63uF5f09XuQHd7E.jpeg?scale-down-to=1024",
    name: "Event 5",
  },
  {
    id: 6,
    profileImage:
      "https://framerusercontent.com/images/zf2KY4R2f7Wvq4TM9dVsfLBzhz8.png",
    name: "Event 6",
  },
];

const dammyEvents = [
  {
    id: "1",
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
    id: "2",
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

const Events = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 6 >= users.length ? 0 : prev + 6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMiddleIndex((prev) => (prev + 1) % users.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <EventSearch />
      <div className="text-center px-4 sm:px-8 lg:px-16 py-8 mt-10">
        <h2 className="text-5xl font-semibold flex flex-wrap items-center justify-center gap-4 lg:justify-center">
          <span>Events that</span>
          <span className="inline-block relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-20">
            <Image
              src={users[middleIndex].profileImage}
              alt={users[middleIndex].name}
              fill
              className="rounded-3xl object-cover"
            />
          </span>
          <span>Inspire out</span>
        </h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Our events are crafted to deliver practical insights and foster
          valuable connections. Discover what&apos;s ahead.
        </p>
      </div>

      <div className="container mx-auto">
        <h1 className="text-4xl mb-4">Upcoming Events</h1>
        <p>
          Browse our curated list of padel courts, check real-time availability,
          <br />
          and secure your slot in seconds.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 mb-20">
          {dammyEvents.map((event, index) => (
            <EventsCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
