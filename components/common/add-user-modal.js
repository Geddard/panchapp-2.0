// VENDOR LIBS
import React from 'react';
import classNames from 'classnames';

// LIBS
import firebaseServiceCaller from 'lib/firebase-service-caller';

// LAYOUT COMPONENTS
import Loading from 'components/layout/loading';

// COMMON COMPONENTS
import Button from 'components/common/button';

class AddUserModal extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            newUserName: ''
        };
        this.getSubmitButtonClass.bind(this);
    }

    render() {
        return (this.state.loading) ? <Loading loading /> : this.renderContent();
    }

    renderContent() {
        return (
            <div className="add-user-modal">
                <input {...this.getInputProps()} />
                {this.renderSubmitButton()}
            </div>
        );
    }

    renderSubmitButton() {
        var props = {
            className: this.getSubmitButtonClass(),
            onClick: this.handleSubmitButtonClick.bind(this),
            type: 'submit'
        };

        return (
            <Button {...props}>
                <img className="add-card-modal--paper-plane" src={'resources/paper-plane.png'} />
            </Button>
        );
    }

    getInputProps() {
        return {
            className: 'add-user-modal--input',
            maxLength: 30,
            onChange: this.updateFieldValue.bind(this),
            placeholder: 'New user\'s name',
            type: 'text'
        };
    }

    getSubmitButtonClass() {
        return classNames({
            'add-user-modal--submit': true,
            'add-user-modal--submit_displayed': (this.state.newUserName.length > 1),
        });
    }

    handleSubmitButtonClick() {
        var state = this.state;

        if (state.newUserName.length > 1) {
            this.setState({
                loading: true
            });
            firebaseServiceCaller.update('users', {
                displayName: state.newUserName
            }, this.context.toggleModalPortal);
        }
    }

    updateFieldValue(event) {
        this.setState({
            newUserName: event.target.value
        });
    }
}

AddUserModal.contextTypes = {
    toggleModalPortal: React.PropTypes.func
};

export default AddUserModal;
