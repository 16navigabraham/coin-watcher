import { AlertConfigurator } from "@/components/settings/alert-configurator";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your alerts and application preferences.</p>
      </div>
      <AlertConfigurator />
    </div>
  );
}
