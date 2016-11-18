// VENDOR LIBS
import React from 'react';

// ACTIONS
import firebaseActions from 'lib/actions/firebase-actions.js';

// LIBS
import firebaseConfig from 'lib/config/firebase-config';

var firebaseRefs = {};

class FirebaseApp extends React.Component {

    constructor() {
        var appRef;
        var initialState = {};

        super();
        this.apps = [
            {
                appName: 'cards'
            },
            {
                appName: 'users'
            },
            {
                appName: 'logs'
            }
        ];
        this.apps.forEach(function (app, index) {
            appRef = (!index) ? undefined : app.appName;
            initialState[app.appName + 'FirebaseRef'] =
                firebaseConfig.initializeApp(app.appName, appRef).database().ref();
            firebaseRefs[app.appName] = initialState[app.appName + 'FirebaseRef'];
        });
        this.state = initialState;
    }

    componentWillMount() {
        this.addFirebaseListeners();
    }

    componentWillUnmount() {
        this.removeFirebaseListeners();
    }

    render() {
        return (
            <div className="firebase-app">
                {this.props.children}
            </div>
        );
    }

    addFirebaseListeners() {
        this.apps.forEach(function (app) {
            this.state[app.appName + 'FirebaseRef'].on(
                'value',
                (snapshot) => this.handleDone(app.appName, snapshot),
                this.handleError
            );
        }, this);
    }

    removeFirebaseListeners() {
        this.apps.forEach(function (app) {
            this.state[app.appName + 'FirebaseRef'].off(
                'value',
                (snapshot) => this.handleDone(app.appName, snapshot),
                this.handleError
            );
        }, this);
    }

    handleDone = (appName, snapshot) => {
        var appTypes = {
            'cards': firebaseActions.loadCards,
            'users': firebaseActions.loadUsers,
            'logs': firebaseActions.loadLogs
        };

        if (appTypes[appName] && snapshot.exists()) {
            appTypes[appName](snapshot.val());
        }
    }

    handleError(error) {
        firebaseActions.setError(error);
    }
}

export default FirebaseApp;
export var refs = firebaseRefs;
