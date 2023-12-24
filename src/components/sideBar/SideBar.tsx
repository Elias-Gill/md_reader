import { useState, useEffect } from "react";
import { listFilesInPath } from "../../utils/tauriApi.ts";
import MdIcon from "./MdIcon.tsx";

type propTypes = {
    // Define the prop types here
    path: string;
    changeFile: (s: string) => void;
};

function SideBar(props: propTypes) {
    const path = props.path;
    const changeFile = props.changeFile;
    const [filesList, updateFilesList] = useState<string[]>([]);

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
        <ul className="mb-8 mt-8 w-[100%]">
            {filesList.map((item, index) => {
                // sidebar button elements
                const pressed = () => {
                    changeFile(item);
                    console.log("Selected with sidebar: " + item);
                };

                return (
                    <li key={index}>
                        <button
                            onClick={pressed}
                            className="inline-flex items-center rounded-sm w-[100%]
                        focus:outline-none focus:bg-gray-700 hover:bg-gray-700 px-3 whitespace-nowrap"
                        >
                            <MdIcon />
                            {item}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default SideBar;
