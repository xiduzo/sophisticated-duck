import { ChatMessage } from "chatgpt";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { api } from "~/utils/api";

import {
  ArrowDownOnSquareIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

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
  "Playing 20 questions... and 19 answers...",
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
  "Playing 20 questions... with 21 possible answers...",
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

const beginnerProgrammingQuestions = [
  "What is a variable?",
  "How do I write a comment in code?",
  "What is the purpose of a function?",
  "How do I print something to the console?",
  "How do I run my code?",
  "What is a loop?",
  "How do I write a basic 'Hello, World!' program?",
  "What is HTML used for?",
  "What is CSS used for?",
  "What is JavaScript used for?",
  "How do I write a simple addition program?",
  "What is a string?",
  "What is a number?",
  "What is a boolean?",
  "How do I store multiple values together?",
  "What is a conditional statement?",
  "What is indentation in code?",
  "What is debugging?",
  "How do I find help when I'm stuck?",
  "What is version control?",
  "What is a comment and why is it useful?",
  "What is a variable and how do I declare one?",
  "How do I assign a value to a variable?",
  "What is a function and how do I define one?",
  "What is a loop and how does it work?",
  "What is an array and how do I create one?",
  "What is a string and how do I use it?",
  "What is a number and how do I perform arithmetic operations with it?",
  "What is a boolean and how do I use it?",
  "How do I print something to the console?",
  "What is the difference between '==' and '===' in JavaScript?",
  "How do I run my code in a web browser?",
  "What is HTML and how do I create a basic webpage?",
  "What is CSS and how do I style HTML elements?",
  "What is JavaScript and how do I use it to make my webpage interactive?",
  "What is debugging and why is it important?",
  "How do I find and fix errors in my code?",
  "What is version control and why should I use it?",
  "What are some resources for learning programming online?",
  "What is an IDE and why is it useful?",
  "What is a compiler and what does it do?",
  "What is the difference between a compiler and an interpreter?",
  "What is an algorithm and how do I create one?",
  "What is pseudocode and how do I use it?",
  "What is a conditional statement and how do I write one?",
  "What is a variable scope and why is it important?",
  "What is a parameter and how do I pass one to a function?",
  "How do I concatenate strings in JavaScript?",
  "What is the difference between 'null' and 'undefined'?",
  "What is a syntax error and how do I fix it?",
];

export default function Home() {
  const { mutateAsync, isLoading } = api.example.askQuestion.useMutation();

  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const questionToPose = useRef<string | undefined>(
    beginnerProgrammingQuestions.sort(() => Math.random() - 0.5).at(0),
  );
  const conversationId = useRef(crypto.randomUUID());
  const conversationRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, reset, setValue, watch, setFocus } =
    useForm<ChatMessage>();

  const hasInput = watch("text");

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      conversationRef.current?.scrollTo({
        top: conversationRef.current.scrollHeight + 150,
        behavior: "smooth",
      });
    }, 150);
  }, []);

  const onSubmit: SubmitHandler<ChatMessage> = useCallback(
    async (data) => {
      console.log("Sending", { data });
      setConversation((prev) => [...prev, data]);
      questionToPose.current = beginnerProgrammingQuestions
        .sort(() => Math.random() - 0.5)
        .at(0);
      reset();
      scrollToBottom();

      const response = await mutateAsync(data);
      console.log("Received", { response });

      setValue("parentMessageId", response.id);
      setConversation((prev) => [...prev, response]);

      scrollToBottom();
    },
    [reset, mutateAsync, setConversation, scrollToBottom],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submitRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  return (
    <>
      <Head>
        <title>Sophisticated duck</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        {/* <aside className="z-10 h-screen w-64 bg-neutral-800 text-gray-500 shadow-md">
          {"// TODO: Add sidebar"}
        </aside> */}
        <article className="flex grow justify-center text-white">
          <div
            className="flex h-screen grow flex-col divide-y divide-zinc-800/60 overflow-y-scroll bg-zinc-700 pb-52"
            id="conversation"
            ref={conversationRef}
          >
            {conversation.length === 0 && (
              <div className="flex h-screen w-full flex-col items-center justify-center space-y-8">
                <span className="text-9xl">🦆</span>
                <span className="opacity-50">
                  Quack quack quack, how can I help you?
                </span>
              </div>
            )}
            {conversation.map((message, index) => (
              <div
                key={message.id}
                className={`flex w-full justify-center py-5 ${
                  index % 2 === 0 ? "bg-zinc-700" : "bg-zinc-600"
                }`}
              >
                <div className="flex max-w-3xl grow space-x-3">
                  <div className="text-3xl">
                    {message.role === "user" ? "👤" : "🦆"}
                  </div>
                  <div id="markdown" className="grow overflow-x-scroll">
                    {/* <Markdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </Markdown> */}
                    <Markdown
                      className="post-markdown"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        pre: Pre,
                        code({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }: any) {
                          const match = /language-(\w+)/.exec(className || "");

                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              PreTag="div"
                              language={match[1]}
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.text}
                    </Markdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div
                className={`flex w-full justify-center py-5 ${
                  conversation.length % 2 === 0 ? "bg-zinc-700" : "bg-zinc-600"
                }`}
              >
                <div className="flex max-w-3xl grow space-x-3">
                  <div className="animate-spin text-3xl">🦆</div>
                  <div id="markdown" className="grow overflow-x-scroll">
                    {funnyThinkingLines.sort(() => Math.random() - 0.5).at(0)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-zinc-700 to-[#00000000]"></div>
          <section className="absolute bottom-12 w-full max-w-3xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="z-10 flex space-x-4"
            >
              <fieldset>
                <input {...register("parentMessageId")} className="hidden" />
                <input
                  {...register("conversationId")}
                  value={conversationId.current}
                  className="hidden"
                />
                <input
                  {...register("id")}
                  value={crypto.randomUUID()}
                  className="hidden"
                />
                <input {...register("role")} value="user" className="hidden" />
              </fieldset>
              <fieldset className="flex grow space-x-6">
                <textarea
                  autoFocus
                  placeholder={questionToPose.current}
                  tabIndex={0}
                  {...register("text")}
                  className="grow rounded-xl bg-gray-500 p-3 pr-16 shadow-md"
                />
                <button
                  ref={submitRef}
                  disabled={isLoading || !hasInput}
                  className="absolute bottom-2 right-2 rounded-xl bg-green-500 p-2 transition-all duration-150 disabled:bg-gray-500"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </fieldset>
            </form>
          </section>
        </article>
      </main>
    </>
  );
}

const Pre = ({ children }: React.PropsWithChildren) => (
  <pre>
    <CodeCopyBtn>{children}</CodeCopyBtn>
    {children}
  </pre>
);

export function CodeCopyBtn({ children }: React.PropsWithChildren) {
  const handleClick = () => {
    navigator.clipboard.writeText((children as any)?.props?.children);
  };

  return (
    <div className="absolute right-0 cursor-copy p-3 transition-all hover:scale-125">
      <ArrowDownOnSquareIcon className="h-4 w-4" onClick={handleClick} />
    </div>
  );
}
