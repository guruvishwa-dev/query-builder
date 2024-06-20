import { MantineProvider } from '@mantine/core'
import './App.css'
import { ModalsProvider } from '@mantine/modals';
import { RouterProvider,  } from 'react-router-dom';
import routes from './router/routes';
import "@mantine/core/styles.css"

function App() {

  return (
      <MantineProvider>
        <ModalsProvider>
          <RouterProvider router={routes}/>
        </ModalsProvider>
        
        
      </MantineProvider>
  );
}

export default App
