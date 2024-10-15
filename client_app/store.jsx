import { create } from 'zustand';
   import { persist } from 'zustand/middleware';

   const useAuthUser = create(persist((set) => ({
       USER: {},
       loginUser: (user) => set(() => ({ USER: user })),
       logoutUser: () => set(() => ({ USER: {} })),
   }), {
       name: 'user-storage', 
       getStorage: () => localStorage, 
   }));

   export default useAuthUser;  