import { Instrument_Sans } from "next/font/google";
import "../../app/globals.css";
import Nav from "@/components/nav/Nav";
import SideNav from "@/components/sideNav/SideNav";
import { AuthProvider } from "../providers/Providers";
import { Toaster } from "react-hot-toast";

const sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "DevLinks - Showcase Your Work. Simplify Your Links.",
  description:
    "Create a single link to share your projects, profiles, and achievements with the world. Join 50M+ developers, engineers, and designers who use DevLinks to streamline their online presence.",
  keywords:
    "DevLinks, portfolio, showcase, projects, profiles, achievements, developers, engineers, designers, online presence",
  authors: "William Anaza",
  creator: "William Anaza",
  publisher: "DevLinks",
  robots: "follow, index",
  ogTitle: "DevLinks - Showcase Your Work. Simplify Your Links.",
  ogDescription:
    "Create a single link to share your projects, profiles, and achievements with the world. Join 50M+ developers, engineers, and designers who use DevLinks to streamline their online presence.",
  ogImage: "/images/devlinks-logo.png",
  twitterTitle: "DevLinks - Showcase Your Work. Simplify Your Links.",
  twitterDescription:
    "Create a single link to share your projects, profiles, and achievements with the world. Join 50M+ developers, engineers, and designers who use DevLinks to streamline their online presence.",
  twitterImage: "/images/devlinks-logo.png",
};

export default function AppLayout({ children }) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <AuthProvider>
          <Nav />
          <Toaster />
          <main className="m-4">
            <div className="flex items-stretch gap-6 justify-between">
              <div className="hidden md:block w-full max-h-screen sticky top-0 md:w-2/5 bg-white rounded-lg">
                <SideNav />
              </div>

              <div className="w-full md:w-3/5 bg-white p-2 md:p-10 rounded-lg">
                {children}
              </div>
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
