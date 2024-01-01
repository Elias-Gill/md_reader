import { useEffect, useState } from "react";
import { getTimeStamp, openFile } from "../../utils/tauriApi";
import { markdownToHtml, resolveLinks } from "./utils";
import "./styles.css";

type propTypes = {
    // Define the prop types here
    file: string;
    baseDir: string;
    changeFile: (s: string) => void;
};

function Reader(props: propTypes) {
    const currentFile = props.file;
    const baseDir = props.baseDir;

    const [content, setcontent] = useState("");
    const [oldStamp, setStamp] = useState(0);

    const [tick, setTick] = useState(0);
    const [interval, newInterval] = useState(null);

    const [updateLinks, setUpdateLinks] = useState(false);

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

                        // NOTE: this is an awfull hack to resolve links to other
                        // files just after rendering the current file
                        const aux = updateLinks;
                        setUpdateLinks(!aux);
                    });
                });
            }
        });
    }, [tick]);

    useEffect(() => {
        resolveLinks(props.changeFile);
    }, [updateLinks]);

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
            }, 1300)
        );

        (async () => {
            const content = await openFile(currentFile, baseDir);
            markdownToHtml(content).then((t) => {
                setcontent(t);

                const aux = updateLinks;
                setUpdateLinks(!aux);
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
