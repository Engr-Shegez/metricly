"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2, Download, LogOut } from "lucide-react";

const SecurityPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [, setShowPasswordModal] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, USA",
      lastActive: "Just now",
      ip: "192.168.1.1",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, USA",
      lastActive: "2 hours ago",
      ip: "192.168.1.50",
      current: false,
    },
    {
      id: 3,
      device: "Firefox on macOS",
      location: "San Francisco, USA",
      lastActive: "1 day ago",
      ip: "192.168.1.100",
      current: false,
    },
  ];

  const trustedDevices = [
    {
      id: 1,
      name: "MacBook Pro",
      device: "macOS",
      addedDate: "Mar 15, 2026",
    },
    {
      id: 2,
      name: "iPhone",
      device: "iOS",
      addedDate: "Mar 10, 2026",
    },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Security</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account security and login activity
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Password</h3>
            <p className="text-sm text-muted-foreground">
              Change your password to keep your account secure
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
          />
        </div>

        {twoFactorEnabled ? (
          <div className="mt-6 border-t border-border/50 pt-6">
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-2 text-sm font-medium">
                  Authenticator App Setup
                </p>
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app to enable
                  two-factor authentication
                </p>
                <div className="mt-4 flex h-32 w-32 items-center justify-center rounded-lg border border-border/50 bg-white">
                  <span className="text-xs text-muted-foreground">QR Code Here</span>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Can&apos;t scan? Enter this code manually:
                  <code className="ml-2 rounded bg-background px-2 py-1 font-mono">
                    ABCD-1234-5678-90EF
                  </code>
                </p>
              </div>
              <Button variant="outline" size="sm">
                Verify &amp; Enable
              </Button>
            </div>
          </div>
        ) : null}
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Active Sessions</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your active sessions across devices
          </p>
        </div>

        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-start justify-between border-b border-border/50 py-4 last:border-0"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{session.device}</p>
                  {session.current ? (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Current
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {session.location} {" • "} {session.ip}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last active: {session.lastActive}
                </p>
              </div>
              {!session.current ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-6 w-full text-destructive hover:bg-destructive/10"
        >
          Sign Out All Other Sessions
        </Button>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Trusted Devices</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Devices that are trusted and don&apos;t require two-factor authentication
          </p>
        </div>

        <div className="space-y-3">
          {trustedDevices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition hover:bg-muted/50"
            >
              <div>
                <p className="text-sm font-medium">{device.name}</p>
                <p className="text-xs text-muted-foreground">
                  {device.device} {" • "} Added {device.addedDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Security Audit Log</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Download a log of all security events on your account
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/50 p-4">
          <div>
            <p className="text-sm font-medium">Complete Audit Log</p>
            <p className="text-xs text-muted-foreground">
              Generated on Mar 30, 2026
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SecurityPage;
