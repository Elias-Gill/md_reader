import { useState } from "react";
import SideBar from "./components/sideBar/SideBar";
import Reader from "./components/reader/Reader";
import { parseArguments } from "./tauriApi";

function App() {
    const args = parseArguments();
    const f = args.isFile ? args.path : "";
    const [currentFile, changeFile] = useState(f);

    return (
        <div className="flex justify-around h-screen max-h-screen max-w-6xl mr-auto ml-auto ">
            <div className="border-r overflow-auto">
                <SideBar changeFile={changeFile} path={}/>
            </div>

            <div className="mt-8 flex ml-4 mr-auto">
                {currentFile}
                {/* TODO: cambio de carpeta */}
                <Reader baseDir={""} file={currentFile} />
            </div>
        </div>
    );

}

export default App;
