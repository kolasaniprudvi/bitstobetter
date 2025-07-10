import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, changeTheme } = useTheme();

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'auto', icon: <Monitor className="w-4 h-4" />, label: 'Auto' }
  ];

  return (
    <div className="relative group">
      <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        {themes.find(t => t.value === theme)?.icon}
      </button>
      
      <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => changeTheme(themeOption.value)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                theme === themeOption.value
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {themeOption.icon}
              <span>{themeOption.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;