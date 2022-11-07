import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useCallback } from 'react';
import type { MutableSnapshot } from 'recoil';
import { RecoilRoot } from 'recoil';

import { queryClient } from '@/application/queryClient';
import { userAuthState } from '@/application/store/user/userAuth';
import AppLayout from '@/containers/AppLayout';
import { getAccessToken } from '@/infra/api';
import { GlobalStyle, theme } from '@/styles';

function MyApp({ Component, pageProps }: AppProps) {
  const recoilInitializer = useCallback(({ set }: MutableSnapshot) => {
    const token = getAccessToken();
    if (token) {
      set(userAuthState, { isLogin: true });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RecoilRoot initializeState={recoilInitializer}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
