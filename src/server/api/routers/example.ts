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
        // https://github.com/trpc/trpc/pull/4911
        // onProgress: (progress) => {
        //   console.log("Progress", progress);
        // },
        // stream: true,
      });
    }),
});
