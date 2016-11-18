// VENDOR
import _values from 'lodash/values';
import _reverse from 'lodash/reverse';

// LIBS
import firebaseStore from 'lib/firebase-store';

class LoadLogsCommand {

    constructor(logs) {
        this.logs = logs;
    }

    execute(dataStore) {
        var values;

        if (dataStore instanceof firebaseStore) {
            values = _values(this.logs);
            dataStore.setLogs(_reverse(values, 'date'));
        }
    }
}

export default LoadLogsCommand;
