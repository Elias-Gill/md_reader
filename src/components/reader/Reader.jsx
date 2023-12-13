import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { openFile } from './utils.js';

function Reader(props) {
    const currentFile = props.file;
    const baseDir = props.baseDir;
    const [content, setcontent] = useState('');

    useEffect(() => {
        setcontent(openFile(currentFile, baseDir));
    }, []);

    return (
        <div className="overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: content }} />;
        </div>
    );
}

Reader.propTypes = {
    // Define the prop types here
    file: PropTypes.string.isRequired,
    baseDir: PropTypes.string.isRequired
};

export default Reader;
