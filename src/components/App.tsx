import { useEffect, useState } from "react";
import SideBar from "./sideBar/SideBar";
import Reader from "./reader/Reader";
import { parseArguments } from "../utils/tauriApi";
import BurgerIcon from "./sideBar/BurgerIcon";

function App() {
    const [currentFile, changeFile] = useState(" ");
    const [currentPath, changePath] = useState(" ");
    const [isOpen, setOpen] = useState(false);

    // load arguments after initialization
    useEffect(() => {
        (async () => {
            const args = await parseArguments();
            changePath(args.path);
            changeFile(args.file);
        })();
    }, []);

    return (
        <div className="flex h-screen max-h-screen mr-auto ml-auto">
            <div className="flex rounded-md h-max px-2 py-4">
                <button onClick={() => setOpen(!isOpen)}>
                    <BurgerIcon />
                </button>
            </div>

            <div
                className={`transition-all duration-75 ${
                    isOpen ? "w-56 lg:w-sidebar-lg xl:w-sidebar-xl" : "w-0"
                } border-r border-gray-500 overflow-auto bg-sidebar`}
            >
                <SideBar changeFile={changeFile} path={currentPath} />
            </div>

            <div className="max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl flex overflow-x-auto overflow-y-auto my-8">
                <Reader
                    baseDir={currentPath}
                    file={currentFile}
                    changeFile={changeFile}
                />
            </div>
        </div>
    );
}

export default App;
