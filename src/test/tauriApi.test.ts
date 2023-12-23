import { mockIPC, clearMocks } from "@tauri-apps/api/mocks";
import { invoke } from "@tauri-apps/api/tauri";
import { afterEach, test, expect } from "vitest";

afterEach(() => {
    clearMocks();
});

test("mocked command", () => {
    mockIPC((cmd, args) => {
        switch (cmd) {
            case "add":
                return (args.a as number) + (args.b as number);
            default:
                break;
        }
    });

    expect(invoke("add", { a: 12, b: 15 })).resolves.toBe(27);
});
