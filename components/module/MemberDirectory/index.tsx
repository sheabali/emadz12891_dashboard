/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Funnel, Mail, MapPin, Phone, Trophy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Membership from "../Home/Membership";
import PlayerCard from "./MemberCard";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const players = [
  {
    name: "Sarah Mitchell",
    level: "Advanced",
    paddle: "Selkirk Vanguard",
    location: "Downtown",
    image: "/images/12.png",
    about:
      "Passionate pickleball player with 5 years of experience. Love playing competitively and helping beginners learn the game.",
    memberSince: "January 2020",
    email: "sarah.mitchell@example.com",
    phone: "+1 (555) 123-4567",
  },
  {
    name: "John Doe",
    level: "Intermediate",
    paddle: "Paddle 1",
    location: "Location 1",
    image: "/images/12.png",
    about:
      "Enthusiastic player looking to improve my game and meet new people.",
    memberSince: "March 2022",
    email: "john.doe@example.com",
    phone: "+1 (555) 234-5678",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jane Smith",
    level: "Beginner",
    paddle: "Paddle 2",
    location: "Location 2",
    image: "/images/12.png",
    about: "New to pickleball and excited to learn!",
    memberSince: "June 2024",
    email: "jane.smith@example.com",
    phone: "+1 (555) 345-6789",
  },
];

const MemberDirectory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const filteredPlayers = players.filter((player) =>
    `${player.name} ${player.paddle}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  const handlePlayerClick = (player: any) => {
    setSelectedMember(player);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#f5fddb] pt-1">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mt-8">
          <h1 className="text-6xl">Member Directory</h1>
          <h3 className="my-4 text-xl">
            Connect with {players.length} club members
          </h3>

          {/* Search */}
          <div className="flex justify-center items-center gap-4">
            <input
              type="text"
              placeholder="Search by name or paddle type..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="px-4 py-4 w-1/2 bg-[#ccf64d] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d99b35]"
            />

            <Button className="py-7 px-4 bg-white border border-gray-300 rounded-lg flex items-center gap-2">
              <Funnel size={18} />
              Filter
            </Button>
          </div>
        </div>

        <div className="mt-10 mb-16 grid grid-cols-4 gap-8">
          {filteredPlayers.map((item, idx) => (
            <div key={idx} onClick={() => handlePlayerClick(item)}>
              <PlayerCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <Membership />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] flex flex-col  p-0 gap-0 overflow-hidden">
          {selectedMember && (
            <>
              <div className="bg-lime-200 p-8">
                <div className="flex items-start gap-4">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    width={112}
                    height={112}
                    className="w-28 h-28 rounded-full object-cover ring-4 ring-lime-400 shadow-lg"
                  />
                  <div className="flex-1">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedMember.name}
                      </DialogTitle>
                    </DialogHeader>
                    <Badge className="bg-lime-500 text-white hover:bg-lime-600">
                      <Trophy size={16} className="mr-1" />
                      {selectedMember.level}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto">
                {/* About Section */}
                <div className="mb-8">
                  <h3 className="text-xl text-gray-900 mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedMember.about}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <span className="text-sm font-medium">Paddle Type</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {selectedMember.paddle}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <span className="text-sm font-medium">Member Since</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {selectedMember.memberSince}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <MapPin size={18} />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {selectedMember.location}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Trophy size={18} />
                      <span className="text-sm font-medium">Skill Level</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {selectedMember.level}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Contact Information
                  </h3>

                  <div className="space-y-3">
                    <Card>
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="bg-lime-100 rounded-full p-3">
                          <Mail size={20} className="text-lime-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">
                            Email
                          </p>
                          <p className="text-gray-900">
                            {selectedMember.email}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="bg-lime-100 rounded-full p-3">
                          <Phone size={20} className="text-lime-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">
                            Phone
                          </p>
                          <p className="text-gray-900">
                            {selectedMember.phone}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberDirectory;
