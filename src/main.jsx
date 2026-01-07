@@ .. @@
 import React from 'react'
 import ReactDOM from 'react-dom/client'
 import App from './app/App.jsx'
 import { AppWrapper } from './app/AppWrapper.jsx'
 import { ThemeProvider } from './contexts/theme-context.jsx'
 import { PetsProvider } from './contexts/PetsContext.jsx'
 import { ServicesProvider } from './contexts/ServicesContext.jsx'
 import { AppointmentsProvider } from './contexts/AppointmentsContext.jsx'
+import { initializeDatabase } from './lib/seedData.js'
 import './index.css'

+// Inicializar la base de datos local
+initializeDatabase().catch(console.error)
+
 ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
     <ThemeProvider defaultTheme="system" storageKey="vetsync-theme">
       <AppWrapper>
         <ServicesProvider>
           <PetsProvider>
             <AppointmentsProvider>
               <App />
             </AppointmentsProvider>
           </PetsProvider>
         </ServicesProvider>
       </AppWrapper>
     </ThemeProvider>
   </React.StrictMode>
 )