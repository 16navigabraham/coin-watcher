'use server';

/**
 * @fileOverview AI assessment of a contract address.
 *
 * - assessContractAddress - A function that handles the contract address assessment process.
 * - AssessContractAddressInput - The input type for the assessContractAddress function.
 * - AssessContractAddressOutput - The return type for the assessContractAddress function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessContractAddressInputSchema = z.object({
  contractAddress: z.string().describe('The contract address to assess.'),
});
export type AssessContractAddressInput = z.infer<typeof AssessContractAddressInputSchema>;

const AssessContractAddressOutputSchema = z.object({
  assessment: z.string().describe('The AI assessment of the contract address.'),
});
export type AssessContractAddressOutput = z.infer<typeof AssessContractAddressOutputSchema>;

export async function assessContractAddress(input: AssessContractAddressInput): Promise<AssessContractAddressOutput> {
  return assessContractAddressFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessContractAddressPrompt',
  input: {schema: AssessContractAddressInputSchema},
  output: {schema: AssessContractAddressOutputSchema},
  prompt: `You are an AI assistant that assesses the risk and potential of a given contract address.
  Provide a concise and informative assessment based on your knowledge and any available data.
  Contract Address: {{{contractAddress}}} `,
});

const assessContractAddressFlow = ai.defineFlow(
  {
    name: 'assessContractAddressFlow',
    inputSchema: AssessContractAddressInputSchema,
    outputSchema: AssessContractAddressOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
