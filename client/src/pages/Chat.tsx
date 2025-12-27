import { useEffect, useState } from "react";
import { useChatStore } from "../stores/useChatStore";
import { useUserStore } from "../stores/useUserStore";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/user/request";

export default function Chat() {
  const {
    selectedUser,
    messages,
    onlineUsers,
    typingUserId,
    selectUser,
    fetchMessages,
    sendMessage,
    emitOnline,
    emitTyping,
    markAsSeen,
    deleteMessage,
    initSocket,
  } = useChatStore();

  const { user, logout } = useUserStore();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    initSocket();
    if (user) emitOnline(user._id);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      const res = await getAllUsers(token); 
      if (!res?.error) setUsers(res.filter((u: any) => u._id !== user?._id)); 
    };
    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id, token);
      markAsSeen(selectedUser._id, token);
      if (window.innerWidth < 768) setShowSidebar(false);
    }
  }, [selectedUser]);

  const handleSend = async () => {
    if ((!message.trim() && !image) || !selectedUser) return;
    await sendMessage(selectedUser._id, message, image, token);
    setMessage("");
    setImage(null);
    emitTyping(user!._id, selectedUser._id, false);
  };

  const handleTyping = (value: string) => {
    setMessage(value);
    if (!selectedUser) return;
    emitTyping(user!._id, selectedUser._id, value.length > 0);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleBack = () => setShowSidebar(true);

  return (
    <div className="flex h-screen bg-[#0b0f1a] text-gray-200">
      {showSidebar && (
        <Sidebar
          users={users}
          search={search}
          setSearch={setSearch}
          selectedUser={selectedUser}
          onlineUsers={onlineUsers}
          selectUser={selectUser}
          user={user!}
          logout={logout}
        />
      )}

      <main className="flex-1 flex flex-col relative">
        {selectedUser && window.innerWidth < 768 && !showSidebar && (
          <button
            className="absolute top-4 left-4 z-30 text-white p-6 rounded-full bg-gray-700 hover:bg-gray-600"
            onClick={handleBack}
          >
            <MdArrowBack />
          </button>
        )}

        {!selectedUser ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            اختر محادثة
          </div>
        ) : (
          <>
            <ChatHeader
              selectedUser={selectedUser}
              onlineUsers={onlineUsers}
              typingUserId={typingUserId}
              navigate={navigate}
            />
            <MessageList
              messages={messages}
              user={user!}
              deleteMessage={deleteMessage}
              token={token}
            />
            <ChatInput
              message={message}
              setMessage={setMessage}
              handleSend={handleSend}
              handleTyping={handleTyping}
              handleImageChange={handleImageChange}
              showEmoji={showEmoji}
              setShowEmoji={setShowEmoji}
            />
          </>
        )}
      </main>
    </div>
  );
}
