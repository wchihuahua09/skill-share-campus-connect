
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MessageSquare, Star, ThumbsUp } from "lucide-react";

// Using the same mock data structure as in Profile
const MOCK_EXCHANGES = [
  {
    id: "ex1",
    status: "pending",
    requestDate: "2023-10-18T00:00:00Z",
    otherUser: {
      id: "user3",
      name: "张小华",
      avatar: "https://i.pravatar.cc/150?img=3",
      school: "复旦大学"
    },
    requestedSkill: {
      id: "1",
      title: "Python编程基础教学"
    },
    offeredSkill: {
      id: "3",
      title: "英语口语与写作"
    },
    message: "我想学习Python编程，可以用我的英语口语教学来交换。我有英语专业八级证书，可以帮助提高口语和写作能力。希望每周能安排2次线上交流。"
  },
  {
    id: "ex2",
    status: "accepted",
    requestDate: "2023-10-10T00:00:00Z",
    otherUser: {
      id: "user5",
      name: "赵小刚",
      avatar: "https://i.pravatar.cc/150?img=5",
      school: "浙江大学"
    },
    requestedSkill: {
      id: "1",
      title: "Python编程基础教学"
    },
    offeredSkill: {
      id: "5",
      title: "高等数学辅导"
    },
    message: "我是数学专业的研究生，想学习Python来做一些数据分析工作。我可以提供高等数学辅导作为交换。"
  },
  {
    id: "ex3",
    status: "completed",
    requestDate: "2023-09-25T00:00:00Z",
    completedDate: "2023-10-15T00:00:00Z",
    otherUser: {
      id: "user8",
      name: "周小莉",
      avatar: "https://i.pravatar.cc/150?img=8",
      school: "中国人民大学"
    },
    requestedSkill: {
      id: "14",
      title: "摄影入门与构图技巧"
    },
    offeredSkill: {
      id: "8",
      title: "创意写作指导"
    },
    message: "我对摄影很感兴趣，希望能学习一些基础技巧。作为交换，我可以提供创意写作的指导。",
    review: {
      rating: 5,
      content: "王同学的摄影教学非常专业，讲解清晰，实践指导也很到位。经过几次交流，我的摄影水平有了明显提升。非常感谢！"
    }
  }
];

const Exchanges = () => {
  const [exchanges] = useState(MOCK_EXCHANGES);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">交换申请</h1>
          
          <div className="space-y-6">
            {/* Pending Exchanges */}
            {exchanges.filter(ex => ex.status === "pending").length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">待处理的申请</h2>
                <div className="space-y-4">
                  {exchanges
                    .filter(ex => ex.status === "pending")
                    .map((exchange) => (
                      <div key={exchange.id} className="bg-white border border-border rounded-lg p-5">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={exchange.otherUser.avatar} alt={exchange.otherUser.name} />
                              <AvatarFallback>{exchange.otherUser.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{exchange.otherUser.name}</p>
                              <p className="text-sm text-muted-foreground">{exchange.otherUser.school}</p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-500">等待处理</Badge>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 p-3 bg-secondary/30 rounded-lg">
                          <div className="mb-2 sm:mb-0">
                            <p className="text-sm text-muted-foreground">申请技能</p>
                            <p className="font-medium">{exchange.requestedSkill.title}</p>
                          </div>
                          <div className="hidden sm:block text-muted-foreground">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">提供技能</p>
                            <p className="font-medium">{exchange.offeredSkill.title}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-medium">申请留言：</p>
                          <p className="text-muted-foreground mt-1">{exchange.message}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{new Date(exchange.requestDate).toLocaleDateString('zh-CN')}</span>
                          </div>
                          <div>
                            <Button variant="destructive" size="sm" className="mr-2">
                              拒绝
                            </Button>
                            <Button size="sm">
                              接受
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {/* Accepted Exchanges */}
            {exchanges.filter(ex => ex.status === "accepted").length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">进行中的交换</h2>
                <div className="space-y-4">
                  {exchanges
                    .filter(ex => ex.status === "accepted")
                    .map((exchange) => (
                      <div key={exchange.id} className="bg-white border border-border rounded-lg p-5">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={exchange.otherUser.avatar} alt={exchange.otherUser.name} />
                              <AvatarFallback>{exchange.otherUser.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{exchange.otherUser.name}</p>
                              <p className="text-sm text-muted-foreground">{exchange.otherUser.school}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-500">进行中</Badge>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 p-3 bg-secondary/30 rounded-lg">
                          <div className="mb-2 sm:mb-0">
                            <p className="text-sm text-muted-foreground">申请技能</p>
                            <p className="font-medium">{exchange.requestedSkill.title}</p>
                          </div>
                          <div className="hidden sm:block text-muted-foreground">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">提供技能</p>
                            <p className="font-medium">{exchange.offeredSkill.title}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>接受于 {new Date(exchange.requestDate).toLocaleDateString('zh-CN')}</span>
                          </div>
                          <div>
                            <Button size="sm">
                              联系对方
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {/* Completed Exchanges */}
            {exchanges.filter(ex => ex.status === "completed").length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">已完成的交换</h2>
                <div className="space-y-4">
                  {exchanges
                    .filter(ex => ex.status === "completed")
                    .map((exchange) => (
                      <div key={exchange.id} className="bg-white border border-border rounded-lg p-5">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={exchange.otherUser.avatar} alt={exchange.otherUser.name} />
                              <AvatarFallback>{exchange.otherUser.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{exchange.otherUser.name}</p>
                              <p className="text-sm text-muted-foreground">{exchange.otherUser.school}</p>
                            </div>
                          </div>
                          <Badge className="bg-blue-500">已完成</Badge>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 p-3 bg-secondary/30 rounded-lg">
                          <div className="mb-2 sm:mb-0">
                            <p className="text-sm text-muted-foreground">申请技能</p>
                            <p className="font-medium">{exchange.requestedSkill.title}</p>
                          </div>
                          <div className="hidden sm:block text-muted-foreground">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">提供技能</p>
                            <p className="font-medium">{exchange.offeredSkill.title}</p>
                          </div>
                        </div>
                        
                        {exchange.review && (
                          <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm font-medium">收到的评价：</p>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < exchange.review!.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">{exchange.review.content}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>完成于 {new Date(exchange.completedDate!).toLocaleDateString('zh-CN')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {exchanges.length === 0 && (
              <div className="bg-white border border-border rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">暂无交换申请</h3>
                <p className="text-muted-foreground mb-4">
                  浏览技能列表，寻找感兴趣的技能进行交换
                </p>
                <Button asChild>
                  <Link to="/skills">浏览技能</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Exchanges;

