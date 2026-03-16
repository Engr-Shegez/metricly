import React from "react";
import LeftFooter from "../leftFooter";
import RightFooter from "../rightFooter";

const FooterSection = () => {
  return (
    <footer className="border-orange-500  mt-170  lg:mt-14 lg:px-10 ">
      <div className="border-t border-gray-200"></div>

      <div className="grid md:grid-cols-2 items-center rounded-xl gap-5 ">
        <LeftFooter />
        <div className="-ml-10">
          <RightFooter />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Metricly. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
