"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  user: {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
  };
};

export default function ProfileForm({ user }: Props) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    // simulate API
    await new Promise((res) => setTimeout(res, 1000));

    setLoading(false);
    alert("Profile updated");
  };

  return (
    <div className="space-y-8 ">
      {/* Avatar Section */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full p-4 bg-muted flex items-center font-semibold justify-center text-sm">
          IMG
        </div>

        <div>
          <p className="text-lg font-medium">Profile picture</p>
          <p className="text-sm text-muted-foreground">PNG, JPG up to 2MB</p>

          <Button variant="outline" size="sm" className="mt-2">
            Upload
          </Button>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-gray-200 shadow-xs p-6 space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="h-12 max-w-md"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 max-w-md"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us a little about yourself"
            className="min-h-25 max-w-md"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
