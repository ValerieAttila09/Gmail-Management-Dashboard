'use server';

/**
 * @fileOverview Categorizes emails into predefined categories based on keywords in the subject and body.
 *
 * - categorizeEmail - A function that categorizes an email.
 * - CategorizeEmailInput - The input type for the categorizeEmail function.
 * - CategorizeEmailOutput - The return type for the categorizeEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeEmailInputSchema = z.object({
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The body of the email.'),
});
export type CategorizeEmailInput = z.infer<typeof CategorizeEmailInputSchema>;

const CategorizeEmailOutputSchema = z.object({
  category: z
    .enum(['primary', 'social', 'promotions', 'updates', 'forums', 'deals'])
    .describe('The predicted category of the email.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence level of the category prediction.'),
});
export type CategorizeEmailOutput = z.infer<typeof CategorizeEmailOutputSchema>;

export async function categorizeEmail(input: CategorizeEmailInput): Promise<CategorizeEmailOutput> {
  return categorizeEmailFlow(input);
}

const categorizeEmailPrompt = ai.definePrompt({
  name: 'categorizeEmailPrompt',
  input: {schema: CategorizeEmailInputSchema},
  output: {schema: CategorizeEmailOutputSchema},
  prompt: `You are an AI assistant that categorizes emails based on their subject and body content into one of the following categories: primary, social, promotions, updates, forums, deals.

  Analyze the email content provided below and determine the most appropriate category for the email. Also return a confidence score between 0 and 1 representing the confidence level of your prediction.

  Email Subject: {{{subject}}}
  Email Body: {{{body}}}

  Ensure that the output adheres to the JSON schema provided. Focus on keywords and context within the subject and body to make an accurate categorization. Consider typical characteristics of each category, for example:
  - Primary: Personal or important communications.
  - Social: Notifications and updates from social media platforms.
  - Promotions: Marketing emails and promotional offers.
  - Updates: General news, announcements, etc.
  - Forums: Email from online discussion forums.
  - Deals: Sales and special offers.
`,
});

const categorizeEmailFlow = ai.defineFlow(
  {
    name: 'categorizeEmailFlow',
    inputSchema: CategorizeEmailInputSchema,
    outputSchema: CategorizeEmailOutputSchema,
  },
  async input => {
    const {output} = await categorizeEmailPrompt(input);
    return output!;
  }
);
