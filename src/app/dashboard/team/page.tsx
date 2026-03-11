"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

// const teamMembers = [
//   { id: 1, name: "John Doe", email: "john@company.com", role: "admin" },

//   { id: 2, name: "Jane Smith", email: "jane@company.com", role: "member" },

//   { id: 1, name: "Alex Lee", email: "alex@company.com", role: "viewer" },
// ];

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const MyTeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [search, setSearch] = useState("");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()),
  );

  const inviteMember = () => {
    if (!email) return;

    const newMember = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
      role,
    };
    setTeamMembers((prev) => [...prev, newMember]);

    setEmail("");
    setRole("member");
  };

  const removeMember = (id) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const updateRole = (id: number, newRole: string) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, role: newRole } : member,
      ),
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between ">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Team</h1>
          <p>Manage Your Team Members roles</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-400 hover:bg-orange-800 font-semibold text-black">
              Invite members
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-gray-800 text-white font-semibold">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-2"
              />

              <select
                className="w-full bg-gray-300 border rounded-md text-black font-semibold p-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
              <Button
                className="w-full shadow-md  hover:bg-green-600"
                onClick={inviteMember}
              >
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* team table */}
      <div className="mt-6 mb-4">
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full test-sm max-w-sm border rounded-md p-2"
        />
      </div>

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
            {filteredMembers.map((member) => (
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
                  <select
                    value={member.role}
                    onChange={(e) => updateRole(member.id, e.target.value)}
                    className="border rounded-md px-2 py-1 text-sm bg-background"
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  {/* <Badge variant="secondary">{member.role}</Badge> */}
                </td>

                <td className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-gray-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-semibold text-lg">
                          Remove this Member
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          This member will be removed from your team, and they
                          will lose access to the workspace.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => removeMember(member.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
