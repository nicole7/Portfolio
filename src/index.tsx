import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import { store } from './state';
import { Provider } from 'react-redux';

const App = () => {
   
    //<pre> element helps format code
    return (
        <Provider store={store}>
            <div>
                <TextEditor />
             </div >
        </Provider>
        
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);