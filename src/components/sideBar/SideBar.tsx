import { useState, useEffect } from "react";
import { listFilesInPath } from "../../utils/tauriApi.ts";
import File from "./File.tsx";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";

type propTypes = {
    // Define the prop types here
    path: string;
    changeFile: (s: string) => void;
};

function SideBar(props: propTypes) {
    const path = props.path;
    const changeFile = props.changeFile;
    const [filesList, updateFilesList] = useState<string[]>([]);

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    // list files on path change
    useEffect(() => {
        try {
            (async () => {
                const filesList = await listFilesInPath(path);
                console.log(filesList);
                updateFilesList(filesList);
            })();
        } catch (error) {
            console.log(error);
        }
    }, [path]);

    return (
        <IconContext.Provider value={{ color: "#fff" }}>
            <nav
                className={
                    sidebar
                        ? ""
                        : "hidden" +
                          "w-56 lg:w-sidebar-lg xl:w-sidebar-xl border-r border-gray-500 overflow-auto bg-sidebar"
                }
            >
                <button onClick={showSidebar}>
                    <FaIcons.FaBars />
                </button>

                <ul className="mb-8 mt-8 w-[100%] ">
                    {filesList.map((item, index) => {
                        return <File key={index} item={item} callback={changeFile} />;
                    })}
                    <li>un elemtno guaug</li>
                </ul>
            </nav>
        </IconContext.Provider>
    );
}

export default SideBar;
