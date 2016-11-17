// VENDOR
import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

// LIBS
import firebaseServiceCaller from 'lib/firebase-service-caller';

class User extends React.Component {

    render() {
        return (
            <div className="user">
                <div className="user--name">{this.props.displayName}</div>
                <img {...this.getImgProps('pencil')} />
                <img {...this.getImgProps('bin')} />
            </div>
        );
    }

    getImgProps(type) {
        var classes = classNames({
            'user--icon': true,
            'user--icon-pencil' : type === 'pencil',
            'user--icon-bin' : type === 'bin'
        });

        var onClick = {
            'bin': this.removeUser
        };

        return {
            className: classes,
            onClick: onClick[type],
            src: 'resources/' + type + '.png'
        };
    }

    removeUser = () => {
        var conf = confirm('Remove user?');

        if (!_.isEmpty(this.props) && conf) {
            firebaseServiceCaller.delete('users', this.props);
        }
    }
}

User.propTypes = {
    displayName: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
};

export default User;

