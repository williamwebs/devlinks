"use client";

import { Button } from "@/components/button/Button";
import Save from "@/components/button/Save";
import Links from "@/components/forms/Links";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [links, setLinks] = useState([]);

  const handleAddLink = () => {
    setShowForm((prev) => !prev);
  };

  // fetch links from db
  const getLinks = async () => {
    try {
      const res = await axios.get("/api/get-links");
      setLinks(res.data);

      if (res.data.length > 0) {
        setShowForm(true);
      } else {
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
      setShowForm(false);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <main className="w-full">
      <h2 className="text-dark font-semibold text-2xl mb-2">
        Customize your links
      </h2>
      <p className="text-base font-normal text-grey mb-10">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <Button
        variant="outline"
        size="default"
        className="block w-full mb-6"
        onClick={handleAddLink}
      >
        + Add new link
      </Button>

      {showForm && <Links />}

      {/* show only if theres no link */}
      {!showForm && (
        <>
          <div className="p-5 bg-white2 rounded-lg mb-6">
            <div className="w-fit mx-auto">
              <Image
                src={"/images/swipe-phone-illustration.png"}
                width={220}
                height={160}
                alt="swipe phone illustration"
              />
            </div>
            <div className="my-8 max-w-lg mx-auto text-center">
              <h3 className="text-dark font-semibold text-2xl mb-2">
                Let’s get you started
              </h3>
              <p className="text-base font-normal text-grey mb-10">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          </div>

          <Save />
        </>
      )}
    </main>
  );
};

export default Dashboard;
