// VENDOR LIBS
import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

// LIBS
import FirebaseApp from 'lib/firebase-app';

// COMMON COMPONENTS
import Header from 'components/layout/header';
import Sidebar from 'components/layout/sidebar';
import ModalPortal from 'components/layout/modal-portal';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            modalPortalDisplayed: false,
            sideBarOpened: false
        };
    }

    getChildContext() {
        return {
            location: _.get(this.props, 'location.pathname', '').replace('/', ''),
            sideBarOpened: this.state.sideBarOpened,
            toggleSideBar: this.toggleSideBar
        };
    }

    render() {
        return (
            <div className="app">
                <FirebaseApp>
                    <ModalPortal>
                        <Header />
                        <Sidebar />
                        <div className={this.getContainerClass()}>
                            {this.props.children}
                        </div>
                    </ModalPortal>
                </FirebaseApp>
            </div>
        );
    }

    getContainerClass() {
        return classNames({
            'app--main-content': true,
            'app--main-content_slide': this.state.sideBarOpened
        });
    }

    toggleSideBar = () => {
        this.setState({
            sideBarOpened: !this.state.sideBarOpened
        });
    }
}

App.childContextTypes = {
    location: React.PropTypes.string,
    sideBarOpened: React.PropTypes.bool,
    toggleSideBar: React.PropTypes.func
};

export default App;
