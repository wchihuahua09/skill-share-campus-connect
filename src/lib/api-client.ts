
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
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return response.json();
  },

  login: async (params: LoginParams): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return response.json();
  },

  getUserInfo: async (userId: string): Promise<AuthResponse> => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: userId }),
    });
    return response.json();
  },
};
