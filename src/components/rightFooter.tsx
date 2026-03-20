import React from "react";

const RightFooter = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4  gap-y-20">
      {/* Column 1 */}
      <div className="space-y-5 min-w-35">
        <h1 className="font-semibold whitespace-nowrap">Main Pages</h1>
        <div className=" space-y-5 text-gray-500">
          <p>Home</p>
          <p>About</p>
          <p>Features</p>
          <p>Blog</p>
        </div>
      </div>

      {/* Column 2 */}
      <div className="space-y-5 min-w-35 text-gray-500 sm:mr-10">
        <p className="whitespace-nowrap lg:mt-12">Blog Post</p>

        <p>Contact</p>
        <p>Pricing</p>
        <p>Pricing Single</p>
        <p>Checkout</p>
      </div>

      {/* Column 3 */}
      <div className="space-y-5 min-w-35 mr-0 sm:mr-10">
        <h1 className="font-semibold whitespace-nowrap">Social Media</h1>
        <div className=" space-y-5 text-gray-500">
          <p>Instagram</p>
          <p>Facebook</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </div>
      </div>

      {/* Column 4 */}
      <div className="space-y-5 min-w-35 mr-0 sm:mr-10">
        <h1 className="font-semibold whitespace-nowrap">Webflow Stuff</h1>
        <div className=" space-y-5 text-gray-500">
          <p>Style Guide</p>
          <p>Licensing</p>
          <p>Instructions</p>
          <p>Change Log</p>
        </div>
      </div>
    </div>
  );
};

export default RightFooter;
