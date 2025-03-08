import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service responsible for managing the application theme (light/dark)
 * Handles theme persistence in localStorage and respects user's system preferences
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // BehaviorSubject to track the current theme state
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false);
  
  // Observable that components can subscribe to
  public isDarkTheme$: Observable<boolean> = this.isDarkThemeSubject.asObservable();
  
  // Key used for theme storage in localStorage
  private readonly THEME_KEY = 'dark-theme-enabled';
  
  constructor() {
    this.initTheme();
  }
  
  /**
   * Initialize theme based on localStorage or system preference
   * Called on service initialization
   */
  private initTheme(): void {
    // First check local storage
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    if (savedTheme !== null) {
      this.setDarkTheme(savedTheme === 'true');
    } else {
      // Use system preference as fallback
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkTheme(prefersDark);
    }
  }
  
  /**
   * Toggle between light and dark theme
   */
  toggleTheme(): void {
    this.setDarkTheme(!this.isDarkThemeSubject.value);
  }
  
  /**
   * Set theme to dark or light
   * @param isDark Whether to use dark theme
   */
  setDarkTheme(isDark: boolean): void {
    // Update the subject value
    this.isDarkThemeSubject.next(isDark);
    
    // Save to localStorage
    localStorage.setItem(this.THEME_KEY, isDark.toString());
    
    // Apply the class to body element
    if (isDark) {
      document.body.classList.add('dark-theme');
      
      // Also try to manually update Angular Material theme
      // This is a fallback method for Angular 19
      this.applyDarkThemeToMaterialElements();
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  /**
   * Apply dark theme to Angular Material elements manually
   * This is a fallback approach for Angular 19
   */
  private applyDarkThemeToMaterialElements(): void {
    // Force reflow to ensure theme changes are applied
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }
}