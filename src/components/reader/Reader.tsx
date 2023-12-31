import { useEffect, useState } from "react";
import { getTimeStamp, openFile } from "../../utils/tauriApi";
import { markdownToHtml } from "./utils";
import "./styles.css";

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
                    markdownToHtml(content).then((t) => {
                        setcontent(t);
                    });
                });
            }
        });
    }, [tick]);

    // run a timer that searches file updates every second
    // Clear the old interval on every file change
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore (have faith)
        clearInterval(interval);
        newInterval(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setInterval(() => {
                setTick(Date.now());
                console.log(tick);
            }, 1300)
        );

        (async () => {
            const content = await openFile(currentFile, baseDir);
            markdownToHtml(content).then((t) => {
                setcontent(t);
            });
        })();
    }, [currentFile, baseDir]);

    return (
        <div className="break-normal ml-12 px-8">
            <span dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default Reader;
