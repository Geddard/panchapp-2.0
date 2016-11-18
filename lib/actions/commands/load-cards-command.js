// VENDOR
import _each from 'lodash/each';
import _sortBy from 'lodash/sortBy';

// LIBS
import firebaseStore from 'lib/firebase-store';

class LoadCardsCommand {

    constructor(cards) {
        this.cards = cards;
    }

    execute(dataStore) {
        if (dataStore instanceof firebaseStore) {
            _each(this.cards, function(value, key) {
                value.id = key;
            });

            dataStore.setCards(_sortBy(this.cards, [card => card.date]));
        }
    }
}

export default LoadCardsCommand;
