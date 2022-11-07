// This script extracts the ID of the authenticating user, so you do not have to pass it yourself.
if (!pm.environment.get('access_token') || !pm.request.url.path.includes(':id')) {
    return;
}

const [userId] = pm.environment.get('access_token').split('-');

if (!userId) {
    return;
}

const userIdIndex = pm.request.url.path.indexOf(':id');
pm.request.url.path[userIdIndex] = userId;