import { z } from "zod";
import { client } from "~/server/ai/chatgpt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  askQuestion: publicProcedure
    .input(
      z.object({
        text: z.string(),
        conversationId: z.string().optional(),
        parentMessageId: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      return client.sendMessage(input.text, {
        conversationId: input.conversationId,
        parentMessageId: input.parentMessageId,
        timeoutMs: 1000 * 60,
      });
    }),
});
