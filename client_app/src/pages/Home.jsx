import React from 'react';
   import useAuthUser from '../../store.jsx'; // Correctement importé

   export default function Home() {
       const user = useAuthUser((state) => state.USER);
       const logoutUser = useAuthUser((state) => state.logoutUser);

       const handleLogout = () => {
           logoutUser();
       }

       return (
           <main className="container">
               <h1>Hello, {user.name || 'User'}!</h1>
               <p>Email: {user.email || 'Email not provided'}</p>
               <button onClick={handleLogout}>Déconnexion</button>
           </main>
       );
   }