import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { listFiles } from "../../tauriApi.js";

function SideBar(props) {
    const path = props.path;
    const changeFile = props.changeFile;
    let [filesList, updateFilesList] = useState([""]);

    useEffect(() => {
        try {
            updateFilesList(listFiles(path));
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="mt-8 object-contain w-56">
            {filesList.map((item, index) => {
                // sidebar button elements
                const pressed = () => {
                    changeFile(item);
                };

                return (
                    <button key={index} onClick={pressed}>
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

SideBar.propTypes = {
    // Define the prop types here
    changeFile: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default SideBar;
