// VENDOR LIBS
import React from 'react';
import classNames from 'classnames';

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
            onClick: () => this.openModal(type),
            className: 'header-button',
            type: 'add'
        };
    }

    openModal = (type) => {
        var modalToOpen = ('cards' === type) ? <AddCardModal /> : <AddUserModal />;

        this.context.toggleModalPortal(modalToOpen);
    }
}

Header.contextTypes = {
    location: React.PropTypes.string,
    sideBarOpened: React.PropTypes.bool,
    toggleModalPortal: React.PropTypes.func
};

export default Header;
