'use client';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LayoutDashboard, Target, Settings } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/analyzer', label: 'AI Analyzer', icon: Target, tooltip: 'AI Analyzer' },
  { href: '/settings', label: 'Settings', icon: Settings, tooltip: 'Settings' },
];

export function MainNav() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

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
        <SidebarMenuButton asChild tooltip={isConnected ? "Disconnect Wallet" : "Connect Wallet"}>
          {isConnected ? (
            <Button variant="ghost" onClick={() => disconnect()}>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
          ) : (
            connectors.map((connector) => (
              <Button
                key={connector.id}
                onClick={() => connect({ connector })}
                disabled={!connector.ready || isLoading}
              >
                Connect Wallet {isLoading && pendingConnector?.id === connector.id && '(connecting)'}
              </Button>
            ))
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
