const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const status = response.status;
    
    try {
      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.message || 'Request failed', status };
      }
      
      return { data, status };
    } catch (error) {
      return { error: 'Invalid response format', status };
    }
  }

  async register(userData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
  }): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    return this.handleResponse(response);
  }

  async verifyEmail(email: string, code: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/verify_email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    return this.handleResponse(response);
  }

  async login(email: string, password: string): Promise<ApiResponse<{
    access: string;
    refresh: string;
  }>> {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    return this.handleResponse(response);
  }

  async logout(): Promise<ApiResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    const response = await fetch(`${API_BASE_URL}/logout/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ refresh: refreshToken }),
    });

    return this.handleResponse(response);
  }

  async getProfile(): Promise<ApiResponse<{
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
  }>> {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async refreshToken(): Promise<ApiResponse<{ access: string }>> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    return this.handleResponse(response);
  }

  async submitContactForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/Contact_us/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
