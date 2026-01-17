import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const seedUsers = async () => {
    try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);

        if (snapshot.empty) {
            console.warn("No users found to seed.");
            return;
        }

        const updates = snapshot.docs.map(async (userDoc) => {
            const data = userDoc.data();
            const updates: any = {};

            // Ensure firstName and lastName exist
            if (!updatedUser.firstName || !updatedUser.lastName) {
                if (data.name) {
                    const parts = data.name.split(' ');
                    updatedUser.firstName = parts[0] || 'Student';
                    updatedUser.lastName = parts.slice(1).join(' ') || 'Name';
                } else if (!updatedUser.firstName) {
                    updatedUser.firstName = 'Student';
                } else if (!updatedUser.lastName) {
                    updatedUser.lastName = 'Name';
                }
            }

            // Remove legacy 'name' field if we want to clean up, but for now we won't delete data
            // Just ensuring firstName/lastName are populated.

            // Default Status
            if (!data.status) {
                updates.status = 'Active';
            }

            // Default Dates (formatted string strictly for display as per current setup)
            // ideally we use Timestamps, but keeping it simple for string compatibility first
            if (!data.dateJoined) {
                updates.dateJoined = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            }

            if (!data.expirationDate) {
                updates.expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            }

            // Default Role
            if (!data.role) {
                updates.role = 'Student';
            }

            // Only update if changes are needed
            if (Object.keys(updates).length > 0) {
                console.log(`Seeding user ${userDoc.id}...`, updates);
                await updateDoc(doc(db, 'users', userDoc.id), updates);
            }
        });

        await Promise.all(updates);
        console.log("Seeding complete!");
        alert("Data seeding completed successfully!");
    } catch (error) {
        console.error("Error seeding users:", error);
        alert("Error seeding data. Check console.");
    }
};
