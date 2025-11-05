'use server';

/**
 * @fileOverview AI-powered email template suggestion flow.
 *
 * This file defines a Genkit flow that suggests relevant email templates based on the last few email exchanges with a recipient.
 *
 * - `suggestEmailTemplate`: Asynchronously suggests an email template.
 * - `SuggestEmailTemplateInput`: Input type for `suggestEmailTemplate`, including recipient and recent messages.
 * - `SuggestEmailTemplateOutput`: Output type for `suggestEmailTemplate`, containing the suggested template.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEmailTemplateInputSchema = z.object({
  recipient: z.string().email().describe('Email address of the recipient.'),
  recentMessages: z
    .array(
      z.object({
        sender: z.string().email(),
        content: z.string(),
      })
    )
    .describe(
      'A list of recent email exchanges with the recipient, including sender and content.'
    ),
});

export type SuggestEmailTemplateInput = z.infer<typeof SuggestEmailTemplateInputSchema>;

const SuggestEmailTemplateOutputSchema = z.object({
  suggestedTemplate: z.string().describe('The AI-suggested email template.'),
});

export type SuggestEmailTemplateOutput = z.infer<typeof SuggestEmailTemplateOutputSchema>;

export async function suggestEmailTemplate(
  input: SuggestEmailTemplateInput
): Promise<SuggestEmailTemplateOutput> {
  return suggestEmailTemplateFlow(input);
}

const suggestEmailTemplatePrompt = ai.definePrompt({
  name: 'suggestEmailTemplatePrompt',
  input: {schema: SuggestEmailTemplateInputSchema},
  output: {schema: SuggestEmailTemplateOutputSchema},
  prompt: `You are an AI assistant designed to suggest email templates based on recent email exchanges with a recipient.

  Given the following recent email messages, suggest a relevant email template that the user can use to reply to the recipient.

  Recent Messages:
  {{#each recentMessages}}
  Sender: {{this.sender}}
  Content: {{this.content}}
  {{/each}}

  Recipient: {{recipient}}

  Suggest an email template that is appropriate for the context of these messages. Be concise.
  `,
});

const suggestEmailTemplateFlow = ai.defineFlow(
  {
    name: 'suggestEmailTemplateFlow',
    inputSchema: SuggestEmailTemplateInputSchema,
    outputSchema: SuggestEmailTemplateOutputSchema,
  },
  async input => {
    const {output} = await suggestEmailTemplatePrompt(input);
    return output!;
  }
);
