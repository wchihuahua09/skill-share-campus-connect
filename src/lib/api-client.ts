
const API_BASE_URL = 'http://localhost:8080/api/v1';

interface RegisterParams {
  username: string;
  email: string;
  password: string;
  school: string;
  major: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface UserInfo {
  user_id: number;
  username: string;
  email: string;
  school: string;
  major?: string;
  avatar_url?: string;
  created_at?: string;
}

interface AuthResponse {
  code: number;
  message: string;
  data: {
    token?: string;
    expires_in?: number;
    user_info?: UserInfo;
  } & Partial<UserInfo>;
}

export const authApi = {
  register: async (params: RegisterParams): Promise<AuthResponse> => {
    // Mock implementation that simulates a successful registration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 201,
          message: "注册成功",
          data: {
            user_id: Math.floor(Math.random() * 1000),
            username: params.username,
            email: params.email,
            school: params.school,
            created_at: new Date().toISOString()
          }
        });
      }, 1000);
    });
  },

  login: async (params: LoginParams): Promise<AuthResponse> => {
    // Mock implementation that simulates a successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          message: "登录成功",
          data: {
            token: "mock_jwt_token_" + Math.random().toString(36).substr(2, 9),
            expires_in: 3600,
            user_info: {
              user_id: 123,
              username: "测试用户",
              email: params.email,
              avatar_url: "https://example.com/avatar.jpg",
              school: "北京大学"
            }
          }
        });
      }, 1000);
    });
  },

  getUserInfo: async (userId: string): Promise<AuthResponse> => {
    // Mock implementation that returns user details
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          message: "success",
          data: {
            user_id: Number(userId),
            username: "测试用户",
            email: "test@example.com",
            school: "北京大学",
            major: "计算机科学",
            avatar_url: "https://example.com/avatar.jpg",
            created_at: new Date().toISOString()
          }
        });
      }, 1000);
    });
  },
};

