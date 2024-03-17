import ReactDOM from 'react-dom/client'
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';
import '@vkontakte/vkui/dist/vkui.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ConfigProvider appearance="light">
      <AdaptivityProvider>
        <AppRoot>
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </QueryClientProvider>
  // </React.StrictMode>,
)
