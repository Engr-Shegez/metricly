import { User, CreditCard, Users, Shield, Bell, Key } from "lucide-react";

export const settingsNav = [
  {
    label: "Account",
    items: [
      {
        title: "Profile",
        href: "/dashboard/settings/profile",
        icon: User,
      },
      {
        title: "Billing",
        href: "/dashboard/settings/billing",
        icon: CreditCard,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        title: "Team",
        href: "/dashboard/settings/team",
        icon: Users,
      },
    ],
  },
  {
    label: "Security",
    items: [
      {
        title: "Security",
        href: "/dashboard/settings/security",
        icon: Shield,
      },
      {
        title: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: Bell,
      },
    ],
  },
  {
    label: "Developer",
    items: [
      {
        title: "API Keys",
        href: "/dashboard/settings/api-keys",
        icon: Key,
      },
    ],
  },
];
