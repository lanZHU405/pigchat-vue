import { createStore } from 'vuex';
import { User } from '@/types/AllType'; // 假设您有一个定义 User 类型的 types.ts 文件

export interface State {
  user: User | null;
  isCollapse: boolean;
  token: string | null;
}

const store = createStore<State>({
  state: {
    user: JSON.parse(localStorage.getItem("user") || '{}') as User | null,
    isCollapse: false,
    token: localStorage.getItem("token") || null,
  },
  mutations: {
    updateIsCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    saveUser(state, user: User) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user)); // 同步更新 localStorage
    },
    setAuthToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuthToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  getters: {
    getUser(state): User | null {
      return state.user;
    },
    isAuthenticated: (state) => !!state.token,

  },
  actions: {
    login({ commit }, token) {
      commit('setAuthToken', token);
    },
    logout({ commit }) {
      commit('clearAuthToken');
    }
  }
});

export default store;