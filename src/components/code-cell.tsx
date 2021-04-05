import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    const onClick = async () => {
        //tranform does transpiling not bundling or join up diff modules or handle input statements
            // const result = await ref.current.transform(input, {
            //     loader: 'jsx',
            //     target: 'es2015'
            // });
        
        const output = await bundle(input);
        setCode(output);
    };

    //<pre> element helps format code
    return (
        <div>
            <CodeEditor
                initialValue=""
                onChange={(value) => setInput(value)}
            />
            <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div> 
            <Preview code={code}/>
    </div >
    );
};

export default CodeCell;