'use client';

import { AlertConfigurator } from "@/components/settings/alert-configurator";
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'; // Assuming wagmi is used for wallet connection
import { z } from 'zod';

// Define schema for settings validation
const settingsSchema = z.object({
  alertThreshold: z.number().min(0).max(100).default(50),
  // Add other settings fields as needed with validation
});

export default function SettingsPage() {
  const { address, isConnected } = useAccount(); // Get connected wallet address from wagmi
  const [settings, setSettings] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial settings based on the connected wallet address
  useEffect(() => {
    const fetchSettings = async () => {
      if (isConnected && address) {
        setIsLoading(true);
        try {
          // In a real application, fetch settings from a backend API
          // Example: const response = await fetch(`/api/settings/${address}`);
          // const data = await response.json();
          // setSettings(settingsSchema.parse(data)); // Validate fetched settings

          // For demonstration, using local storage
          const storedSettings = localStorage.getItem(`userSettings_${address}`);
          if (storedSettings) {
            setSettings(settingsSchema.parse(JSON.parse(storedSettings)));
          } else {
            setSettings(settingsSchema.parse({})); // Default settings if none found
          }
        } catch (error) {
          console.error("Failed to fetch settings:", error);
          setSettings(settingsSchema.parse({})); // Default settings on error
        } finally {
          setIsLoading(false);
        }
      } else {
        setSettings({});
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [address, isConnected]); // Re-run when address or connection status changes

  const handleSettingsChange = (newSettings) => {
    const validation = settingsSchema.safeParse(newSettings);
    if (validation.success) {
 setSettings(newSettings);
 setErrors({});
 if (isConnected && address) {
 // In a real application, save settings to a backend API
 // Example: await fetch(`/api/settings/${address}`, { method: 'POST', body: JSON.stringify(newSettings) });

 // For demonstration, saving to local storage
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
