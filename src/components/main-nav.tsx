'use client';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard, Target, Settings } from 'lucide-react';
import { WalletConnectButton } from '@/components/wallet-connect-button';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/analyzer', label: 'AI Analyzer', icon: Target, tooltip: 'AI Analyzer' },
  { href: '/settings', label: 'Settings', icon: Settings, tooltip: 'Settings' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href)}
            tooltip={item.tooltip}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem>
        <div className="px-2 py-1">
          <WalletConnectButton />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
