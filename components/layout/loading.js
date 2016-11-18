// VENDOR LIBS
import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

// LIBS
import { instance as firebaseStore } from 'lib/firebase-store';

class Loading extends React.Component {

    constructor() {
        super();
        this.state = {
            error: false
        };
        firebaseStore.addChangeListener(this.setErrorMessage);
    }

    componentWillUnmount() {
        firebaseStore.removeChangeListener(this.setErrorMessage);
    }

    render() {
        return (
            <div className={this.getClass()}>
                {this.renderLoading()}
            </div>
        );
    }

    renderLoading = () => {
        var dataToRender = null;

        if (!this.state.error && this.props.loading) {
            dataToRender = (
                <div className="loading--animation-container">
                    <span className="loading--animation-item"></span>
                    <span className="loading--animation-item"></span>
                    <span className="loading--animation-item"></span>
                    <span className="loading--animation-item"></span>
                </div>
            );
        } else if (this.state.error) {
            dataToRender = <div className="loading--error">Something went wrong... Please try reloading</div>;
        } else {
            dataToRender = this.props.children;
        }

        return dataToRender;
    }

    getClass() {
        return classNames({
            'loading': true,
            'loading_spinner': !this.state.error && this.props.loading
        });
    }

    setErrorMessage = () => {
        if (!_isEmpty(firebaseStore.getError())) {
            this.setState({
                error: true
            });
        }
    }
}

Loading.propTypes = {loading: React.PropTypes.bool.isRequired};

export default Loading;
