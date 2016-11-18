// VENDOR
import _each from 'lodash/each';
import _sortBy from 'lodash/sortBy';

// LIBS
import firebaseStore from 'lib/firebase-store';

class LoadUsersCommand {

    constructor(users) {
        this.users = users;
    }

    execute(dataStore) {
        if (dataStore instanceof firebaseStore) {
            _each(this.users, function(value, key) {
                value.id = key;
            });

            dataStore.setUsers(_sortBy(this.users, [user => user.displayName.toLowerCase()]));
        }
    }
}

export default LoadUsersCommand;
