import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlowBuilder from "./components/FlowBuilder";

function App() {
  return (
    <>
      <FlowBuilder />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
