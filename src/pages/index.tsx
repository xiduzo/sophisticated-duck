import { ChatMessage } from "chatgpt";
import Head from "next/head";
import React, { useCallback, useRef, useState } from "react";

import { api } from "~/utils/api";

import { ChatForm } from "./_components/ChatForm";
import { ConversationMessage } from "./_components/ConversationMessage";

export default function Home() {
  const { mutateAsync, isLoading } = api.example.askQuestion.useMutation();

  const [conversation, setConversation] = useState<ChatMessage[]>([]);

  const conversationId = useRef(crypto.randomUUID());
  const conversationRef = useRef<HTMLElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      conversationRef.current?.scrollTo({
        top: conversationRef.current.scrollHeight + 150,
        behavior: "smooth",
      });
    }, 150);
  }, []);

  const addChatMessage = useCallback(
    (message: ChatMessage) => {
      setConversation((prev) => [...prev, message]);
      scrollToBottom();
    },
    [scrollToBottom],
  );

  const handleSubmit = useCallback(
    async (data: ChatMessage) => {
      addChatMessage(data);

      const response = await mutateAsync(data);

      addChatMessage(response);

      return response;
    },
    [mutateAsync, setConversation, scrollToBottom],
  );

  return (
    <>
      <Head>
        <title>Sophisticated duck</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex h-screen flex-col overflow-x-hidden pb-52"
        ref={conversationRef}
      >
        {conversation.length === 0 && (
          <section className="flex h-screen w-full flex-col items-center justify-center space-y-8">
            <span className="text-9xl">🦆</span>
            <span className="opacity-50">
              Quack quack quack, how can I help you?
            </span>
          </section>
        )}
        {conversation.map((message, index) => (
          <ConversationMessage key={index} message={message} index={index} />
        ))}
        {isLoading && (
          <ConversationMessage
            message={{
              role: "assistant",
              text:
                funnyThinkingLines.sort(() => Math.random() - 0.5).at(0) ??
                "Thinking...",
            }}
            index={conversation.length}
            isLoading
          />
        )}
        <section className="absolute bottom-0 w-screen">
          <div className="m-auto -mb-12 w-full max-w-3xl">
            <ChatForm
              conversationId={conversationId.current}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="h-20 w-full bg-gradient-to-t from-stone-900 to-[#0c0a0900]"></div>
        </section>
      </main>
    </>
  );
}

const funnyThinkingLines = [
  "Hold on... recalculating brain cells...",
  "Let me check... the answer is in the cosmic mail...",
  "Hmm... summoning the great Oracle of Pondering...",
  "Time to Sherlock this... or maybe just flip a coin...",
  "Channeling philosopher mode... or tuning into cat memes...",
  "Summoning curiosity... or summoning pizza delivery...",
  "Brain cells doing the cha-cha...",
  "Untangling the spaghetti of thoughts...",
  "Hold your horses! Abacus time... or maybe a snack break...",
  "Twisting the Rubik's Cube of ideas...",
  "Brain goes on vacation... but I've got a forwarding address...",
  "Consulting the Oracle of Bacon... sizzling thoughts...",
  "Serious brainstorming... or just making brain soup...",
  "SpongeBob wisdom incoming... absorbency at maximum...",
  "Embarking on an epic thought journey... or just daydreaming...",
  "Tapping into universe wisdom... or just asking Siri...",
  "Tricky as a cat's tail... chasing enlightenment...",
  "Mental gymnastics... stuck in a somersault...",
  "Donning the thinking cap... or maybe a propeller beanie...",
  "Hold on... recalibrating the thought-o-meter...",
  "Let me check... diving into the sea of imagination...",
  "Hmm... consulting the wisdom of the quantum hamster...",
  "Time to Sherlock this... or maybe just consult a fortune cookie...",
  "Channeling philosopher mode... or just pretending to look wise...",
  "Summoning curiosity... or summoning snacks... decisions, decisions...",
  "Brain cells doing the tango...",
  "Untangling the spaghetti of ideas...",
  "Hold your horses! Abacus time... or maybe just a quick game of hopscotch...",
  "Twisting the Rubik's Cube of cognition...",
  "Brain goes on vacation... sending a postcard from the thought beach...",
  "Consulting the Oracle of Bacon... bacon-scented enlightenment...",
  "Serious brainstorming... or just tickling the brain cells...",
  "SpongeBob wisdom incoming... absorbing wisdom like a sponge...",
  "Embarking on a thought safari... or maybe just getting lost in the jungle of ideas...",
  "Tapping into universe wisdom... or perhaps just consulting the stars...",
  "Tricky as a cat's tail... trying to catch it without getting scratched...",
  "Mental gymnastics... stuck in a mental somersault...",
  "Donning the thinking cap... or maybe upgrading to a thinking fedora...",
  "Brain cells on a rollercoaster...",
  "Untangling the spaghetti of ideas...",
  "Diving into the thought ocean...",
  "Summoning the wisdom of ancient memes...",
  "Thinking cap engaged... or maybe just a beanie...",
  "Mental acrobatics in progress...",
  "Brainstorming in a thunderstorm...",
  "Noodling on this like a plate of spaghetti...",
  "Contemplating the mysteries of the universe... or just pondering lunch options...",
  "Stirring the cauldron of cognition...",
  "Scratching my head... metaphorically speaking...",
  "Letting the hamster in my brain take the wheel...",
  "Mind palace under construction...",
  "Searching for answers in the cosmic cookie jar...",
  "Chasing the tail of thought...",
  "Trying to catch lightning in a thought bottle...",
  "Navigating the labyrinth of ideas...",
  "Consulting the archives of whimsy...",
  "Swimming in a sea of thoughts...",
  "Hatching an idea... or an egg...",
  "Dusting off the cobwebs of thought...",
  "Tuning in to the frequency of insight...",
  "Nudging the gears of contemplation...",
  "Brainstorming... and occasionally drizzling...",
  "Poking the hive of creativity...",
  "Lost in thought... and probably lost on a map too...",
  "Wading through the swamp of ideas...",
  "Brewing up a storm of intellect...",
  "Marinating in a pool of contemplation...",
  "Plugging into the thought matrix...",
  "Climbing the mountain of contemplation...",
  "Riding the thought train to destination unknown...",
  "Meandering down the river of reflection...",
  "Mining for nuggets of wisdom...",
  "Rummaging through the attic of thought...",
  "Tuning the frequency of inspiration...",
  "Juggling ideas like a circus performer...",
  "Noodling on this like a jazz musician...",
];
