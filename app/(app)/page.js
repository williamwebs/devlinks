import { Button } from "@/components/button/Button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default function Home() {
  const session = getServerSession(authOptions);

  if (session?.user) redirect("/dashboard");

  return (
    <main className="relative">
      <header className="fixed top-4 md:top-8 left-[50%] -translate-x-[50%] bg-white2 backdrop-blur container py-4 shadow rounded-lg text-white2">
        <nav className="flex items-center justify-between">
          {/* logo */}
          <Link href={"/"}>
            <Image
              src={"/images/devlinks-logo.png"}
              height={30}
              width={130}
              alt="devlinks logo"
              className="hidden md:block"
            />

            {/* mobile screens */}
            <Image
              src={"/images/solar_link-circle-bold.png"}
              height={40}
              width={40}
              alt="devlinks logo"
              className="block md:hidden"
            />
          </Link>
          {/* cta */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="default" href="/login">
              Log in
            </Button>
            <Button variant="default" size="default" href="/register">
              Sign up free
            </Button>
          </div>
        </nav>
      </header>
      <section className="h-screen w-full bg-codewars py-32">
        <div className="container h-full flex items-center pt-20">
          <div className="w-full md:w-1/2">
            <h1 className="text-white2 font-bold text-5xl">
              Showcase Your Work. Simplify Your Links.
            </h1>
            <p className="my-4 text-bgGrey font-medium text-base">
              Create a single link to share your projects, profiles, and
              achievements with the world. Join 50M+ developers, engineers, and
              designers who use DevLinks to streamline their online presence.
            </p>
            <Button
              variant="default"
              size="default"
              href="/login"
              className="mt-4"
            >
              Get started
            </Button>
          </div>
        </div>
      </section>
      <section className="h-screen w-full bg-stackoverflow py-32">
        <div className="container h-full flex items-center">
          <div className="w-full md:w-1/2 ml-auto">
            <h2 className="text-white2 font-bold text-5xl">
              Customize Your Portfolio in Minutes
            </h2>
            <p className="my-4 text-bgGrey font-medium text-base">
              Connect your social media profiles, projects, and achievements to
              create a personalized portfolio. Share your unique DevLinks URL on
              Instagram, TikTok, Twitter, and other platforms to drive traffic
              to your work.
            </p>
            <Button
              variant="outline"
              size="default"
              href="/login"
              className="mt-4 text-white2 border-none bg-codewars hover:bg-codewars/85 hover:text-white2"
            >
              Get started for free
            </Button>
          </div>
        </div>
      </section>
      <section className="h-screen w-full bg-primary py-32">
        <div className="container h-full flex items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-white2 font-bold text-5xl">
              Share Your Expertise. Grow Your Audience.
            </h2>
            <p className="my-4 text-bgGrey font-medium text-base">
              Use DevLinks to share your knowledge, projects, and achievements
              with the world. Add your unique DevLinks URL to your social media
              bios, email signature, and offline materials to drive traffic to
              your online presence.
            </p>
            <Button
              variant="default"
              size="default"
              href="/login"
              className="mt-4 text-white2 border-none bg-gitlab hover:bg-gitlab/85 hover:text-white2"
            >
              Get started for free
            </Button>
          </div>
        </div>
      </section>
      {/* footer */}
      <footer className="bg-devto py-3">
        <div className="container text-grey text-sm text-center">
          &copy;{" "}
          <a href="https://wa.link/u8xe3d" className="underline">
            th_ejouRney.xyz
          </a>
          , 2024
        </div>
      </footer>
    </main>
  );
}
