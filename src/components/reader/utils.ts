import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

export function isUrl(url: string): boolean {
    // the most mean solution you will ever see, but somehow works
    if (url.includes("http://") || url.includes("https://") || url.includes("www.")) {
        return true;
    }
    return false;
}

// change links bahavior to open local files if the given href is not a web url
export function resolveLinks(changeFile: (s: string) => void) {
    document.querySelectorAll("a").forEach((element) => {
        // NOTE: must use "getAttribute"
        const link = element.getAttribute("href") as string;
        if (!isUrl(link)) {
            element.href = "#";
            element.addEventListener("click", function () {
                changeFile(link);
            });
        }
    });
}

export async function markdownToHtml(text: string): Promise<string> {
    // Override some default renderes
    const renderer = {
        link(href: string, _title: string | null | undefined, text: string) {
            return `<a href='${href}'>${text}</a>`;
        },
        code(code: string, language: string | undefined, _espaced: boolean) {
            try {
                if (language == undefined) {
                    language = "text";
                }
                language = hljs.getLanguage(language)?.name ?? "text";

                return `<pre><code>${
                    hljs.highlight(code, {
                        language: language
                    }).value
                }</code></pre>`;
            } catch {
                // if we cannot highlight the code, just return it
                return `<pre><code>${code}</code></pre>`;
            }
        }
    };

    marked.use({
        pedantic: false,
        gfm: false,
        renderer: renderer
    });

    const html = await marked.parse(text);
    return html;
}
