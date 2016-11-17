// VENDOR
import _ from 'lodash';

// LIBS
import firebaseStore from 'lib/firebase-store';

class LoadCardsCommand {

    constructor(cards) {
        this.cards = cards;
    }

    execute(dataStore) {
        if (dataStore instanceof firebaseStore) {
            _.each(this.cards, function(value, key) {
                value.id = key;
            });

            dataStore.setCards(_.sortBy(this.cards, 'displayName'));
        }
    }
}

export default LoadCardsCommand;
