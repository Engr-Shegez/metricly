"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mail, Bell, MessageSquare, Lock, Zap } from "lucide-react";

type EmailNotificationKey = "marketing" | "security" | "updates" | "digest";
type InAppNotificationKey = "alerts" | "mentions" | "comments" | "activities";

const NotificationsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    marketing: true,
    security: true,
    updates: true,
    digest: false,
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    alerts: true,
    mentions: true,
    comments: true,
    activities: false,
  });

  const [notificationFrequency, setNotificationFrequency] = useState("instant");

  const handleEmailToggle = (key: EmailNotificationKey) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInAppToggle = (key: InAppNotificationKey) => {
    setInAppNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationTypes: Array<{
    id: EmailNotificationKey;
    title: string;
    description: string;
    icon: typeof Mail;
  }> = [
    {
      id: "marketing",
      title: "Marketing & Promotions",
      description: "Receive updates about new features, tips, and promotions",
      icon: Mail,
    },
    {
      id: "security",
      title: "Security Alerts",
      description:
        "Critical security notifications and suspicious activity alerts",
      icon: Lock,
    },
    {
      id: "updates",
      title: "Product Updates",
      description: "Learn about new launches and product improvements",
      icon: Zap,
    },
  ];

  const inAppNotificationTypes: Array<{
    id: InAppNotificationKey;
    title: string;
    description: string;
  }> = [
    {
      id: "alerts",
      title: "System Alerts",
      description: "Important system notifications and warnings",
    },
    {
      id: "mentions",
      title: "Mentions",
      description: "When someone mentions you in comments or messages",
    },
    {
      id: "comments",
      title: "Comments",
      description: "Replies to your comments or feedback",
    },
    {
      id: "activities",
      title: "Activity Updates",
      description: "Updates on shared items and team activities",
    },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground mt-1">
          Manage how you receive updates and stay informed about what matters to
          you
        </p>
      </div>

      {/* Global Notification Settings */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-4">
              Notification Frequency
            </h3>
            <div className="space-y-3">
              {[
                {
                  value: "instant",
                  label: "Instant",
                  description: "Receive notifications immediately",
                },
                {
                  value: "hourly",
                  label: "Hourly Digest",
                  description: "Get notifications once per hour",
                },
                {
                  value: "daily",
                  label: "Daily Digest",
                  description: "Receive a summary once per day",
                },
                {
                  value: "weekly",
                  label: "Weekly Digest",
                  description: "Get a weekly summary",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center p-3 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/50 transition"
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={notificationFrequency === option.value}
                    onChange={(e) => setNotificationFrequency(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Email Notifications */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-1 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Notifications
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose which emails you&apos;d like to receive
          </p>
        </div>

        <div className="space-y-4">
          {notificationTypes.map((type) => {
            const notif =
              emailNotifications[type.id as keyof typeof emailNotifications];
            return (
              <div
                key={type.id}
                className="flex items-start justify-between py-4 border-b border-border/50 last:border-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <type.icon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{type.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
                <Switch
                  checked={notif}
                  onCheckedChange={() => handleEmailToggle(type.id)}
                  className="ml-4"
                />
              </div>
            );
          })}

          {/* Digest Setting */}
          <div className="flex items-start justify-between py-4 border-b border-border/50">
            <div className="flex-1">
              <p className="text-sm font-medium">Weekly Digest</p>
              <p className="text-sm text-muted-foreground mt-1">
                Receive a weekly summary of all your notifications
              </p>
            </div>
            <Switch
              checked={emailNotifications.digest}
              onCheckedChange={() => handleEmailToggle("digest")}
              className="ml-4"
            />
          </div>
        </div>
      </Card>

      {/* In-App Notifications */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-1 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            In-App Notifications
          </h3>
          <p className="text-sm text-muted-foreground">
            Notifications you&apos;ll see inside your account
          </p>
        </div>

        <div className="space-y-4">
          {inAppNotificationTypes.map((type) => {
            const notif =
              inAppNotifications[type.id as keyof typeof inAppNotifications];
            return (
              <div
                key={type.id}
                className="flex items-start justify-between py-4 border-b border-border/50 last:border-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{type.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
                <Switch
                  checked={notif}
                  onCheckedChange={() => handleInAppToggle(type.id)}
                  className="ml-4"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Do Not Disturb */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Do Not Disturb</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Set a quiet time when you don&apos;t want to receive notifications
            </p>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Enable Do Not Disturb
              </label>
              <Switch defaultChecked={false} />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div>
                <label className="text-xs font-medium block mb-2">From</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 rounded-md border border-input"
                  defaultValue="22:00"
                  disabled
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-2">To</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 rounded-md border border-input"
                  defaultValue="08:00"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Notification History */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Notification Center</h3>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your notification history
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              alert("This would open your notification center/history")
            }
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            View All Notifications
          </Button>
        </div>
      </Card>

      {/* Save Section - Info Message */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm text-blue-900">
          Your notification preferences are saved automatically as you make
          changes.
        </p>
      </div>
    </div>
  );
};

export default NotificationsPage;
