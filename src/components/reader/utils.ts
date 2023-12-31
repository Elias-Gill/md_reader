import { marked } from "marked";

import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

export async function markdownToHtml(text: string): Promise<string> {
    marked.use({
        pedantic: false,
        gfm: false
    });

    // Override some default renderes
    const renderer = {
        code(code: string, language: string | undefined, _espaced: boolean) {
            if (language == undefined) {
                language = "text";
            }

            return `<pre><code>${
                hljs.highlight(code, {
                    language: language
                }).value
            }</code></pre>`;
        }
    };

    marked.use({ renderer });

    const html = await marked.parse(text);
    return html;
}
