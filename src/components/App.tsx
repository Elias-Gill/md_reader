import { useEffect, useState } from "react";
import SideBar from "./sideBar/SideBar";
import Reader from "./reader/Reader";
import { parseArguments } from "../utils/tauriApi";

function App() {
    const [currentFile, changeFile] = useState("");
    const [currentPath, changePath] = useState("");

    // load arguments after initialization
    useEffect(() => {
        (async () => {
            const args = await parseArguments();
            changePath(args.path);
            changeFile(args.file);
        })();
    }, []);

    return (
        <div className="flex h-screen max-h-screen mr-auto ml-auto max-w-128">
            <div className="w-56 lg:w-sidebar-lg xl:w-sidebar-xl border-r border-gray-500 overflow-auto bg-sidebar">
                <SideBar changeFile={changeFile} path={currentPath} />
            </div>

            <div className="mb-8 mt-8 flex max-w-xl lg:max-w-2xl xl:max-w-6xl">
                <Reader baseDir={currentPath} file={currentFile} />
            </div>
        </div>
    );
}

export default App;
