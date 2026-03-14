import React from "react";
import LeftFooter from "../leftFooter";
import RightFooter from "../rightFooter";

const FooterSection = () => {
  return (
    <footer className="border-orange-500 mt-14 px-6 ">
      <div className="border-t border-gray-200"></div>

      <div className="grid md:grid-cols-2 items-center rounded-xl gap-16 ">
        <LeftFooter />
        <RightFooter />
      </div>

      {/* <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-lg font-semibold mb-4">Metricly</h3>
          <p className="text-sm text-gray-600">
            A modearn business analytics platform designed to help you turn data
            into confident growth decisions.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-4"> Product</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#features" className="hover:text-black">
                {" "}
                Features
              </a>
              <a href="#pricing" className="hover:text-black">
                {" "}
                Pricing
              </a>
              <a href="/dashboard" className="hover:text-black">
                {" "}
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-black">
                {" "}
                About
              </a>
              <a href="#" className="hover:text-black">
                {" "}
                Careers
              </a>
              <a href="#" className="hover:text-black">
                {" "}
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-black">
                {" "}
                Privacy Policy
              </a>
              <a href="#" className="hover:text-black">
                {" "}
                Terms of service
              </a>
            </li>
          </ul>
        </div>
      </div> */}

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Metricly. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
