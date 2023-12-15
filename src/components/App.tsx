import { useState } from "react";
import SideBar from "./sideBar/SideBar";
import Reader from "./reader/Reader";
import { parseArguments, tauriArguments } from "../utils/tauriApi";

function App() {
    const args = parseArguments() as tauriArguments;
    const [currentFile, changeFile] = useState(args.file);

    return (
        <div className="flex justify-around h-screen max-h-screen max-w-6xl mr-auto ml-auto ">
            <div className="border-r overflow-auto">
                <SideBar changeFile={changeFile} path={args.path} />
            </div>

            <div className="mt-8 flex ml-4 mr-auto">
                {currentFile}
                <Reader baseDir={args.path} file={currentFile} />
            </div>
        </div>
    );

}

export default App;
