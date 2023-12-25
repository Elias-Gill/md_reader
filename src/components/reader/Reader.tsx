import { useEffect, useState } from "react";
import { getTimeStamp, openFile } from "../../utils/tauriApi";
import { markdownToHtml } from "./utils";

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

    const [tick, setTick] = useState(0);
    const [interval, newInterval] = useState(null);

    // this is used to verify if the current file has any changes. It runs on every
    // tick
    useEffect(() => {
        const aux = currentFile;

        getTimeStamp(aux, baseDir).then((newStamp) => {
            if (newStamp > oldStamp) {
                openFile(aux, baseDir).then((content) => {
                    setStamp(newStamp);
                    setcontent(markdownToHtml(content));
                });
            }
        });
    }, [tick]);

    useEffect(() => {
        // run a timer that searches file updates every second
        // Clear the old interval on every file change
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore (have faith)
        clearInterval(interval);
        newInterval(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore (have faith)
            setInterval(() => {
                setTick(Date.now());
                console.log(tick);
            }, 1300)
        );

        (async () => {
            const content = await openFile(currentFile, baseDir);
            setcontent(markdownToHtml(content));
        })();
    }, [currentFile, baseDir]);

    return (
        <div className="overflow-x-auto overflow-y-auto break-normal ml-12 px-8">
            <span dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default Reader;
