"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  UserPlus,
  Trash2,
  MoreVertical,
  Copy,
  Mail,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const TeamPage = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      role: "Owner",
      status: "active",
      avatar: "JD",
      joinedDate: "Mar 1, 2026",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@company.com",
      role: "Admin",
      status: "active",
      avatar: "SS",
      joinedDate: "Mar 5, 2026",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Member",
      status: "active",
      avatar: "MJ",
      joinedDate: "Mar 10, 2026",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@company.com",
      role: "Member",
      status: "active",
      avatar: "EB",
      joinedDate: "Mar 15, 2026",
    },
  ];

  // Mock data for pending invitations
  const pendingInvites = [
    {
      id: 1,
      email: "alex@company.com",
      role: "Member",
      invitedDate: "Mar 28, 2026",
      expiresDate: "Apr 4, 2026",
    },
    {
      id: 2,
      email: "jordan@company.com",
      role: "Admin",
      invitedDate: "Mar 25, 2026",
      expiresDate: "Apr 1, 2026",
    },
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail) {
      alert(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
      setInviteEmail("");
      setInviteRole("member");
      setShowInviteModal(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "admin":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Team</h1>
        <p className="text-muted-foreground mt-1">
          Manage your team members and their permissions
        </p>
      </div>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Members</p>
              <p className="text-2xl font-semibold mt-1">{teamMembers.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Invites</p>
              <p className="text-2xl font-semibold mt-1">
                {pendingInvites.length}
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-semibold mt-1">
                {teamMembers.length + pendingInvites.length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Invite Member Button */}
      <Button
        onClick={() => setShowInviteModal(true)}
        className="w-full md:w-auto"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Invite Team Member
      </Button>

      {/* Invite Modal */}
      {showInviteModal && (
        <Card className="p-6 border-blue-200 bg-blue-50/30">
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="w-full px-3 py-2 rounded-md border border-input"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Role</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-input"
              >
                <option value="member">Member - Can view and manage data</option>
                <option value="admin">Admin - Can manage team and settings</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" size="sm">
                Send Invite
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Team Members */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Active Members</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {teamMembers.length} members in your workspace
          </p>
        </div>

        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  {member.avatar}
                </div>

                {/* Member Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{member.name}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border ${getRoleBadgeColor(
                        member.role
                      )}`}
                    >
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {member.email}
                  </p>
                </div>

                {/* Join Date */}
                <div className="text-right hidden md:block">
                  <p className="text-xs text-muted-foreground">
                    Joined {member.joinedDate}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {member.role !== "Owner" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive ml-4"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold">Pending Invitations</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {pendingInvites.length} pending invite
              {pendingInvites.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="space-y-3">
            {pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-4 rounded-lg border border-amber-200/50 bg-amber-50/30 hover:bg-amber-50/50 transition"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon */}
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Mail className="h-4 w-4 text-amber-600" />
                  </div>

                  {/* Invite Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{invite.email}</p>
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                        Pending
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Invited {invite.invitedDate} • Expires{" "}
                      {invite.expiresDate}
                    </p>
                  </div>

                  {/* Role Badge */}
                  <div className="text-right hidden md:block">
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                      {invite.role}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <Button variant="ghost" size="sm" title="Resend invite">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    title="Cancel invite"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Team Settings */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Team Settings</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure team-wide behavior and permissions
          </p>
        </div>

        <div className="space-y-4">
          {/* Setting 1 */}
          <div className="flex items-center justify-between py-4 border-b border-border/50">
            <div className="flex-1">
              <p className="text-sm font-medium">
                Allow members to invite others
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Non-admin members can send team invitations
              </p>
            </div>
            <Switch defaultChecked={false} />
          </div>

          {/* Setting 2 */}
          <div className="flex items-center justify-between py-4 border-b border-border/50">
            <div className="flex-1">
              <p className="text-sm font-medium">
                Require email verification
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Verify email addresses before granting access
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>

          {/* Setting 3 */}
          <div className="flex items-center justify-between py-4">
            <div className="flex-1">
              <p className="text-sm font-medium">
                Enable SSO (Single Sign-On)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Allow team members to use company SSO credentials
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200/50 bg-red-50/30">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-red-900">Danger Zone</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border border-red-200/50 bg-background">
            <div>
              <p className="text-sm font-medium">Delete Team</p>
              <p className="text-xs text-muted-foreground mt-1">
                Permanently delete this team and all associated data
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeamPage;
