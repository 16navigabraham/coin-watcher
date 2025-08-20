'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { analyzeMemecoinTrendsAction } from '@/app/(app)/analyzer/actions';
import type { AnalyzeMemecoinTrendsOutput } from '@/ai/flows/analyze-memecoin-trends';
import { Loader2, LineChart, ThumbsUp, ThumbsDown, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  contractAddress: z.string().min(1, { message: 'Contract address is required.' }),
});

export function TrendAnalyzer() {
  const [result, setResult] = useState<AnalyzeMemecoinTrendsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contractAddress: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeMemecoinTrendsAction(data);
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get analysis. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LineChart className="mr-2 h-4 w-4" />
            )}
            Analyze Trends
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">AI is analyzing trends...</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
            <Card className="bg-secondary/50">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="text-accent" />
                    Sniper Opportunity
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <Badge variant={result.sniperOpportunity ? 'default' : 'destructive'} className="text-lg">
                      {result.sniperOpportunity ? <ThumbsUp className="mr-2"/> : <ThumbsDown className="mr-2"/>}
                      {result.sniperOpportunity ? 'YES' : 'NO'}
                  </Badge>
                  <p className="text-muted-foreground">{result.reason}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle>Trend Analysis</CardTitle></CardHeader>
                    <CardContent><p>{result.trendAnalysis}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Sentiment Analysis</CardTitle></CardHeader>
                    <CardContent><p>{result.sentimentAnalysis}</p></CardContent>
                </Card>
            </div>
        </div>
      )}
    </div>
  );
}
