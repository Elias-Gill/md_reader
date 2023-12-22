import { useEffect, useState } from "react";
import { openFile } from "../../utils/tauriApi";
import snarkdown from "snarkdown";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

type propTypes = {
    // Define the prop types here
    file: string;
    baseDir: string;
};

function higlightCode(doc: Document) {
    const elements = doc.querySelectorAll(".code");
    for (let i = 0; i < elements.length; i++) {
        let language = elements[0].classList[1];
        if (language == undefined) {
            language = "text";
        }
        const aux = elements[i].children[0].innerHTML;

        elements[i].children[0].innerHTML = hljs.highlight(aux, {
            language: language
        }).value;
    }
}

function markdownToHtml(text: string): string {
    const html = snarkdown(text);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    higlightCode(doc);

    return doc.body.innerHTML;
}

function Reader(props: propTypes) {
    const currentFile = props.file;
    const baseDir = props.baseDir;
    const [content, setcontent] = useState("");

    useEffect(() => {
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
