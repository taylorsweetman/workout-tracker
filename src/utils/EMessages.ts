let emap = new Map<string, string>();
emap.set('DUP_USER', 'User has previously registered');
emap.set(
	'BAD_NAME',
	'Exercise names can only contain letters, numbers, underscores, and spaces'
);
emap.set('DUP_NAME', 'Each exercise needs a unique name');
emap.set('BAD_REP', 'Only whole, positive numbers');
emap.set('BAD_STATE', 'Something went wrong, try refreshing the page');

const prepMsg = (eMsg: string): string => {
    if (!eMsg) {
        return '';
    }

    const parts = eMsg.split(':');
    const code = parts[0];
    return emap.get(code) || '';
};

export { emap, prepMsg };
