import { useState, useRef, useEffect } from "react";
import { MessageCircle, XCircle, Send } from "lucide-react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Chào bạn 👋\nMình có thể hỗ trợ gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const popupRef = useRef(null);
  const bottomRef = useRef(null);

  const quickQuestions = [
    "Laptop gaming tầm 15–20 triệu",
    "Máy bền pin lâu cho sinh viên",
    "Laptop chạy đồ hoạ tốt",
    "Cần xem máy trả góp",
  ];

  // Auto scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Click bên ngoài để đóng popup
  useEffect(() => {
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    // GIẢ LẬP BOT TRẢ LỜI — SAU NÀY BẠN GẮN SOCKET REALTIME
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Cảm ơn bạn! Tin nhắn của bạn đã được nhận. Mình sẽ hỗ trợ ngay ❤️",
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {open && (
          <div
            ref={popupRef}
            className="w-80 bg-white shadow-2xl rounded-xl border border-gray-200 animate-fadeIn overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-blue-600 text-white flex justify-between items-center">
              <span className="font-semibold">Hỗ trợ khách hàng</span>
              <button onClick={() => setOpen(false)}>
                <XCircle size={20} />
              </button>
            </div>

            {/* Chat body */}
            <div className="p-3 h-72 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white text-gray-800 shadow"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>

            {/* Quick Replies */}
            <div className="px-3 py-2 border-t bg-white flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700 hover:bg-gray-200"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập tin nhắn..."
              />
              <button
                onClick={() => sendMessage(input)}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Icon */}
        <button
          onClick={() => setOpen(!open)}
          className={`bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition-all ${
            open ? "" : "animate-bounceSlow"
          }`}
        >
          <MessageCircle size={30} />
        </button>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounceSlow {
          animation: bounceSlow 2s infinite ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
