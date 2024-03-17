import ReactDOM from 'react-dom/client'
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui'
import { QueryClientProvider } from '@tanstack/react-query';
import '@vkontakte/vkui/dist/vkui.css';

import { App, queryClient } from '@app';

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
