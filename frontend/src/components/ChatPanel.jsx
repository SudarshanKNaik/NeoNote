import { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { X, Send } from 'lucide-react';

const ChatPanel = () => {
  const { messages, isOpen, toggleChat, closeChat, sendMessage, chatEndRef } = useChat();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gold text-navy rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        <i className="fas fa-comment text-2xl"></i>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 h-[600px] bg-white dark:bg-navy shadow-2xl rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex flex-col z-50 border-t md:border-l border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-navy text-white rounded-t-2xl">
        <h3 className="font-semibold text-lg text-gold">NeoNote Assistant</h3>
        <button
          onClick={closeChat}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-gold text-navy rounded-br-sm'
                  : 'bg-white dark:bg-navy-light text-gray-900 dark:text-white rounded-bl-sm shadow-md'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-white dark:bg-navy-light text-gray-900 dark:text-white"
          />
          <button
            onClick={handleSend}
            className="bg-gold text-navy px-4 py-2 rounded-lg hover:bg-gold-dark transition-colors"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;

