import { useState, useEffect } from "react";
import { listFilesInPath } from "../../utils/tauriApi.ts";

/* import { getClass } from "file-icons-js";
export function getIcon(): string {
    const filename = "src/app.js";
    const className = getClass(filename);
    return className;
} */

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
        <div className="mt-8 object-contain w-56">
            {filesList.map((item, index) => {
                // sidebar button elements
                const pressed = () => {
                    changeFile(item);
                    console.log("Selected with sidebar: " + item);
                };

                return (
                    <button className="inline-flex w-[100%]" key={index} onClick={pressed}>
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

export default SideBar;
