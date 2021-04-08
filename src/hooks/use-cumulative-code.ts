import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
      //reach into current state and get array of strings for each cell
    return useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map(id => data[id]);
        const showFunction =
            `
            import _React from 'react';
            import _ReactDOM from 'react-dom';
            var show = (value) => {
              const root = document.querySelector('#root');
    
              if (typeof value === 'object') {
                if (value.$$typeof && value.props) {
                  _ReactDOM.render(value, root);
                } else {
                  root.innerHTML = JSON.stringify(value);
                }
              } else {
                root.innerHTML = value;
              }
            };
          `;
        //no operation
        const showFunctionNoOp = 'var show = () => {}'
        const cumulativeCodeCells = [];
        for (let c of orderedCells) {
            if (c.type === 'code') {
                if (c.id === cellId) {
                    cumulativeCodeCells.push(showFunction);
                } else {
                    cumulativeCodeCells.push(showFunctionNoOp);
                }
                cumulativeCodeCells.push(c.content);
            }
            if (c.id === cellId) {
                break;
            }
        }
        return cumulativeCodeCells;
    }).join('\n');
};