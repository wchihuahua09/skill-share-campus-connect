
import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock, School, BookOpen } from "lucide-react";
import { authApi } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "login");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    school: "",
    major: "",
  });

  // If tab query param changes, update activeTab
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && (tab === "login" || tab === "register")) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.login(loginForm);
      if (response.code === 200 && response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_info', JSON.stringify(response.data.user_info));
        toast({
          title: "登录成功",
          description: "欢迎回来！",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "登录失败",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "登录失败",
        description: "请检查网络连接后重试",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.register(registerForm);
      if (response.code === 201) {
        toast({
          title: "注册成功",
          description: "请登录以继续",
        });
        setActiveTab("login");
      } else {
        toast({
          variant: "destructive",
          title: "注册失败",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "注册失败",
        description: "请检查网络连接后重试",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">邮箱</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="输入您的邮箱" 
                            className="pl-10" 
                            value={loginForm.email}
                            onChange={e => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                            required 
                          />
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
                          <Input 
                            id="password" 
                            type="password" 
                            placeholder="输入您的密码" 
                            className="pl-10" 
                            value={loginForm.password}
                            onChange={e => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                            required 
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        登录
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-name">用户名</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="reg-name" 
                            type="text" 
                            placeholder="输入您的姓名" 
                            className="pl-10" 
                            value={registerForm.username}
                            onChange={e => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">邮箱</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="reg-email" 
                            type="email" 
                            placeholder="输入您的邮箱" 
                            className="pl-10" 
                            value={registerForm.email}
                            onChange={e => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="reg-password" 
                            type="password" 
                            placeholder="设置您的密码" 
                            className="pl-10" 
                            value={registerForm.password}
                            onChange={e => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-school">学校</Label>
                        <div className="relative">
                          <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="reg-school" 
                            type="text" 
                            placeholder="输入您的学校" 
                            className="pl-10" 
                            value={registerForm.school}
                            onChange={e => setRegisterForm(prev => ({ ...prev, school: e.target.value }))}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-major">专业</Label>
                        <div className="relative">
                          <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="reg-major" 
                            type="text" 
                            placeholder="输入您的专业" 
                            className="pl-10" 
                            value={registerForm.major}
                            onChange={e => setRegisterForm(prev => ({ ...prev, major: e.target.value }))}
                            required 
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        注册
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {activeTab === "login" ? (
                  <p>
                    还没有账号？{" "}
                    <Link to="/auth?tab=register" className="text-primary hover:underline">
                      立即注册
                    </Link>
                  </p>
                ) : (
                  <p>
                    已有账号？{" "}
                    <Link to="/auth?tab=login" className="text-primary hover:underline">
                      登录
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
