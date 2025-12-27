import { create } from "zustand";
import { getSocket } from "../socket/socket";
import {
  getChatMessages,
  seen,
  deleteMessage,
  createMessage,
} from "../api/message/request";
import type { ChatStore, Message } from "../types/Message";

const token = localStorage.getItem("token") as string;

export const useChatStore = create<ChatStore>((set) => ({
  selectedUser: null,
  messages: [],
  onlineUsers: [],
  typingUserId: null,

  /* ---------- Select User ---------- */
  selectUser: (user) => {
    set({
      selectedUser: user,
      messages: [],
      typingUserId: null,
    });
  },

  /* ---------- Fetch Messages ---------- */
  fetchMessages: async (receiverId) => {
    const data = await getChatMessages(receiverId, token);
    if (!data?.error) {
      set({ messages: data });
    }
  },

  /* ---------- Send Message ---------- */
  sendMessage: async (receiverId, content, image) => {
    const data = await createMessage(receiverId, image, content, token);
    if (!data?.error) {
      set((state) => ({
        messages: [...state.messages, data.message],
      }));

      const socket = getSocket();
      socket.emit("send-message", {
        message: data.message,
        receiverId,
      });
    }
  },

  /* ---------- Seen ---------- */
  markAsSeen: async (senderId) => {
    const data = await seen(senderId, token);
    if (!data?.error) {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.senderId === senderId ? { ...msg, seen: true } : msg
        ),
      }));

      getSocket().emit("message-seen", { senderId });
    }
  },

  /* ---------- Delete ---------- */
  deleteMessage: async (messageId) => {
    const data = await deleteMessage(messageId, token);
    if (!data?.error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
    }
  },

  /* ---------- Online ---------- */
    emitOnline: (userId) => {
    const socket = getSocket();
    socket.emit("user-online", userId);
  },

  /* ---------- Typing ---------- */
  emitTyping: (senderId, receiverId, isTyping) => {
    getSocket().emit("typing", { senderId, receiverId, isTyping });
  },

  /* ---------- Socket listeners ---------- */
  initSocket: () => {
    const socket = getSocket();

    socket.on("online-users", (users: string[]) => {
      set({ onlineUsers: users });
    });

    socket.on("typing", ({ senderId, isTyping }) => {
      set({ typingUserId: isTyping ? senderId : null });
    });

    socket.on("receive-message", (message: Message) => {
      if (!message) return;
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    socket.on("message-seen", ({ senderId }) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.senderId === senderId ? { ...msg, seen: true } : msg
        ),
      }));
    });
  },
}));
