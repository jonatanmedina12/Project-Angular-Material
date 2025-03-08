import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ChartData } from '../../models/ChartData';
import { Observable } from 'rxjs';
import { RecentActivity } from '../../models/RecentActivity';
import { ThemeService } from '../../../../Theme.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-dashboard-home',
  imports: [ CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatChipsModule
    ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  // Observable for the theme state
  isDarkTheme$: Observable<boolean>;
  
  // Media query for responsive layout
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  // Dashboard data
  summaryCards = [
    { title: 'Ventas Totales', value: '€45,623', icon: 'shopping_cart', color: 'primary' },
    { title: 'Nuevos Usuarios', value: '892', icon: 'people', color: 'accent' },
    { title: 'Pedidos Pendientes', value: '38', icon: 'inventory_2', color: 'warn' },
    { title: 'Ingresos Mensuales', value: '€12,389', icon: 'payments', color: 'primary' }
  ];
  
  barChartData = [
    { name: 'Ene', value: 65 },
    { name: 'Feb', value: 59 },
    { name: 'Mar', value: 80 },
    { name: 'Abr', value: 75 },
    { name: 'May', value: 85 },
    { name: 'Jun', value: 70 }
  ];
  
  pieChartData = [
    { name: 'Productos', value: '65%' },
    { name: 'Servicios', value: '25%' },
    { name: 'Otros', value: '10%' }
  ];
  
  recentActivities = [
    { 
      type: 'order', 
      description: 'Pedido #3429 recibido', 
      date: new Date(new Date().getTime() - 5 * 60000), 
      status: 'pending' 
    },
    { 
      type: 'user', 
      description: 'Ana López se registró', 
      date: new Date(new Date().getTime() - 3 * 3600000), 
      status: 'completed' 
    },
    { 
      type: 'support', 
      description: 'Ticket #2178 resuelto', 
      date: new Date(new Date().getTime() - 1 * 3600000), 
      status: 'completed' 
    },
    { 
      type: 'payment', 
      description: 'Pago recibido de Carlos González', 
      date: new Date(new Date().getTime() - 12 * 3600000), 
      status: 'completed' 
    },
    { 
      type: 'order', 
      description: 'Pedido #3425 enviado', 
      date: new Date(new Date().getTime() - 24 * 3600000), 
      status: 'processing' 
    }
  ];
  
  constructor(
    private themeService: ThemeService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    // Set up mobile query for responsive design
    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    
    // Get theme observable
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }
  
  ngOnInit(): void {
    // Component initialization logic
  }
  
  ngAfterViewInit(): void {
    // Force detection of theme changes
    this.isDarkTheme$.subscribe(() => {
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
      });
    });
  }
  
  ngOnDestroy(): void {
    // Clean up event listeners
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
  
  /**
   * Toggle between light and dark theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  /**
   * Get color for activity status that's theme-aware
   * @param status The activity status
   * @returns Color string for the status
   */
  getStatusColor(status: string): string {
    // Check if dark theme is active by looking at body class
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    if (isDarkTheme) {
      switch(status) {
        case 'completed': return '#69f0ae'; // Bright green for dark theme
        case 'processing': return '#82b1ff'; // Bright blue for dark theme
        case 'pending': return '#ffb74d'; // Bright orange for dark theme
        default: return '#e0e0e0'; // Light gray for dark theme
      }
    } else {
      switch(status) {
        case 'completed': return '#4caf50'; // Regular green
        case 'processing': return '#2196f3'; // Regular blue
        case 'pending': return '#ff9800'; // Regular orange
        default: return '#9e9e9e'; // Regular gray
      }
    }
  }
  
  /**
   * Get appropriate icon based on activity type
   * @param type The activity type
   * @returns Material icon name
   */
  getIconForActivity(type: string): string {
    switch(type) {
      case 'order': return 'shopping_cart';
      case 'user': return 'person';
      case 'support': return 'support_agent';
      case 'payment': return 'payments';
      default: return 'info';
    }
  }
  
  /**
   * Get background color for pie chart segments based on theme
   * @param name The segment name
   * @returns Color code
   */
  getPieChartColor(name: string): string {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    if (isDarkTheme) {
      switch(name) {
        case 'Productos': return '#bb86fc';
        case 'Servicios': return '#03dac6';
        default: return '#ffb74d';
      }
    } else {
      switch(name) {
        case 'Productos': return '#3f51b5';
        case 'Servicios': return '#ff4081';
        default: return '#ffd740';
      }
    }
  }
}
