import { RouterProvider } from 'react-router-dom';
import { router } from './Routers/Routes/Routes';

function App() {

  return (
    <div className="bg-red-400 max-w-screen-lg mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
