import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import React, { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import './syntax.css';
interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();

    //called when editor is first displayed on screen
    //second argument is a ref to the editor itself for monaco
    //export type EditorDidMount = getEditorValue: () => string, editor: monacoEditor.editor.IStandaloneCodeEditor) => void;
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );
        //try to add syntax highlighting 
        highlighter.highLightOnDidChangeModelContent(
            () => { },
            () => { },
            undefined,
            () => { }
        );
    };

    //format with prettier in code editor
    const onFormatClick = () => {
        //get current value from editor
        const unformatted = editorRef.current.getModel().getValue();

        //format that value
        const formatted = prettier.format(unformatted, {
            //treat this as javascript
            parser: 'babel',
            //here is the parser to use
            plugins: [parser],
            useTabs: false,
            //semicolons at end of lines
            semi: true,
            //use single instead of double
            singleQuote: true
        }).replace(/\n$/, '');

        //set the formatted value back in the editor
        editorRef.current.setValue(formatted)

    }

    return (
        <div className="editor-wrapper">
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
            <MonacoEditor
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
                editorDidMount={onEditorDidMount}
                value={initialValue}
                theme="dark"
                language="javascript"
                height="100%"
            />
        </div>
    );
};

export default CodeEditor;
