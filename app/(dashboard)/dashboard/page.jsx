"use client";

import { Button } from "@/components/button/Button";
import Save from "@/components/button/Save";
import Links from "@/components/forms/Links";
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [links, setLinks] = useState([]);

  const handleAddLink = () => {
    setShowForm((prev) => !prev);
  };

  // fetch profile details
  useEffect(() => {
    if (session?.user?.email) {
      const unsubscribe = onSnapshot(
        doc(db, "pages", session.user.email),
        (doc) => {
          try {
            setLinks(doc.data().links);
            if (doc.data().links?.length > 0) {
              setShowForm(true);
            } else {
              setShowForm(false);
            }
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        }
      );

      return unsubscribe;
    }
  }, [session?.user?.email]);

  return (
    <main className="w-full">
      <h2 className="text-dark font-semibold text-xl mb-1">
        Customize your links
      </h2>
      <p className="text-sm font-normal text-grey mb-10">
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
                width={180}
                height={160}
                alt="swipe phone illustration"
              />
            </div>
            <div className="my-4 max-w-lg mx-auto text-center">
              <h3 className="text-dark font-semibold text-xl mb-1">
                Let’s get you started
              </h3>
              <p className="text-sm font-normal text-grey mb-2">
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
