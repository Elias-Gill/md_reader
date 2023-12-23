import { useEffect, useState } from "react";
import { getTimeStamp, openFile } from "../../utils/tauriApi";

type propTypes = {
    // Define the prop types here
    file: string;
    baseDir: string;
};

function Reader(props: propTypes) {
    const currentFile = props.file;
    const baseDir = props.baseDir;
    const [content, setcontent] = useState("");
    const [oldStamp, setStamp] = useState(0);
    const [tick, setTick] = useState(false);

    // run a timer that "ticks" for searching file updates every second
    useEffect(() => {
        setInterval(() => {
            setTick(!tick);
        }, 1000);
    }, []);

    // this is used to verify if the current file has any changes. It runs on every
    // tick
    useEffect(() => {
        const aux = currentFile;
        getTimeStamp(aux, baseDir).then((newStamp) => {
            if (newStamp > oldStamp) {
                openFile(aux, baseDir).then((content) => {
                    setStamp(newStamp);
                    setcontent(content);
                });
            }
        });
    }, [tick]);

    useEffect(() => {
        (async () => {
            const content = await openFile(currentFile, baseDir);
            setcontent(content);
        })();
    }, [currentFile, baseDir]);

    return (
        <div className="overflow-x-auto overflow-y-auto break-normal ml-12 px-8">
            <span dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default Reader;
