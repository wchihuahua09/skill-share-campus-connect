
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import { Heart, MessageSquare, Calendar, User, Share } from "lucide-react";

// Mock data for post detail
const POST_DETAIL = {
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
  time: "2023-10-15T10:30:00Z",
  comments: [
    {
      id: "comment1",
      user: {
        id: "user2",
        name: "李小红",
        avatar: "https://i.pravatar.cc/150?img=2",
        school: "清华大学"
      },
      content: "我对PS和LR都比较熟悉，可以教你后期处理，正好我也想学习摄影构图，期待交流！",
      time: "2023-10-15T11:30:00Z"
    }
  ]
};

const PostDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={POST_DETAIL.author.avatar} alt={POST_DETAIL.author.name} />
                    <AvatarFallback>{POST_DETAIL.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{POST_DETAIL.author.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      <span>{POST_DETAIL.author.school}</span>
                      <span className="mx-1">·</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{new Date(POST_DETAIL.time).toLocaleDateString('zh-CN')}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{POST_DETAIL.category}</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <h1 className="text-2xl font-bold mb-4">{POST_DETAIL.title}</h1>
              <p className="text-muted-foreground whitespace-pre-line">{POST_DETAIL.content}</p>
            </CardContent>
            
            <CardFooter className="border-t border-border pt-3 flex justify-between">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{POST_DETAIL.stats.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{POST_DETAIL.stats.comments}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
                <Share className="h-4 w-4 mr-1" />
                <span>分享</span>
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">评论 ({POST_DETAIL.comments.length})</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Your Avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="写下你的评论..." 
                        className="resize-none mb-2"
                        rows={3}
                      />
                      <Button>发表评论</Button>
                    </div>
                  </div>
                  
                  {POST_DETAIL.comments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-4 pt-4 border-t border-border">
                      <Avatar>
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{comment.user.name}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <User className="h-3 w-3 mr-1" />
                              <span>{comment.user.school}</span>
                              <span className="mx-1">·</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{new Date(comment.time).toLocaleDateString('zh-CN')}</span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostDetail;
