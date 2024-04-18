import { ChatMessage } from "chatgpt";
import { MarkdownWithFormatting } from "./MarkdownWithFormatting";

export function ConversationMessage({ message, index, isLoading }: Props) {
  return (
    <div
      className={`flex w-full justify-center py-5 ${
        index % 2 === 0 ? "bg-stone-800" : "bg-stone-900"
      }`}
    >
      <div className="flex max-w-3xl grow space-x-3">
        <div className={`${isLoading ? "animate-spin " : ""}text-3xl`}>
          {message.role === "user" ? "👤" : "🦆"}
        </div>
        <section className="grow overflow-hidden">
          <MarkdownWithFormatting text={message.text} />
        </section>
      </div>
    </div>
  );
}

interface Props {
  message: Pick<ChatMessage, "role" | "text">;
  index: number;
  isLoading?: boolean;
}
