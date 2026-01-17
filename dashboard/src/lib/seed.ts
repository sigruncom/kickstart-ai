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

            // Derived full name
            if (!data.name) {
                const firstName = data.firstName || 'Student';
                const lastName = data.lastName || 'Name';
                updates.name = `${firstName} ${lastName}`.trim();
            }

            // Default Status
            if (!data.status) {
                updates.status = 'Active';
            }

            // Default Dates (formatted string strictly for display as per current setup)
            // ideally we use Timestamps, but keeping it simple for string compatibility first
            if (!data.dateJoined) {
                updates.dateJoined = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            }

            if (!data.expirationDate) {
                const nextMonth = new Date();
                nextMonth.setDate(nextMonth.getDate() + 30);
                updates.expirationDate = nextMonth.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
