import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  saveAccessToken: (token: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  saveAccessToken: (token: string) => {
    set({ accessToken: token });
    localStorage.setItem('accessToken', token);
  },
  clearAuth: () => {
    set({ accessToken: null });
    localStorage.removeItem('accessToken');
  },
}));

export const getAccessTokenFromState = (): string | null => {
  return useAuthStore.getState().accessToken;
};

export const saveAccessTokenToState = (token: string) => {
  useAuthStore.getState().saveAccessToken(token);
};

export const clearAuthState = () => {
  useAuthStore.getState().clearAuth();
};

export default useAuthStore;
