'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseAdminConfigOptions {
  password: string;
}

export function useAdminConfig({ password }: UseAdminConfigOptions) {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load config from API
  const loadConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/config', { cache: 'no-store' });
      const data = await res.json();

      if (data.config) {
        setConfig(data.config);
      }
    } catch (err) {
      setError('Failed to load config');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save config via GitHub API
  const saveConfig = useCallback(
    async (newConfig: any) => {
      try {
        setSaving(true);
        setError(null);
        setSuccessMessage(null);

        const res = await fetch('/api/config/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password,
            config: newConfig,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to save');
        }

        setConfig(newConfig);
        setSuccessMessage(
          '✅ 設定已儲存！網站將在 30-60 秒內自動更新。'
        );

        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(null), 5000);

        return true;
      } catch (err: any) {
        setError(err.message || 'Failed to save config');
        return false;
      } finally {
        setSaving(false);
      }
    },
    [password]
  );

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return {
    config,
    setConfig,
    loading,
    saving,
    error,
    successMessage,
    saveConfig,
    loadConfig,
  };
}
