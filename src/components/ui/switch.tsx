"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    { className, onCheckedChange, checked, defaultChecked, onChange, ...props },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState(
      checked ?? defaultChecked ?? false,
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      onCheckedChange?.(newChecked);
      onChange?.(e);
    };

    return (
      <label
        className={cn(
          "relative inline-flex items-center cursor-pointer h-6 w-11",
          className,
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          checked={isChecked}
          onChange={handleChange}
          className="sr-only peer"
          {...props}
        />
        <div className="w-11 h-6 bg-input rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:start-1 after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-transform after:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-disabled:opacity-50 peer-disabled:cursor-not-allowed" />
      </label>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
