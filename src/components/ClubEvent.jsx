import React from "react";
import UpcomingEvents from "./UpcomingEvents";

const ClubEvents = () => {
  return (
    <div className="p-6 w-full bg-[#111] text-white">
      <div className="min-h-300 md:h-[45vw] lg:h-[40vw] w-full text-gray-100 text-center flex items-center justify-center bg-[url(https://res.cloudinary.com/dnbutfdy7/image/upload/v1719665023/expresso/eventbg_zip57y.png)] bg-cover bg-center min-h-[400px]">
        <div className="text-[16vw] relative z-5 font-antonio text-white">
          EVENTS
        </div>
      </div>
      <UpcomingEvents />
      <div>
        <div
          className=" font-montserrat bg-gray-900 text-white p-10 md:p-20"
          style={{
            backgroundImage: `url('/bg3.jpg')`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: "cover",
          }}
        >
          <section className="mb-5 sm:mb-10 sm:flex gap-5 p-1 md:px-4">
            <div className="mb-2 sm:mb-4 text-left">
              <h2 className="text-3xl lg:text-4xl font-bold pl-5 md:pl-10">
                EVENT NAME
              </h2>
            </div>
            <div className="mt-2 sm:mt-10 max-h-[40vh] lg:w-[1200px] p-5 sm:p-10 overflow-y-scroll bg-emerald-800">
              <p className="font-montserrat text-2xl text-white mb-4">
                EVENT DESCRIPTION
              </p>
            </div>
          </section>
          <section className="mb-5 sm:mb-10 sm:flex gap-5 p-1 md:px-4">
            <div className="sm:hidden mb-2 sm:mb-4 text-right">
              <h2 className="text-3xl lg:text-4xl font-bold pl-5 md:pl-10">
                EVENT NAME2
              </h2>
            </div>
            <div className="mt-2 sm:mt-10 max-h-[40vh] lg:w-[1200px] p-5 sm:p-10 overflow-y-scroll bg-emerald-800">
              <p className="font-montserrat text-2xl text-white mb-4">
                EVENT DESC2
              </p>
            </div>
            <div className="hidden sm:block mb-2 sm:mb-4 text-right">
              <h2 className="text-3xl lg:text-4xl font-bold pl-5 md:pl-10">
                EVENT NAME2
              </h2>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClubEvents;
