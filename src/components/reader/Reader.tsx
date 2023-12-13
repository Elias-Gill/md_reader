import { useEffect, useState } from "react";

import snarkdown from "snarkdown";
import hljs from "highlight.js";
import { openFile } from "../../tauriApi";

type propTypes = {
    // Define the prop types here
    file: string,
    baseDir: string
};


function Reader(props: propTypes) {
    const currentFile = props.file;
    const baseDir = props.baseDir;
    const [content, setcontent] = useState("");

    useEffect(() => {
        const content = openFile(currentFile, baseDir);
        setcontent(markdownToHtml(content));
    }, []);

    return (
        <div className="overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: content }} />;
        </div>
    );
}

export default Reader;

function higlightCode(doc: Document) {
    const elements = doc.querySelectorAll(".code");
    for (let i = 0; i < elements.length; i++) {
        const language = elements[0].classList[1];

        // TODO: replace the code block with highlighted code
        elements[i].children[0].innerHTML = hljs.highlight("<span>Hello World!</span>", {
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
