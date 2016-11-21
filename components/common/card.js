// VENDOR LIBS
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

// LIBS
import firebaseServiceCaller from 'lib/firebase-service-caller';

// COMMON COMPONENTS
import Button from 'components/common/button';

class Card extends React.Component {

    constructor() {
        super();

        this.state = {
            hidden: true
        };
    }

    render() {
        return (
            <div id={this.props.id} className={this.getClass()}>
                <Button {...this.getButtonProps()}>✖</Button>
                <div className="card--info">
                    <div className="card--name">{this.props.name}</div>
                    <div className="card--info-label">Reason</div>
                    <div className="card--category">{this.props.cat}</div>
                    <div className="card--info-label">Date</div>
                    <div className={this.getDateClass()}>
                        {moment(this.props.date, 'MM/DD/YYYY, HH:mm').format('DD MMM YYYY, HH:mm')}
                    </div>
                </div>
            </div>
        );
    }

    getClass = () => {
        return classNames({
            'card': true,
            'card_really-old': this.isReallyOld()
        });
    }

    getButtonProps() {
        return {
            className: 'card--button',
            onClick: this.removeCard,
            type: 'pay'
        };
    }

    getDateClass() {
        return classNames({
            'card--date': true,
            'card--date_really-old': this.isReallyOld(),
        });
    }

    isReallyOld() {
        return moment(this.props.date, 'MM/DD/YYYY, HH:mm').isBefore(moment().subtract(5, 'weeks'));
    }

    removeCard = () => {
        var promptResponse = prompt('Why are you removing this card?', 'Payed');

        if (!_isEmpty(this.props) && promptResponse) {
            firebaseServiceCaller.delete('cards', this.props, promptResponse);
        }
    }
}

Card.propTypes = {
    cat: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
};

export default Card;
