import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Trash2 } from "lucide-react";

export function AlertConfigurator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Configurator</CardTitle>
        <CardDescription>
          Create and manage alerts for specific wallet activities and token movements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
             <h3 className="font-semibold">Alert: High Value PEPE Buy</h3>
             <div className="flex items-center gap-2">
                <Switch id="alert-1-active" defaultChecked />
                <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
             </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wallet-address-1">Wallet Address</Label>
              <Input id="wallet-address-1" defaultValue="0x123...aBcDe" />
            </div>
            <div>
              <Label htmlFor="token-address-1">Token Address (Optional)</Label>
              <Input id="token-address-1" defaultValue="0xabc...123" />
            </div>
            <div>
              <Label htmlFor="tx-type-1">Transaction Type</Label>
              <Select defaultValue="buy">
                <SelectTrigger id="tx-type-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount-threshold-1">Amount Threshold (USD)</Label>
              <Input id="amount-threshold-1" type="number" defaultValue="1000" />
            </div>
          </div>
        </div>

        <Separator />
        
        <div className="space-y-2">
            <h3 className="font-semibold">Create New Alert</h3>
            <div className="grid md:grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="new-wallet-address">Wallet Address</Label>
                    <Input id="new-wallet-address" placeholder="0x..." />
                </div>
                <div>
                    <Label htmlFor="new-token-address">Token Address (Optional)</Label>
                    <Input id="new-token-address" placeholder="0x..." />
                </div>
                <div>
                    <Label htmlFor="new-tx-type">Transaction Type</Label>
                    <Select>
                        <SelectTrigger id="new-tx-type">
                        <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="buy">Buy</SelectItem>
                        <SelectItem value="sell">Sell</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="new-amount-threshold">Amount Threshold (USD)</Label>
                    <Input id="new-amount-threshold" type="number" placeholder="e.g., 500" />
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Add New Alert
        </Button>
      </CardFooter>
    </Card>
  );
}
