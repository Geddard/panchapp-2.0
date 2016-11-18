// VENDOR LIBS
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import _isEqual from 'lodash/isEqual';

// LIBS
import { instance as firebaseStore } from 'lib/firebase-store';
import firebaseServiceCaller from 'lib/firebase-service-caller';

// LAYOUT COMPONENTS
import Loading from 'components/layout/loading';

// COMMON COMPONENTS
import Button from 'components/common/button';

class AddCardModal extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            otherInputValue: '',
            reasonListOpened: false,
            reasonSelected: '',
            userListOpened: false,
            users: firebaseStore.getUsers(),
            userSelected: ''
        };

        firebaseStore.addChangeListener(this.firebaseStoreChanged);
    }

    componentWillUnmount() {
        firebaseStore.removeChangeListener(this.firebaseStoreChanged);
    }

    render() {
        return (this.state.loading) ? <Loading loading /> : this.renderContent();
    }

    renderContent() {
        return (
            <div className="add-card-modal">
                {this.renderTitle()}
                {this.renderPicker('user')}
                {this.renderPicker('reason')}
                {this.renderSubmitButton()}
            </div>
        );
    }

    renderTitle() {
        return (
            <div className="add-card-modal--title">
                Add New Card
            </div>
        );
    }

    renderPicker(type) {
        var contentToRender;
        var types = {
            reason: 'Reason',
            user: 'User'
        };
        var typeSelected = this.state[type + 'Selected'] || 'Pick ' + types[type];

        if (this.state[type + 'ListOpened']) {
            contentToRender = this.renderList(type);
        } else {
            contentToRender = (
                <span onClick={() => this.openList(type)} className={this.getPickerClass(type)}>
                    {typeSelected}
                </span>
            );
        }

        return contentToRender;
    }

    renderSubmitButton() {
        var props = {
            className: this.getSubmitButtonClass(),
            onClick: this.handleSubmitButtonClick,
            type: 'submit'
        };

        return (
            <Button {...props}>
                <img className="add-card-modal--paper-plane" src={'resources/paper-plane.png'} />
            </Button>
        );
    }

    renderList(type) {
        var contentToRender = null;
        var reasons = [
            'Panched',
            'Panch Failure',
            'Garbage',
            'Phone rings in a meeting',
            'New member',
            'Birthday',
            'Other...'
        ];
        var array = (type === 'user') ? this.state.users : reasons;

        if (this.state.renderOtherInput && type === 'reason') {
            contentToRender = (
                <input {...this.getInputProps()} />
            );
        } else {
            contentToRender = array.map((item, index) => this.renderItem(type, item, index));
        }

        return <span className="add-card-modal--list">{contentToRender}</span>;
    }

    renderItem = (type, item, index) => {
        var text = (type === 'user') ? item.displayName : item;
        var props = {
            className: 'add-card-modal--list-item',
            key: index,
            onClick: () => this.handleItemClick(text, type)
        };

        return <div {...props}>{text}</div>;
    }

    getPickerClass(type) {
        return classNames({
            'add-card-modal--picker': true,
            'add-card-modal--picker_item-selected': !this.state[type + 'ListOpened'] && this.state[type + 'Selected'],
        });
    }

    getInputProps() {
        return {
            className: 'add-card-modal--other-reason',
            maxLength: 30,
            onChange: this.updateFieldValue,
            placeholder: 'Why...?',
            type: 'text'
        };
    }

    getSubmitButtonClass() {
        return classNames({
            'add-card-modal--submit': true,
            'add-card-modal--submit_displayed': this.shouldRenderButton(),
        });
    }

    handleSubmitButtonClick = () => {
        var state = this.state;

        if (state.userSelected !== 'Pick User' && (state.reasonSelected || state.otherInputValue)) {
            this.setState({
                loading: true
            });
            firebaseServiceCaller.update('cards', {
                cat: state.reasonSelected || state.otherInputValue,
                date: moment().utcOffset('-03:00').format('MM/DD/YYYY, HH:mm'),
                name: state.userSelected
            }, this.context.toggleModalPortal);
        }
    }

    handleItemClick = (text, type) => {
        if (type === 'reason' && text.indexOf('Other') !== -1) {
            this.setState({
                renderOtherInput: true
            });
        } else {
            this.setItemSelected(text, type);
        }
    }

    setItemSelected(text, type) {
        var newState = {};

        newState[type + 'ListOpened'] = false;
        newState[type + 'Selected'] = text;

        this.setState(newState);
    }

    openList = (type) => {
        var newState = {};

        newState[type + 'ListOpened'] = true;
        this.setState(newState);
    }

    updateFieldValue = (event) => {
        this.setState({
            otherInputValue: event.target.value
        });
    }

    shouldRenderButton() {
        return (this.state.userSelected && (this.state.reasonSelected || this.state.otherInputValue));
    }

    firebaseStoreChanged = () => {
        var users = firebaseStore.getUsers();

        if (!_isEqual(users, this.state.users)) {
            this.setState({users: users});
        }
    }
}

AddCardModal.contextTypes = {
    toggleModalPortal: React.PropTypes.func
};

export default AddCardModal;

