
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock conversations data
const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    user: {
      id: 2,
      name: "张小明",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "好的，那就这么说定了！",
      lastTime: "10:30",
      unread: 2
    }
  },
  {
    id: 2,
    user: {
      id: 3,
      name: "李小红",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "请问你对Python熟悉吗？",
      lastTime: "昨天",
      unread: 0
    }
  }
];

// Mock messages for a conversation
const MESSAGES = [
  {
    id: 1,
    senderId: 1,
    text: "你好，看到你发布的Python教学技能很感兴趣",
    timestamp: "10:00"
  },
  {
    id: 2,
    senderId: 2,
    text: "谢谢关注！你想学习哪些具体的内容呢？",
    timestamp: "10:05"
  },
  {
    id: 3,
    senderId: 1,
    text: "主要想学习数据分析相关的内容",
    timestamp: "10:10"
  },
  {
    id: 4,
    senderId: 2,
    text: "好的，我们可以从Pandas和NumPy开始",
    timestamp: "10:15"
  }
];

const Messages = () => {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const handleSelectConversation = (conversationId: number) => {
    // Mark messages as read when conversation is selected
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, user: { ...conv.user, unread: 0 } } 
          : conv
      )
    );
    
    setSelectedConversation(conversationId);
    
    // Show toast notification for unread messages being marked as read
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation && conversation.user.unread > 0) {
      toast({
        title: "已读消息",
        description: `已将 ${conversation.user.name} 的消息标记为已读`,
        duration: 2000
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-secondary/20">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm border min-h-[600px] flex">
            {/* Conversations List */}
            <div className="w-1/3 border-r">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">消息列表</h2>
              </div>
              <div className="overflow-y-auto h-[calc(600px-4rem)]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b hover:bg-secondary/20 cursor-pointer ${
                      selectedConversation === conversation.id ? "bg-secondary/20" : ""
                    } ${conversation.user.unread > 0 ? "bg-secondary/10" : ""}`}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <span className={`font-medium ${conversation.user.unread > 0 ? "font-semibold" : ""}`}>
                            {conversation.user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">{conversation.user.lastTime}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.user.lastMessage}</p>
                      </div>
                      {conversation.user.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {conversation.user.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={conversations.find(c => c.id === selectedConversation)?.user.avatar}
                          alt="User avatar"
                        />
                        <AvatarFallback>
                          {conversations.find(c => c.id === selectedConversation)?.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {conversations.find(c => c.id === selectedConversation)?.user.name}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 1 ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            message.senderId === 1
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary"
                          } rounded-lg px-4 py-2`}
                        >
                          <p>{message.text}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="输入消息..."
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} className="px-8">
                        <Send className="h-4 w-4" />
                        <span className="ml-2">发送</span>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>选择一个对话开始聊天</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
