import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { useMemo } from 'react';

export const useActions = () => {
    const dispatch = useDispatch();

    //kind of like useEffect and useState together
    //rerun when state changes
    //calc is done one time and only repeated when something inside the dependancy array changes
    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch)
        //dispatch in dependancy array because value inside component or received as props
        //anything imported at top of file doesnt need to be added
    }, [dispatch])
};


