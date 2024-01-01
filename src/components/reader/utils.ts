import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

function isValidUrl(urlString: string): boolean {
    const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // validate protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
}

// change links bahavior to open local files if the given href is not a web url
export function resolveLinks(changeFile: (s: string) => void) {
    document.querySelectorAll("a").forEach((element) => {
        // NOTE: must use "getAttribute"
        const link = element.getAttribute("href") as string;
        if (!isValidUrl(link)) {
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
