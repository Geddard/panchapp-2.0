// VENDOR LIBS
import React from 'react';

// LIBS
import { instance as firebaseStore } from 'lib/firebase-store';

// LAYOUT COMPONENTS
import Loading from 'components/layout/loading';

// COMMON COMPONENTS
import RenderWithDelay from 'components/common/render-with-delay';

class Log extends React.Component {

    constructor() {
        super();

        this.state = {
            logs: firebaseStore.getLog() || []
        };
        firebaseStore.addChangeListener(this.loadLogs);
    }

    componentWillUnmount() {
        firebaseStore.removeChangeListener(this.loadLogs);
    }

    render() {
        return (
            <Loading loading={!this.state.logs.length}>
                <ul className="log">
                    {this.state.logs.map(this.renderLog)}
                </ul>
            </Loading>
        );
    }

    renderLog = (log, index) => {
        return (
            <RenderWithDelay {...this.getRenderWithDelayProps(index)}>
                <li className="log--item">
                    {log.entry} - Movement: {log.type} - Date: {log.date}
                </li>
            </RenderWithDelay>
        );
    }

    getRenderWithDelayProps(index) {
        return {
            animation: 'typewrite',
            key: index,
            wait: index * 100
        };
    }

    loadLogs = () => {
        this.setState({
            logs: firebaseStore.getLog()
        });
    }
}

export default Log;
