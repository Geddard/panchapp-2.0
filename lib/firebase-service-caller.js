// VENDOR
import moment from 'moment';

// LIBS
import { refs } from 'lib/firebase-app';

export default {

    update(app, config, callback) {
        refs[app].push(config, callback);
    },

    delete(app, data, res) {
        refs[app].child(data.id).remove(this.handleDone.bind(this, data, res));
    },

    handleDone(data, res) {
        if (res) {
            refs['logs'].push({
                type: 'Removing card - ' + res,
                entry: 'Victim: ' + data.name,
                reason: data.cat,
                date: moment().utcOffset('-03:00').format('MM/DD/YYYY, HH:mm')
            });
        }
    }
};
