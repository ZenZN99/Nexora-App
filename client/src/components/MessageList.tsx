import { FaCheck, FaCheckDouble, FaTrash } from "react-icons/fa";
import { useEffect, useRef } from "react";
import type { MessageListProps } from "../types/Chat";



export default function MessageList({
  messages,
  user,
  deleteMessage,
  token,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="scroll flex-1 overflow-y-auto p-6 space-y-3 relative bg-gray-950">
      {messages.map((msg) => {
        const isMe = msg.senderId === user._id;
        return (
          <div
            key={msg._id}
            className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`relative max-w-[75%] py-4 px-10 rounded-2xl text-sm break-words
              ${
                isMe
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md"
                  : "bg-gray-800 text-gray-200 shadow-inner"
              }`}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="message"
                  className="rounded-xl mb-2 max-h-60 w-full object-cover shadow-sm"
                />
              )}
              <p className="whitespace-pre-wrap">{msg.content}</p>

              {isMe && (
                <button
                  onClick={() => deleteMessage(msg._id, token)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs flex items-center gap-1"
                >
                  <FaTrash /> حذف
                </button>
              )}

              {isMe && (
                <div className="text-[10px] mt-1 flex items-center justify-end gap-1 text-gray-300">
                  {msg.seen ? (
                    <FaCheckDouble className="text-green-400" />
                  ) : (
                    <FaCheck className="text-gray-400" />
                  )}
                </div>
              )}

              <div className="text-[10px] text-gray-400 absolute bottom-1 right-2">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </div>

              <div
                className={`absolute bottom-0 w-3 h-3 ${
                  isMe
                    ? "left-0 rotate-45 bg-gradient-to-br from-indigo-500 to-purple-600"
                    : "right-0 rotate-45 bg-gray-800"
                } -mb-1`}
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              />
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
