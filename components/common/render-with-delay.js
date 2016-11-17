// VENDOR
import React from 'react';
import classNames from 'classnames';

class RenderWithDelay extends React.Component {

     constructor(props) {
        super();

        this.state = {
            hidden: true
        };
        this.timeout = props.wait;

        setTimeout(() => {
            this.show();
        }, props.wait);
    }

    componentWillUnmount() {
        this.timeout = null;
    }

    render() {
        return (
            <div className={this.getClass()}>
                {this.props.children}
            </div>
        );
    }

    getClass() {
        return classNames({
            'render-with-delay': true,
            'render-with-delay_displayed': !this.state.hidden,
        },
        this.getAnimationTypeClass(),
        this.props.className);
    }

    getAnimationTypeClass = () => {
        var animationType = this.props.animation;
        var hidden = this.state.hidden;

        return classNames({
            'render-with-delay_slide-fade': !hidden && (animationType === 'slide-fade'),
            'render-with-delay_drop': !hidden && (animationType === 'drop'),
            'render-with-delay_typewrite': !hidden && (animationType === 'typewrite')
        });
    }

    show() {
        if (this.timeout !== null) {
            this.setState({hidden: false});
        }
    }
}

RenderWithDelay.propTypes = {
    animation: React.PropTypes.oneOf(['drop', 'slide-fade', 'typewrite']),
    wait: React.PropTypes.number
};

export default RenderWithDelay;
