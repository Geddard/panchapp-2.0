// VENDOR LIBS
import React from 'react';
import classNames from 'classnames';
import _isFunction from 'lodash/isFunction';

class ModalPortal extends React.Component {

    constructor() {
        super();
        this.state = {
            modalToDisplay: null,
            portalDisplayed: false
        };
    }

    getChildContext() {
        return {
            modalPortalDisplayed: this.state.modalPortalDisplayed,
            toggleModalPortal: this.toggleModalPortal
        };
    }

    render() {
        return (
            <div className="modal-portal">
                {this.renderPortal()}
                <div className={this.getBehindContentClass()}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    renderPortal() {
        var portal = null;

        if (this.state.modalPortalDisplayed) {
            portal = (
                <div className={this.getClass()}>
                    <div onClick={this.toggleModalPortal} className="modal-portal--layer-background" />
                    <div className="modal-portal--layer-content modal-portal--layer-content_displayed">
                        {this.state.modalToDisplay}
                    </div>
                </div>
            );
        }

        return portal;
    }

    getClass() {
        return classNames({
            'modal-portal--layer': true,
            'modal-portal--layer_displayed': this.state.modalPortalDisplayed
        });
    }

    getBehindContentClass() {
        return classNames({
            'modal-portal-behind-content': true,
            'modal-portal-behind-content_blured': this.state.modalPortalDisplayed
        });
    }

    toggleModalPortal = (modalToDisplay, callback) => {
        var newState = {};

        newState.modalPortalDisplayed = !this.state.modalPortalDisplayed;

        if (modalToDisplay) {
            newState.closeCallback = callback;
            newState.modalToDisplay = modalToDisplay;
        }

        this.setState(newState, this.executeCallback);
    }

    executeCallback() {
        if (!this.state.modalPortalDisplayed && _isFunction(this.state.closeCallback)) {
            // TODO: Determine success using store listener
            this.state.closeCallback(false);
        }
    }
}

ModalPortal.propTypes = {
    modalToDisplay: React.PropTypes.node
};

ModalPortal.childContextTypes = {
    modalPortalDisplayed: React.PropTypes.bool,
    toggleModalPortal: React.PropTypes.func
};

export default ModalPortal;

