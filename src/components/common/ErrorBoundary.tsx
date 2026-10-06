import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetStorage = () => {
    if (window.confirm('Reset data lokal demonstrasi dan muat ulang halaman?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#F8FAFC',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
          <div style={{
            maxWidth: '540px',
            width: '100%',
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid #E2E8F0',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <AlertTriangle size={32} color="#EF4444" />
            </div>

            <h2 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '0.5rem', fontWeight: 800 }}>
              Terjadi Kendala Sistem Sementara
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Komponen aplikasi mengalami galat tidak terduga saat memproses data. Anda dapat memuat ulang peramban atau mereset data sesi demo lokal.
            </p>

            {this.state.error && (
              <div style={{
                background: '#F1F5F9',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                color: '#64748B',
                fontFamily: 'monospace',
                textAlign: 'left',
                marginBottom: '1.5rem',
                overflowX: 'auto',
                border: '1px solid #CBD5E1'
              }}>
                {this.state.error.message}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#2E7D32',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <RefreshCw size={16} />
                <span>Muat Ulang Halaman</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetStorage}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#FFFFFF',
                  color: '#EF4444',
                  border: '1.5px solid #FECACA',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                <span>Reset Sesi Demo</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
