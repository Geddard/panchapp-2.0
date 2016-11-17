// VENDOR
import _ from 'lodash';

// LIBS
import firebaseStore from 'lib/firebase-store';

class LoadUsersCommand {

    constructor(users) {
        this.users = users;
    }

    execute(dataStore) {
        if (dataStore instanceof firebaseStore) {
            _.each(this.users, function(value, key) {
                value.id = key;
            });

            dataStore.setUsers(_.sortBy(this.users, [user => user.displayName.toLowerCase()]));
        }
    }
}

export default LoadUsersCommand;
