'use server';

import { analyzeMemecoinTrends, AnalyzeMemecoinTrendsInput, AnalyzeMemecoinTrendsOutput } from '@/ai/flows/analyze-memecoin-trends';
import { assessContractAddress, AssessContractAddressInput, AssessContractAddressOutput } from '@/ai/flows/assess-contract-address';
import { z } from 'zod';

const contractAddressSchema = z.object({
  contractAddress: z.string().min(1, { message: 'Contract address is required.' }),
});

export async function assessContractAddressAction(input: AssessContractAddressInput): Promise<AssessContractAddressOutput> {
  const validatedInput = contractAddressSchema.parse(input);
  return assessContractAddress(validatedInput);
}

export async function analyzeMemecoinTrendsAction(input: AnalyzeMemecoinTrendsInput): Promise<AnalyzeMemecoinTrendsOutput> {
  const validatedInput = contractAddressSchema.parse(input);
  return analyzeMemecoinTrends(validatedInput);
}
