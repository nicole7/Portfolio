import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/code-cell';

const App = () => {
   

    //<pre> element helps format code
    return (
        <div>
            <CodeCell />
            <CodeCell />
         </div >
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);