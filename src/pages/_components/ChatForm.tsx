import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ChatMessage } from "chatgpt";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function ChatForm({ isLoading, conversationId, onSubmit }: Props) {
  const questionToPose = useRef<string | undefined>();
  const submitRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLFieldSetElement>(null);
  const [rows, setRows] = useState(2);

  const { register, handleSubmit, reset, setValue, watch, setFocus } =
    useForm<ChatMessage>();

  const textLength = watch("text")?.length ?? 0;

  async function preSubmit(data: ChatMessage) {
    const text = data.text.trim().length ? data.text : questionToPose.current;
    if (!text) return;

    questionToPose.current = beginnerProgrammingQuestions
      .sort(() => Math.random() - 0.5)
      .at(0);

    reset();
    const response = await onSubmit({ ...data, text });
    setValue("parentMessageId", response.id);
    setFocus("text");
  }

  useEffect(() => {
    questionToPose.current = beginnerProgrammingQuestions
      .sort(() => Math.random() - 0.5)
      .at(0);
    setFocus("text");
  }, [setFocus]);

  useEffect(() => {
    const size = textareaRef.current?.getBoundingClientRect();
    if (!size) return;
    const { width } = size;
    const charactersPer100px = 11;
    const charactersPerRow = Math.floor(width / 100) * charactersPer100px;
    setRows(Math.min(7, Math.max(1, Math.ceil(textLength / charactersPerRow))));
  }, [textLength]);

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

  return (
    <form onSubmit={handleSubmit(preSubmit)} className="z-10 flex">
      <fieldset>
        <input {...register("parentMessageId")} className="hidden" />
        <input
          {...register("conversationId")}
          value={conversationId ?? ""}
          className="hidden"
        />
        <input
          {...register("id")}
          value={crypto.randomUUID()}
          className="hidden"
        />
        <input {...register("role")} value="user" className="hidden" />
      </fieldset>
      <fieldset className="flex grow" ref={textareaRef}>
        <textarea
          autoFocus
          placeholder={questionToPose.current}
          tabIndex={0}
          rows={rows}
          {...register("text")}
          className="grow rounded-xl bg-stone-500 p-3 pr-16 shadow-md"
        />
        <button
          ref={submitRef}
          disabled={isLoading}
          className="absolute bottom-2 right-2 rounded-xl bg-green-600 p-2 transition-all duration-150 disabled:bg-gray-500"
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </fieldset>
    </form>
  );
}

interface Props {
  conversationId: string | null;
  isLoading: boolean;
  onSubmit: (data: ChatMessage) => Promise<ChatMessage>;
}

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
