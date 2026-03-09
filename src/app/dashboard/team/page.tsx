import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

const teamMembers = [
  { id: 1, name: "John Doe", email: "john@company.com", role: "admin" },

  { id: 2, name: "Jane Smith", email: "jane@company.com", role: "member" },

  { id: 1, name: "Alex Lee", email: "alex@company.com", role: "viewer" },
];

const MyTeamPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between ">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Team</h1>
          <p>Manage Your Team Members roles</p>
        </div>

        <Button>Invite members</Button>
      </div>
      {/* team table */}
      <Card className="p-6 mt-6">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b">
            <tr>
              <th className="py-3">Member</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${member.email}`}
                      />
                      <AvatarFallback>
                        {member.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                </td>

                <td>{member.email}</td>
                <td>
                  <Badge variant="secondary">{member.role}</Badge>
                </td>

                <td className="text-right">
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MyTeamPage;
