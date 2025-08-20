'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { assessContractAddressAction } from '@/app/(app)/analyzer/actions';
import type { AssessContractAddressOutput } from '@/ai/flows/assess-contract-address';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  contractAddress: z.string().min(1, { message: 'Contract address is required.' }),
});

export function ContractAssessment() {
  const [result, setResult] = useState<AssessContractAddressOutput | null>(null);
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
      const assessmentResult = await assessContractAddressAction(data);
      setResult(assessmentResult);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get assessment. Please try again.",
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
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Assess Contract
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">AI is analyzing the contract...</p>
          </div>
        </div>
      )}

      {result && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-lg">AI Assessment Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap font-mono text-sm">{result.assessment}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
