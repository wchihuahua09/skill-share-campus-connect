
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Heart, ThumbsUp, Calendar, User } from "lucide-react";

// Mock posts data
const COMMUNITY_POSTS = [
  {
    id: "post1",
    title: "有没有对摄影感兴趣的同学？想学习后期修图",
    content: "我是摄影爱好者，拍照技术还不错，但是对后期处理不太熟悉，特别是Lightroom和Photoshop的使用。有没有擅长修图的同学愿意交换技能？我可以教授摄影构图和相机使用技巧。",
    category: "技能求助",
    author: {
      id: "user7",
      name: "孙小芳",
      avatar: "https://i.pravatar.cc/150?img=7",
      school: "武汉大学"
    },
    stats: {
      likes: 15,
      comments: 8
    },
    time: "2023-10-15T10:30:00Z"
  },
  {
    id: "post2",
    title: "分享我的Python学习经验和资源",
    content: "作为一名计算机专业的学生，我这两年自学了Python，从零基础到能够开发一些小项目。想分享一下我的学习路径和一些有用的学习资源，希望对想学Python的同学有所帮助。\n\n学习路径：\n1. Python基础语法（推荐《Python编程：从入门到实践》）\n2. 数据结构和算法（LeetCode上的Python题目）\n3. Web开发（Django或Flask框架）\n4. 数据分析（Pandas, NumPy库）\n\n有什么问题也可以在评论区交流。",
    category: "经验分享",
    author: {
      id: "user1",
      name: "王小明",
      avatar: "https://i.pravatar.cc/150?img=1",
      school: "北京大学"
    },
    stats: {
      likes: 42,
      comments: 23
    },
    time: "2023-10-12T14:20:00Z"
  },
  {
    id: "post3",
    title: "技能交换平台使用心得",
    content: "上个月在平台上找到一位能教我日语的同学，我则教他C++编程。经过几次线上交流，我的日语水平有了明显提升，特别是口语对话部分。这种技能交换的方式真的很棒，既能学到新技能，又能结交志同道合的朋友。推荐大家都来尝试！",
    category: "交换心得",
    author: {
      id: "user5",
      name: "赵小刚",
      avatar: "https://i.pravatar.cc/150?img=5",
      school: "浙江大学"
    },
    stats: {
      likes: 28,
      comments: 12
    },
    time: "2023-10-08T19:45:00Z"
  },
  {
    id: "post4",
    title: "组织一个设计交流小组，有兴趣的同学加入",
    content: "我是一名平面设计专业的学生，想组织一个设计交流小组，每周线上讨论设计相关的话题，分享作品和经验。目前已经有3位同学加入，欢迎对UI设计、平面设计、插画等感兴趣的同学一起加入。可以在评论区留言或私信我。",
    category: "活动组织",
    author: {
      id: "user2",
      name: "李小红",
      avatar: "https://i.pravatar.cc/150?img=2",
      school: "清华大学"
    },
    stats: {
      likes: 32,
      comments: 18
    },
    time: "2023-10-05T16:10:00Z"
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary, would be replaced by auth state
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">社区交流</h1>
            <p className="text-muted-foreground">
              分享经验，提问解惑，结交志同道合的朋友
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Categories & Post Form */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">分类</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="w-8">📢</span>
                    公告通知
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="w-8">🔍</span>
                    技能求助
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="w-8">💡</span>
                    经验分享
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="w-8">🤝</span>
                    交换心得
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="w-8">🎪</span>
                    活动组织
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="w-8">💬</span>
                    闲聊灌水
                  </Button>
                </CardContent>
              </Card>
              
              {/* Popular Tags */}
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">热门标签</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">设计</Badge>
                    <Badge variant="secondary">英语</Badge>
                    <Badge variant="secondary">编程</Badge>
                    <Badge variant="secondary">摄影</Badge>
                    <Badge variant="secondary">音乐</Badge>
                    <Badge variant="secondary">学习方法</Badge>
                    <Badge variant="secondary">考研</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Posts */}
            <div className="lg:col-span-3">
              {/* New Post Form */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Your Avatar" />
                          <AvatarFallback>YA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea 
                            placeholder="分享你的经验、问题或想法..." 
                            className="resize-none mb-2"
                            rows={3}
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              <select className="bg-secondary text-foreground rounded-md px-3 py-1 text-sm">
                                <option>选择分类</option>
                                <option>技能求助</option>
                                <option>经验分享</option>
                                <option>交换心得</option>
                                <option>活动组织</option>
                                <option>闲聊灌水</option>
                              </select>
                            </div>
                            <Button>发布</Button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-3">登录后发布内容与社区交流</p>
                      <Button asChild>
                        <Link to="/auth?tab=login">
                          登录 / 注册
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Post Filters */}
              <div className="mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">全部帖子</TabsTrigger>
                    <TabsTrigger value="hot">热门</TabsTrigger>
                    <TabsTrigger value="latest">最新</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Posts */}
              <div className="space-y-6">
                {COMMUNITY_POSTS.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{post.author.name}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <User className="h-3 w-3 mr-1" />
                              <span>{post.author.school}</span>
                              <span className="mx-1">·</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{new Date(post.time).toLocaleDateString('zh-CN')}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/community/post/${post.id}`} className="block">
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground whitespace-pre-line line-clamp-3">
                          {post.content}
                        </p>
                      </Link>
                    </CardContent>
                    <CardFooter className="border-t border-border pt-3 flex justify-between">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{post.stats.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{post.stats.comments}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>收藏</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
