import './App.css'
import AppWinPlay from "./components/AppWinPlay.jsx";
import AppContextProvider from "./context/AppContextProvider.jsx";

function App() {

  return (
    <div>
        <AppContextProvider>
                <AppWinPlay/>
        </AppContextProvider>
    </div>
  )
}

export default App
