import {Provider} from '@reduxJs/toolkit'
import {store} from '../../store/store';

const RBScheduler = () => {
    return (
        <Provider store={store}>
            <div>rbs</div>
        </Provider>
    )
}

export default RBScheduler;