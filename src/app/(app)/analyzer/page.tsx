import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractAssessment } from "@/components/analyzer/contract-assessment";
import { TrendAnalyzer } from "@/components/analyzer/trend-analyzer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyzerPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Analyzer</h1>
        <p className="text-muted-foreground">Leverage AI to assess contracts and analyze market trends.</p>
      </div>
      <Tabs defaultValue="assessment">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="assessment">Contract Assessment</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="assessment">
          <Card>
            <CardHeader>
              <CardTitle>Contract Assessment</CardTitle>
              <CardDescription>
                Paste a contract address to get an instant AI-powered risk and potential assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContractAssessment />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Memecoin Trend Analyzer</CardTitle>
              <CardDescription>
                Analyze memecoin trends and sentiment to identify potential sniper opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrendAnalyzer />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
