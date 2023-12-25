import snarkdown from "snarkdown";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

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

export function markdownToHtml(text: string): string {
    const html = snarkdown(text);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    higlightCode(doc);

    return doc.body.innerHTML;
}
