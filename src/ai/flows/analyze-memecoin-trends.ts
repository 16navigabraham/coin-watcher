// This is a server-side file.
'use server';

/**
 * @fileOverview Analyzes memecoin trends and sentiment to identify potential sniper opportunities.
 *
 * - analyzeMemecoinTrends - A function that analyzes memecoin trends.
 * - AnalyzeMemecoinTrendsInput - The input type for the analyzeMemecoinTrends function.
 * - AnalyzeMemecoinTrendsOutput - The return type for the analyzeMemecoinTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMemecoinTrendsInputSchema = z.object({
  contractAddress: z.string().describe('The contract address of the memecoin.'),
});
export type AnalyzeMemecoinTrendsInput = z.infer<typeof AnalyzeMemecoinTrendsInputSchema>;

const AnalyzeMemecoinTrendsOutputSchema = z.object({
  trendAnalysis: z.string().describe('The analysis of the memecoin trend.'),
  sentimentAnalysis: z.string().describe('The sentiment analysis of the memecoin.'),
  sniperOpportunity: z.boolean().describe('Whether or not the memecoin presents a sniper opportunity.'),
  reason: z.string().describe('The explanation as to why the memecoin presents a sniper opportunity or not.')
});
export type AnalyzeMemecoinTrendsOutput = z.infer<typeof AnalyzeMemecoinTrendsOutputSchema>;

export async function analyzeMemecoinTrends(input: AnalyzeMemecoinTrendsInput): Promise<AnalyzeMemecoinTrendsOutput> {
  return analyzeMemecoinTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMemecoinTrendsPrompt',
  input: {schema: AnalyzeMemecoinTrendsInputSchema},
  output: {schema: AnalyzeMemecoinTrendsOutputSchema},
  prompt: `You are an expert in memecoin analysis and sniper opportunities.

You will analyze the trend and sentiment of a memecoin based on its contract address.

You will determine whether or not the memecoin presents a sniper opportunity, and set the sniperOpportunity output field appropriately.

Contract Address: {{{contractAddress}}}`,
});

const analyzeMemecoinTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeMemecoinTrendsFlow',
    inputSchema: AnalyzeMemecoinTrendsInputSchema,
    outputSchema: AnalyzeMemecoinTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
