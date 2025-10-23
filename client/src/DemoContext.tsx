import { createContext, useContext, ReactNode } from 'react';

interface DemoContextType {
  demoSlug?: string;
  isDemo: boolean;
}

const DemoContext = createContext<DemoContextType>({ isDemo: false });

export function DemoProvider({ slug, children }: { slug?: string; children: ReactNode }) {
  return (
    <DemoContext.Provider value={{ demoSlug: slug, isDemo: !!slug }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  return useContext(DemoContext);
}

// Helper to get the correct path
export function getDemoPath(path: string, demoSlug?: string) {
  if (!demoSlug) return path;
  return `/${demoSlug}${path}`;
}
