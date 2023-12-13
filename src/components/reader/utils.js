import snarkdown from 'snarkdown';
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import hljs from 'highlight.js';

function higlightCode(doc) {
    let elements = doc.querySelectorAll('.code');
    for (let i = 0; i < elements.length; i++) {
        let language = elements[0].classList[1];

        // replace the code block with highlighted code
        elements[i].childs[0].innerHTML = hljs.highlight('<span>Hello World!</span>', {
            language: language
        }).value;
    }
}

function markdownToHtml(text) {
    let html = snarkdown(text);

    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');

    higlightCode(doc);

    return doc.body.innerHTML;
}

export function openFile(file, baseDir) {
    readTextFile(file, { dir: BaseDirectory.Home }).then((value) => {
        return markdownToHtml(value);
    });
}
