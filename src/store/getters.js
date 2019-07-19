export const USERS = state => state.users;

export const USER_BY_ID = state => id => {
	return state.users.find(user => user.id.value === id);
};