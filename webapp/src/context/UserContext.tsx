"use client";

import { createContext } from 'react';

export interface UserContextType {
  username: string | null;
  jobTitle: string | null;
}

export const UserContext = createContext<UserContextType>({
  username: null,
  jobTitle: null
}); 