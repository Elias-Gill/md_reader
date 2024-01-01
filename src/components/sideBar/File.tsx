import MdIcon from "./MdIcon.tsx";

type propTypes = {
    // Define the prop types here
    item: string;
    callback: (s: string) => void;
};

export default function File(args: propTypes) {
    const pressed = () => {
        args.callback(args.item);
        console.log("Selected with sidebar: ", args.item);
    };

    return (
        <li className="list-none">
            <button
                onClick={pressed}
                className="inline-flex items-center rounded-sm w-[100%]
            focus:outline-none focus:bg-gray-700 hover:bg-gray-700 px-3 whitespace-nowrap"
            >
                <MdIcon />
                {args.item}
            </button>
        </li>
    );
}
