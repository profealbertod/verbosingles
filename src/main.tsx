import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

type BoundaryState = { error: string | null };
class AppErrorBoundary extends React.Component<React.PropsWithChildren, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): BoundaryState {
    return { error: error instanceof Error ? error.message : String(error) };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error al renderizar la aplicación:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main style={{ maxWidth: 760, margin: '48px auto', padding: 24, fontFamily: 'system-ui, sans-serif', color: '#4a1d29', background: '#fffcf7', border: '1px solid #e1cfb5', borderRadius: 16 }}>
          <h1>La aplicación no ha podido iniciarse</h1>
          <p>Hemos detectado un error al mostrar la página. Este mensaje nos ayudará a localizarlo:</p>
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', padding: 16, background: '#f3e8d7', borderRadius: 8 }}>{this.state.error}</pre>
          <p>Envía una captura de este mensaje al responsable de la aplicación.</p>
        </main>
      );
    }
    return this.props.children;
  }
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </React.StrictMode>
  );
} else {
  document.body.innerHTML = '<main style="font:16px system-ui;padding:32px;color:#4a1d29"><h1>No se encuentra el contenedor de la aplicación (#root).</h1></main>';
}
