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
            <SideBar changeFile={changeFile} path={currentPath} />

            <Reader baseDir={currentPath} file={currentFile} />
        </div>
    );
}

export default App;
