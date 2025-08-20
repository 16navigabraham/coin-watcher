'use client';

import { AlertConfigurator } from "@/components/settings/alert-configurator";
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { z } from 'zod';

const settingsSchema = z.object({
  alertThreshold: z.number().min(0).max(100).default(50),
});

export default function SettingsPage() {
  const { address, isConnected } = useAccount();
  const [settings, setSettings] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      if (isConnected && address) {
        setIsLoading(true);
        try {
          const storedSettings = localStorage.getItem(`userSettings_${address}`);
          if (storedSettings) {
            setSettings(settingsSchema.parse(JSON.parse(storedSettings)));
          } else {
            setSettings(settingsSchema.parse({})); 
          }
        } catch (error) {
          console.error("Failed to fetch settings:", error);
          setSettings(settingsSchema.parse({}));
        } finally {
          setIsLoading(false);
        }
      } else {
        setSettings({});
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [address, isConnected]);

  const handleSettingsChange = (newSettings: any) => {
    const validation = settingsSchema.safeParse(newSettings);
    if (validation.success) {
      setSettings(newSettings);
      setErrors({});
      if (isConnected && address) {
        localStorage.setItem(`userSettings_${address}`, JSON.stringify(newSettings));
      }
    } else {
      setErrors(validation.error.formErrors.fieldErrors);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your alerts and application preferences.</p>
      </div>
      {isLoading ? (
        <p>Loading settings...</p>
      ) : (
      <AlertConfigurator settings={settings} onSettingsChange={handleSettingsChange} errors={errors} />
      )}
    </div>
  );
}
