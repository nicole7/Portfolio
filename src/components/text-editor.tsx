import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './text-editor.css';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    //view mode
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const { updateCell } = useActions();

    //click inside document to toggle editing off
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            //find where the user clicked on
            console.log(event.target);
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                console.log('element clicked on is inside editor');
                return;
            }
            console.log('element clicked is outside editor')

            setEditing(false)
        };
        document.addEventListener('click', listener, { capture: true });
        
        //clean up return function
        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }
    }, []);

    if (editing) {
        return (
            <div ref={ref} className="text-editor">
                <MDEditor value={cell.content} onChange={(value) => { updateCell(cell.id, value || '')}}/>
            </div>
        );
    };

    return (
        <div onClick={() => { setEditing(true) }} className="text-editor card">
            <div className="card-content">
             <MDEditor.Markdown source={cell.content || 'Click to Edit'} />
            </div>
        </div>
    );
};

export default TextEditor;