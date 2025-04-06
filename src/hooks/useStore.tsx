import { create } from "zustand";
import { UserDatabase } from "../types";

type ThemeMode = "light" | "dark" | "system";
type Language = "uz" | "en" | "ru"; 

interface StoreState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  darkMode: boolean;
  setDarkMode: (isDark: boolean) => void;

  language: Language;
  setLanguage: (lang: Language) => void;

  user: UserDatabase | null;
  setUser: (user: UserDatabase | null) => void;

  groups: Group[];
  addGroup: (newGroup: Group) => void;

  logout: () => void;
}

interface Group {
  id: number;
  name: string;
}

const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToLocalStorage = (key: string, value: unknown) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
  }
};

export const useStore = create<StoreState>((set) => ({
  themeMode: getFromLocalStorage<ThemeMode>("themeMode", "system"),
  setThemeMode: (mode) =>
    set(() => {
      saveToLocalStorage("themeMode", mode);
      return { themeMode: mode };
    }),

  darkMode: getFromLocalStorage<boolean>("darkMode", false),
  setDarkMode: (isDark) =>
    set(() => {
      saveToLocalStorage("darkMode", isDark);
      return { darkMode: isDark };
    }),

  language: getFromLocalStorage<Language>("language", "en"),
  setLanguage: (lang) =>
    set(() => {
      saveToLocalStorage("language", lang);
      return { language: lang };
    }),

  user: getFromLocalStorage<UserDatabase | null>("user", null),
  setUser: (user) =>
    set(() => {
      saveToLocalStorage("user", user);
      return { user };
    }),

  groups: getFromLocalStorage<Group[]>("groups", []),
  addGroup: (newGroup) =>
    set((state) => {
      const updatedGroups = [...state.groups, newGroup];
      saveToLocalStorage("groups", updatedGroups);
      return { groups: updatedGroups };
    }),

  logout: () =>
    set(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null };
    }),
}));
