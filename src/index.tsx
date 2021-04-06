import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
   

    //<pre> element helps format code
    return (
        <div>
            <TextEditor />
         </div >
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);