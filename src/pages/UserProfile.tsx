import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { School, Calendar, MessageSquare } from "lucide-react";
import { SkillCard } from "@/components/skills/SkillCard";

// Mock user data
const USER_DATA = {
  id: "user7",
  name: "孙小芳",
  avatar: "https://i.pravatar.cc/150?img=7",
  school: "武汉大学",
  major: "摄影艺术",
  year: "大三",
  bio: "热爱摄影，擅长人像和风光拍摄。希望能通过平台学习后期处理技能，同时也愿意教授摄影技巧。",
  stats: {
    skillCount: 2,
    exchangeCount: 5,
    rating: 4.7
  },
  joinedDate: "2023-05-15T00:00:00Z",
  skills: [
    {
      id: "1",
      title: "摄影构图技巧教学",
      description: "可以教授摄影构图的基本原则和技巧，包括三分法、引导线、框架等手法的运用。",
      category: "摄影摄像",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      user: {
        id: "user7",
        name: "孙小芳",
        avatar: "https://i.pravatar.cc/150?img=7",
        school: "武汉大学"
      },
      rating: 4.8,
      exchangeCount: 3,
      createdAt: "2023-09-15T00:00:00Z"
    }
  ],
  posts: [
    {
      id: "post1",
      title: "有没有对摄影感兴趣的同学？想学习后期修图",
      content: "我是摄影爱好者，拍照技术还不错，但是对后期处理不太熟悉...",
      category: "技能求助",
      time: "2023-10-15T10:30:00Z",
      stats: {
        likes: 15,
        comments: 8
      }
    }
  ]
};

const UserProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-28 w-28">
                    <AvatarImage src={USER_DATA.avatar} alt={USER_DATA.name} />
                    <AvatarFallback>{USER_DATA.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="mt-4">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    发送消息
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold">{USER_DATA.name}</h1>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <div className="flex items-center text-muted-foreground">
                          <School className="h-4 w-4 mr-1" />
                          <span>{USER_DATA.school}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>加入于 {new Date(USER_DATA.joinedDate).toLocaleDateString('zh-CN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-muted-foreground">{USER_DATA.bio}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-xl font-semibold text-primary">
                        {USER_DATA.stats.skillCount}
                      </div>
                      <div className="text-sm text-muted-foreground">技能</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-xl font-semibold text-primary">
                        {USER_DATA.stats.exchangeCount}
                      </div>
                      <div className="text-sm text-muted-foreground">交换</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-xl font-semibold text-primary">
                        {USER_DATA.stats.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">评分</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="skills">发布的技能 ({USER_DATA.skills.length})</TabsTrigger>
              <TabsTrigger value="posts">发布的帖子 ({USER_DATA.posts.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {USER_DATA.skills.map((skill) => (
                  <SkillCard key={skill.id} {...skill} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="posts">
              <div className="space-y-4">
                {USER_DATA.posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-muted-foreground">
                          {new Date(post.time).toLocaleDateString('zh-CN')}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{post.stats.likes} 赞</span>
                          <span>{post.stats.comments} 评论</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
