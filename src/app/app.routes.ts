import { Routes } from '@angular/router';

export const routes: Routes = [


      
          // Ruta protegida para el dashboard
          {
            path: 'dashboard',
            loadChildren: () => import('./feature/dashboard/dashboard-routing.module').then(m => m.ROUTES_DASHBOARD),
          },
          
          // Redirección por defecto
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          
          // Ruta para página no encontrada
          {
            path: '**',
            redirectTo: 'dashboard'
          }
];
