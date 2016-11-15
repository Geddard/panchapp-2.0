// VENDOR LIBS
import React from 'react';
import classNames from 'classnames';
import zenscroll from 'zenscroll';

// COMMON COMPONENTS
import Button from 'components/common/button';
import AddCardModal from 'components/common/add-card-modal';
import AddUserModal from 'components/common/add-user-modal';

class Header extends React.Component {

    render() {
        return (
            <div className={this.getClass()}>
                {this.renderTitle()}
                {this.renderAddButton()}
            </div>
        );
    }

    renderTitle() {
        return <div className="header--title">PanchApp 2.0</div>;
    }

    renderAddButton() {
        //TODO: Fix this to work with each page
        var buttonToRender = null;
        var location = this.context.location;

        if (location === 'cards' || !location)  {
            buttonToRender = <Button {...this.getButtonProps('cards')}>+</Button>;
        } else if (location === 'users') {
            buttonToRender = <Button {...this.getButtonProps('users')}>+</Button>;
        }

        return buttonToRender;
    }

    getClass() {
        return classNames({
            'header': true,
            'header_slide': this.context.sideBarOpened
        });
    }

    getButtonProps(type) {
        return {
            onClick: this.openModal.bind(this, type),
            className: 'header-button',
            type: 'add'
        };
    }

    openModal(type) {
        var modalTypes = {
            'cards': {
                callback: this.scrollPage,
                jsx: <AddCardModal />
            },
            'users': {
                callback: null,
                jsx: <AddUserModal />
            }
        };

        this.context.toggleModalPortal(
            modalTypes[type].jsx,
            modalTypes[type].callback
        );
    }

    scrollPage(success) {
        // TODO: maybe scroll to the card when added using actions?
        if (success) {
            zenscroll.toY(document.documentElement.scrollHeight);
        }
    }
}

Header.contextTypes = {
    location: React.PropTypes.string,
    sideBarOpened: React.PropTypes.bool,
    toggleModalPortal: React.PropTypes.func
};

export default Header;
