import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock, School, BookOpen } from "lucide-react";
const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "login");

  // If tab query param changes, update activeTab
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && (tab === "login" || tab === "register")) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white border border-border rounded-lg p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">登录</TabsTrigger>
                  <TabsTrigger value="register">注册</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={e => {
                  e.preventDefault();
                  // In a real app, this would handle login logic
                  alert("登录功能将在后续实现");
                }}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">邮箱</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="email" type="email" placeholder="输入您的邮箱" className="pl-10" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="password">密码</Label>
                          <Link to="/auth/reset-password" className="text-sm text-primary hover:underline">
                            忘记密码？
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="password" type="password" placeholder="输入您的密码" className="pl-10" required />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        登录
                      </Button>
                    </div>
                  </form>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      
                      
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={e => {
                  e.preventDefault();
                  // In a real app, this would handle registration logic
                  alert("注册功能将在后续实现");
                }}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-name">用户名</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="reg-name" type="text" placeholder="输入您的姓名" className="pl-10" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">邮箱</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="reg-email" type="email" placeholder="输入您的邮箱" className="pl-10" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="reg-password" type="password" placeholder="设置您的密码" className="pl-10" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-school">学校</Label>
                        <div className="relative">
                          <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="reg-school" type="text" placeholder="输入您的学校" className="pl-10" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-major">专业</Label>
                        <div className="relative">
                          <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="reg-major" type="text" placeholder="输入您的专业" className="pl-10" required />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        注册
                      </Button>
                    </div>
                  </form>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">
                          或使用第三方账号注册
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      
                      
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {activeTab === "login" ? <p>
                    还没有账号？{" "}
                    <Link to="/auth?tab=register" className="text-primary hover:underline">
                      立即注册
                    </Link>
                  </p> : <p>
                    已有账号？{" "}
                    <Link to="/auth?tab=login" className="text-primary hover:underline">
                      登录
                    </Link>
                  </p>}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Auth;