import React from "react";
import LeftFooter from "../leftFooter";
import RightFooter from "../rightFooter";

const FooterSection = () => {
  return (
    <footer className="mt-12 sm:mt-16 lg:px-6">
      <div className="border-t border-gray-200"></div>

      <div className="grid items-center gap-5 pt-8 text-center sm:text-left md:grid-cols-2">
        <LeftFooter />
        <div className="justify-self-center md:justify-self-end">
          <RightFooter />
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        Copyright {new Date().getFullYear()} Metricly. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
