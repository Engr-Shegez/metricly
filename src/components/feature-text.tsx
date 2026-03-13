import React from "react";
import { Check, check } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureText = () => {
  return (
    <div>
      <h3 className="text-3xl font-semibold leading-tight">
        Top Management, to help you see the bigger picture
      </h3>

      <p className="text-muted-foreground mt-6 max-w-md">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        consequuntur earum, fugiat incidunt ea vel ullam, quisquam neque
        voluptatibus similique eum, laboriosam minima velit distinctio nam quis
        commodi dolore facilis?
      </p>

      <Button className="mt-6 bg-orange-500 hover:bg-orange-600">
        See Doc →
      </Button>

      <ul className="mt-8 space-y-4">
        <li className="flex items-center gap-3">
          <span className="bg-orange-500 p-1 rounded-md">
            <Check className="w-4 h-4 text-white" />
          </span>
          Customizable layouts for effective coding
        </li>

        <li className="flex items-center gap-3">
          <span className="bg-orange-500 p-1 rounded-md">
            <Check className="w-4 h-4 text-white" />
          </span>
          Font preferences to match your style
        </li>

        <li className="flex items-center gap-3">
          <span className="bg-orange-500 p-1 rounded-md">
            <Check className="w-4 h-4 text-white" />
          </span>
          Create multiple profiles for versatility
        </li>
      </ul>
    </div>
  );
};

export default FeatureText;
