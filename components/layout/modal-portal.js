// VENDOR LIBS
import _isEmpty from 'lodash/isEmpty';
import _isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import React from 'react';

class ModalPortal extends React.Component {

    constructor() {
        super();
        this.state = {
            modalToDisplay: null,
            portalDisplayed: false,
            preventCloseOnClick: false
        };
    }

    getChildContext() {
        return {
            modalPortalDisplayed: this.state.modalPortalDisplayed,
            preventCloseOnClick: this.preventCloseOnClick,
            toggleModalPortal: this.toggleModalPortal
        };
    }

    componentWillUpdate() {
        if (this.state.preventCloseOnClick) {
            this.setState({
                preventCloseOnClick: false
            });
        }
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

        if (!this.state.preventCloseOnClick || !modalToDisplay) {
            newState.modalPortalDisplayed = !this.state.modalPortalDisplayed;

            if (modalToDisplay) {
                newState.modalToDisplay = modalToDisplay;
            }

            if (_isFunction(callback)) {
                newState.closeCallback = callback;
            }
        }

        if (!_isEmpty(newState)) {
            this.setState(newState, this.executeCallback);
        }
    }

    executeCallback() {
        if (!this.state.modalPortalDisplayed && _isFunction(this.state.closeCallback)) {
            this.state.closeCallback();
        }
    }

    preventCloseOnClick = () => {
        this.setState({
            preventCloseOnClick: true
        });
    }
}

ModalPortal.propTypes = {
    modalToDisplay: React.PropTypes.node
};

ModalPortal.childContextTypes = {
    modalPortalDisplayed: React.PropTypes.bool,
    preventCloseOnClick: React.PropTypes.func,
    toggleModalPortal: React.PropTypes.func
};

export default ModalPortal;

