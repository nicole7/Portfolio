import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { isConstructorDeclaration } from 'typescript';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
    ;
const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    
    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: './esbuild.wasm'
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if (!ref.current) {
            return;
        };
        //tranform does transpiling not bundling or join up diff modules or handle input statements
            // const result = await ref.current.transform(input, {
            //     loader: 'jsx',
            //     target: 'es2015'
            // });
        const result = await ref.current.build({
            //first one to be bundled
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()],
            define: {
                'process.envNODE_ENV': '"production"',
                global: 'window',
            }
        });

        setCode(result.outputFiles[0].text);
    };

    //<pre> element helps format code
    return (
    <div>
            <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
            <pre>{code}</pre>
    </div >
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);