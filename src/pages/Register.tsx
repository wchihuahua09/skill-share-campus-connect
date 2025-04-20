
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, School, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { authApi } from "@/lib/api-client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    school: "",
    major: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.register(form);
      if (response.code === 201) {
        // After successful registration, attempt to log in automatically
        const loginResponse = await authApi.login({
          email: form.email,
          password: form.password,
        });
        
        if (loginResponse.code === 200 && loginResponse.data.token) {
          localStorage.setItem('auth_token', loginResponse.data.token);
          localStorage.setItem('user_info', JSON.stringify(loginResponse.data.user_info));
          toast({
            title: "注册成功",
            description: "欢迎加入！",
          });
          navigate('/');
        }
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
              <h2 className="text-2xl font-semibold text-center mb-6">注册账号</h2>
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="username" 
                        type="text" 
                        placeholder="输入您的姓名" 
                        className="pl-10" 
                        value={form.username}
                        onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="输入您的邮箱" 
                        className="pl-10" 
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="设置您的密码" 
                        className="pl-10" 
                        value={form.password}
                        onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="school">学校</Label>
                    <div className="relative">
                      <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="school" 
                        type="text" 
                        placeholder="输入您的学校" 
                        className="pl-10" 
                        value={form.school}
                        onChange={e => setForm(prev => ({ ...prev, school: e.target.value }))}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="major">专业</Label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="major" 
                        type="text" 
                        placeholder="输入您的专业" 
                        className="pl-10" 
                        value={form.major}
                        onChange={e => setForm(prev => ({ ...prev, major: e.target.value }))}
                        required 
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    注册
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
