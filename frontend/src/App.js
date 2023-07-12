import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/navbar"
import SelectMenu from './components/Selections/SelectMenu';
import Footer from './components/Footer/footer'
import { useEffect } from "react";
import axios from "axios";
import './index.css'
import { OutputContextProvider } from "./context/OutputContextProvider";
import ChatBox from './components/Chat/ChatBox'


const baseURL = process.env.REACT_APP_URL

function App() {
  useEffect(() => {
    axios.delete(baseURL)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }, [])
  
  return (
    <OutputContextProvider>
    <div className = "page">
      <div className = "content">
        <NavBar />
        <SelectMenu />
        <ChatBox />
      </div>
      <Footer />
    </div>
    </OutputContextProvider>
  );
}

export default App;
