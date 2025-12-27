import type { ChatHeaderProps } from "../types/Chat";




export default function ChatHeader({
  selectedUser,
  onlineUsers,
  typingUserId,
  navigate,
}: ChatHeaderProps) {
  return (
    <div className="p-4 bg-[#111827] border-b border-white/5 flex items-center gap-3 sticky top-0 z-10">
      <img
        src={selectedUser.avatar}
        alt="avatar"
        className="w-16 h-16 rounded-full cursor-pointer"
        onClick={() => navigate(`/user/${selectedUser?._id}`)}
      />
      <h2 className="font-semibold text-lg">{selectedUser.fullname}</h2>
      {onlineUsers.includes(selectedUser._id) && (
        <span className="text-emerald-400 text-sm">● متصل</span>
      )}
      {typingUserId === selectedUser._id && (
        <span className="text-indigo-400 text-sm animate-pulse">يكتب...</span>
      )}
    </div>
  );
}
