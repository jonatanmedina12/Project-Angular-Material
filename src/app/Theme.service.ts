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
    this.isDarkThemeSubject.next(isDark);
    localStorage.setItem(this.THEME_KEY, isDark.toString());
    
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  /**
   * Returns the current theme state
   * @returns boolean indicating if dark theme is active
   */
  isDarkThemeActive(): boolean {
    return this.isDarkThemeSubject.value;
  }
}