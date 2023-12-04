import { useState } from 'react';
// import { invoke } from '@tauri-apps/api/tauri';

export default function Form() {
    const [greetMsg, setGreetMsg] = useState('');
    const [name, setName] = useState('');

    async function greet() {
        // setGreetMsg(await invoke('greet', { name }));
        setGreetMsg(`Buenos dias senhor ${name}`);
    }

    return (
        <div>
            <form
                className="row"
                onSubmit={(e) => {
                    e.preventDefault();
                    greet();
                }}
            >
                <input
                    id="greet-input"
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a name..."
                />
                <button type="submit">Greet</button>
            </form>

            <p>{greetMsg}</p>
        </div>
    );
}
