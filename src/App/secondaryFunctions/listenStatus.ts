import { doc, updateDoc } from "firebase/firestore"
import { auth, database, firestore } from "../../main"
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

            onValue(ref(database, '.info/connected'), (snapshot) => {
                onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
                    set(userStatusDatabaseRef, isOnlineForDatabase)
                })
            })
        }
    })
}