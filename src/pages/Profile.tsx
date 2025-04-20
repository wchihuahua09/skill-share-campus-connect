import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SkillCard, SkillCardProps } from "@/components/skills/SkillCard";
import { 
  Calendar, 
  Edit, 
  MessageSquare, 
  School, 
  Star, 
  User,
  BookOpen,
  BookMarked,
  Clock,
  ThumbsUp
} from "lucide-react";

const USER_DATA = {
  id: "user1",
  name: "王小明",
  avatar: "https://i.pravatar.cc/150?img=1",
  school: "北京大学",
  major: "计算机科学",
  year: "大三",
  bio: "热爱编程和分享知识，希望通过技能交换结交志同道合的朋友。专注于Python和Web开发，同时对设计和摄影也很感兴趣。欢迎和我交流各类技能！",
  stats: {
    skillCount: 3,
    exchangeCount: 15,
    rating: 4.8,
    reviewCount: 25,
    favoriteCount: 8
  },
  joinedDate: "2023-05-15T00:00:00Z",
  skills: [
    {
      id: "1",
      title: "Python编程基础教学",
      description: "可以教授Python编程基础知识，包括语法、数据结构、函数和简单的项目实践。",
      category: "编程开发",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      user: {
        id: "user1",
        name: "王小明",
        avatar: "https://i.pravatar.cc/150?img=1",
        school: "北京大学"
      },
      rating: 4.8,
      exchangeCount: 15,
      createdAt: "2023-09-15T00:00:00Z"
    },
    {
      id: "13",
      title: "Web前端开发入门",
      description: "教授HTML、CSS和JavaScript基础，以及React框架入门，帮助你构建现代化的网页应用。",
      category: "编程开发",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      user: {
        id: "user1",
        name: "王小明",
        avatar: "https://i.pravatar.cc/150?img=1",
        school: "北京大学"
      },
      rating: 4.6,
      exchangeCount: 9,
      createdAt: "2023-10-05T00:00:00Z"
    },
    {
      id: "14",
      title: "摄影入门与构图技巧",
      description: "分享基础摄影知识，包括相机使用、光线控制和构图技巧，让你的照片更专业。",
      category: "摄影摄像",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      user: {
        id: "user1",
        name: "王小明",
        avatar: "https://i.pravatar.cc/150?img=1",
        school: "北京大学"
      },
      rating: 4.5,
      exchangeCount: 7,
      createdAt: "2023-09-20T00:00:00Z"
    }
  ],
  favorites: [
    {
      id: "2",
      title: "平面设计与PS技巧",
      description: "擅长使用Photoshop和Illustrator进行平面设计，可以教授海报、logo设计的基本技巧。",
      category: "设计创意",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      user: {
        id: "user2",
        name: "李小红",
        avatar: "https://i.pravatar.cc/150?img=2",
        school: "清华大学"
      },
      rating: 4.5,
      exchangeCount: 8,
      createdAt: "2023-10-01T00:00:00Z"
    },
    {
      id: "4",
      title: "吉他入门教学",
      description: "从零基础开始教授吉他弹唱，包括基本和弦、指法训练和简单歌曲演奏。",
      category: "音乐艺术",
      user: {
        id: "user4",
        name: "陈小强",
        avatar: "https://i.pravatar.cc/150?img=4",
        school: "上海交通大学"
      },
      rating: 4.7,
      exchangeCount: 12,
      createdAt: "2023-10-10T00:00:00Z"
    }
  ],
  exchanges: [
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
  ]
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const user = USER_DATA;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white border border-border rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-28 w-28">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="mt-4 md:hidden">
                  <Edit className="mr-2 h-4 w-4" />
                  编辑资料
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <div className="flex items-center text-muted-foreground">
                        <School className="h-4 w-4 mr-1" />
                        <span>{user.school}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{user.major}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <User className="h-4 w-4 mr-1" />
                        <span>{user.year}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>加入于 {new Date(user.joinedDate).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="hidden md:flex">
                    <Edit className="mr-2 h-4 w-4" />
                    编辑资料
                  </Button>
                </div>
                
                <p className="mt-4 text-muted-foreground">{user.bio}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center justify-center text-xl font-semibold text-primary">
                      {user.stats.skillCount}
                    </div>
                    <div className="text-sm text-muted-foreground">技能</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center justify-center text-xl font-semibold text-primary">
                      {user.stats.exchangeCount}
                    </div>
                    <div className="text-sm text-muted-foreground">交换</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center justify-center text-xl font-semibold text-primary">
                      {user.stats.rating}
                      <Star className="h-4 w-4 ml-1 fill-yellow-500 text-yellow-500" />
                    </div>
                    <div className="text-sm text-muted-foreground">评分</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center justify-center text-xl font-semibold text-primary">
                      {user.stats.reviewCount}
                    </div>
                    <div className="text-sm text-muted-foreground">评价</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center justify-center text-xl font-semibold text-primary">
                      {user.stats.favoriteCount}
                    </div>
                    <div className="text-sm text-muted-foreground">收藏</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="skills">我的技能 ({user.skills.length})</TabsTrigger>
              <TabsTrigger value="favorites">收藏技能 ({user.favorites.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">我发布的技能</h2>
                <Button asChild>
                  <Link to="/skills/new">发布新技能</Link>
                </Button>
              </div>
              
              {user.skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.skills.map((skill) => (
                    <SkillCard key={skill.id} {...skill} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-border rounded-lg p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">你还没有发布任何技能</h3>
                  <p className="text-muted-foreground mb-4">
                    分享你的技能，与其他同学交流学习
                  </p>
                  <Button asChild>
                    <Link to="/skills/new">发布第一个技能</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="favorites">
              <h2 className="text-xl font-semibold mb-6">我收藏的技能</h2>
              
              {user.favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.favorites.map((skill) => (
                    <SkillCard key={skill.id} {...skill} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-border rounded-lg p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">你还没有收藏任何技能</h3>
                  <p className="text-muted-foreground mb-4">
                    浏览技能列表，收藏感兴趣的技能
                  </p>
                  <Button asChild>
                    <Link to="/skills">浏览技能</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
