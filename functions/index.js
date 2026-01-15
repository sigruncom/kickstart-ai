const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Cloud Function for admins to manage user roles and status.
 * Expects: { targetUserId: string, updates: { role?: string, status?: string } }
 */
exports.manageUserRole = functions.https.onCall(async (data, context) => {
    // 1. Check if caller is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "The function must be called while authenticated."
        );
    }

    const callerUid = context.auth.uid;

    // 2. Check if caller is admin
    // We read the caller's document from Firestore to check their role
    const callerDoc = await admin.firestore().collection("users").doc(callerUid).get();

    if (!callerDoc.exists || callerDoc.data().role !== "admin") {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Only admins can manage users."
        );
    }

    const { targetUserId, updates } = data;

    if (!targetUserId || !updates) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "targetUserId and updates are required."
        );
    }

    // Validate updates
    const allowedFields = ["role", "status"];
    const updateData = {};

    for (const key of Object.keys(updates)) {
        if (allowedFields.includes(key)) {
            updateData[key] = updates[key];
        }
    }

    if (Object.keys(updateData).length === 0) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "No valid fields to update."
        );
    }

    // 3. Update the target user's document
    await admin.firestore().collection("users").doc(targetUserId).set(updateData, { merge: true });

    return { message: "User updated successfully." };
});

/**
 * Blocking function that runs before a user signs in.
 * Checks if the user's status is 'inactive'.
 */
exports.beforeSignIn = functions.auth.user().beforeSignIn(async (user) => {
    const userDoc = await admin.firestore().collection("users").doc(user.uid).get();

    if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData.status === "inactive") {
            throw new functions.https.HttpsError(
                "permission-denied",
                "Your account is inactive. Please contact support."
            );
        }
    }
    // If doc doesn't exist or status is not inactive, allow sign in.
});

