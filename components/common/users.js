// VENDOR LIBS
import React from 'react';

// LIBS
import { instance as firebaseStore } from 'lib/firebase-store';

// LAYOUT COMPONENTS
import Loading from 'components/layout/loading';

// COMMON COMPONENTS
import User from 'components/common/user';
import RenderWithDelay from 'components/common/render-with-delay';

class Users extends React.Component {

    constructor() {
        super();

        this.state = {
            users: firebaseStore.getUsers()
        };
        firebaseStore.addChangeListener(this.loadUsers);
    }

    componentWillUnmount() {
        firebaseStore.removeChangeListener(this.loadUsers);
    }

    render() {
        return (
            <div className="users">
                <Loading loading={!this.state.users.length}>
                    <div className="users--grid">
                        {this.state.users.map(this.renderUser)}
                    </div>
                </Loading>
            </div>
        );
    }

    renderUser = (user, index) => {
        return (
            <RenderWithDelay {...this.getRenderWithDelayProps(index, user)}>
                <User {...user} />
            </RenderWithDelay>
        );
    }

    getRenderWithDelayProps(index, user) {
        return {
            className: 'users--grid-item',
            animation: 'drop',
            key: index + user.displayName,
            wait: index * 50
        };
    }

    loadUsers = () => {
        this.setState({
            users: firebaseStore.getUsers()
        });
    }
}

export default Users;
