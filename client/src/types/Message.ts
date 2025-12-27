import type { IUser } from "./User";

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content?: string;
  image?: string;
  seen: boolean;
  createdAt: string;
}

export interface ChatStore {
  /* -------- State -------- */
  selectedUser: IUser | null;
  messages: Message[];

  onlineUsers: string[];
  typingUserId: string | null;

  /* -------- Actions -------- */
  selectUser: (user: IUser) => void;

  fetchMessages: (
    receiverId: string,
    token: string
  ) => Promise<void>;

  sendMessage: (
    receiverId: string,
    content: string,
    image: File | null,
    token: string
  ) => Promise<void>;

  markAsSeen: (
    senderId: string,
    token: string
  ) => Promise<void>;



  deleteMessage: (
    messageId: string,
    token: string
  ) => Promise<void>;

  emitOnline: (userId: string) => void;

  emitTyping: (
    senderId: string,
    receiverId: string,
    isTyping: boolean
  ) => void;

  initSocket: () => void;
}