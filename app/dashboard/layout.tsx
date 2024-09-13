import Footer from "@/components/footer/Footer";
import LeftSideNav from "@/components/left-side-nav/LeftSideNav";
import TopNav from "@/components/top-nav/TopNav";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full-x flex flex-col">
      <TopNav />
      <div className="flex-1 overflow-hidden flex">
        <LeftSideNav className="w-16 md:w-64 flex-none border-r overflow-hidden" />
        <main className="flex-1 overflow-hidden scrollbar-thin flex flex-col">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
