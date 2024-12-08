import { createStore } from 'vuex';
import { User } from '@/types/UserType'; // 假设您有一个定义 User 类型的 types.ts 文件

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
    }
  },
  getters: {
    getUser(state): User | null {
      return state.user;
    }
  }
});

export default store;