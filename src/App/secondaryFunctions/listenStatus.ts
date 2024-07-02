import { auth, database } from "../../main"
import { onDisconnect, onValue, ref, set } from "firebase/database"

export const listenStatus = () => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const userStatusDatabaseRef = ref(database, '/users/' + user.uid)

            const isOfflineForDatabase = {
                state: 'offline',
                last_changed: Date.now(),
            };

            const isOnlineForDatabase = {
                state: 'online',
                last_changed: Date.now(),
            };

            onValue(ref(database, '.info/connected'), () => {
                onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
                    set(userStatusDatabaseRef, isOnlineForDatabase)
                })
            })
        }
    })
}