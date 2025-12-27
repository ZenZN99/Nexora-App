import { IoMdImages } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import type { ChatInputProps } from "../types/Chat";



export default function ChatInput({
  message,
  setMessage,
  handleSend,
  handleTyping,
  handleImageChange,
  showEmoji,
  setShowEmoji,
}: ChatInputProps) {
  const onEmojiClick = (emojiObject: any) => {
    setMessage(message + emojiObject.emoji);
  };

  return (
    <div className="p-4 bg-[#111827] border-t border-white/5 flex gap-3 items-center">
      <label
        htmlFor="imageUpload"
        className="px-4 py-2 bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-600"
      >
        <IoMdImages />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="imageUpload"
      />

      <div className="relative">
        <button onClick={() => setShowEmoji(!showEmoji)}>
          {showEmoji ? "❌" : "😊"}
        </button>
        {showEmoji && (
          <div className="absolute bottom-12">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      <input
        className="flex-1 rounded-xl bg-[#0b0f1a] border border-white/10
          px-4 py-2 focus:outline-none focus:border-indigo-500"
        placeholder="اكتب رسالة..."
        value={message}
        onChange={(e) => handleTyping(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600
          text-white font-medium hover:opacity-90 transition"
      >
        <IoSend />
      </button>
    </div>
  );
}
