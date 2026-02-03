// Declaraciones globales para TypeScript

export {};

declare global {
  interface Window {
    electronAPI?: {
      selectFolder: () => Promise<string | null>;
      readDir: (path: string) => Promise<Array<{
        name: string;
        path: string;
        isDirectory: boolean;
      }>>;
      platformSeparator: string;
      abrirExterno: (url: string, browser: string) => void;
    };
  }
}
