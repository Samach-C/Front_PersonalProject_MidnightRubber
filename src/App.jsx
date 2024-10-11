import AppRouter from "./routes/AppRouter"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="min-h-screen bg-slate-200">
      <ToastContainer />
      <AppRouter />
    </div>
  )
}

export default App
