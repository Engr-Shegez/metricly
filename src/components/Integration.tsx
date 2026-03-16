import React from "react";

type IntegrationProps = {
  name: string;
};

const Integration = ({ name }: IntegrationProps) => {
  return (
    <div className="flex justify-between items-center bg-[#1a1a1b] p-3 rounded">
      <span className="text-sm text-gray-300">{name}</span>

      <button className="text-xs bg-orange-500 px-3 py-1 rounded">
        Launch
      </button>
    </div>
  );
};

export default Integration;
