import { useState } from "react";
import SideBar from "./components/sideBar/SideBar";
import Reader from "./components/reader/Reader";

function App() {
    const [currentFile, changeFile] = useState("");

    return (
        <div className="flex justify-around h-screen max-h-screen max-w-6xl mr-auto ml-auto ">
            <div className="border-r overflow-auto">
                <SideBar path="~/Descargas" changeFile={changeFile} />
            </div>

            <div className="mt-8 flex ml-4 mr-auto">
                {currentFile}
                {/* TODO: cambio de carpeta */}
                <Reader baseDir={""} file={currentFile}/>
            </div>
        </div>
    );

}

export default App;
