import { useState, useEffect } from "react";
import { listFilesInPath } from "../../utils/tauriApi.ts";

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
        <ul className="mt-8 object-contain">
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
                        focus:outline-none focus:bg-gray-700 hover:bg-gray-700 pl-3"
                        >
                            <svg
                                className="mr-2"
                                fill="#ffffff"
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>Markdown icon</title>
                                    <path d="M22.269 19.385H1.731a1.73 1.73 0 0 1-1.73-1.73V6.345a1.73 1.73 0 0 1 1.73-1.73h20.538a1.73 1.73 0 0 1 1.73 1.73v11.308a1.73 1.73 0 0 1-1.73 1.731zm-16.5-3.462v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.461v7.847zM21.231 12h-2.308V8.077h-2.307V12h-2.308l3.461 4.039z"></path>
                                </g>
                            </svg>
                            {item}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default SideBar;
