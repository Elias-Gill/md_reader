import { useState, useEffect } from "react";
import { listFilesInPath } from "../../tauriApi.ts";

type propTypes = {
    // Define the prop types here
    path: string,
    changeFile: (s: string) => void
};

function SideBar(props: propTypes) {
    const path = props.path;
    const changeFile = props.changeFile;
    const [filesList, updateFilesList] = useState<string[]>([]);

    useEffect(() => {
        try {
            updateFilesList(listFilesInPath(path));
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="mt-8 object-contain w-56">
            {filesList.map((item, index) => {
                // sidebar button elements
                const pressed = () => {
                    changeFile(item);
                };

                return (
                    <button key={index} onClick={pressed}>
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

export default SideBar;
