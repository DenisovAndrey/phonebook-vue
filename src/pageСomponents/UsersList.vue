<template>
	<div id="usersList">
		<div class="container pt-4">
			<div class="row">
				<div class="col-12">
					<div class="text-center h3 mb-2">Phonebook</div>
					<div v-if="allUsers.length > 0 && !isLoading">
						<SortUsers @usersSorted="getSortedUsers" :users="allUsers" />
						<input type="text" class="form-control mb-3" v-model="searchString" placeholder="Search users">
						<UsersTable :users="users" />
					</div>
					<div class="mt-5 text-center h4" v-if="isLoading">Loading. Please await.</div>
					<div class="mt-5 text-center h4" v-if="!isLoading && (!allUsers || allUsers.length === 0)">Sorry, users is not found :(<br>
						<button @click="getUsersByServer" class="btn btn-primary mt-4">Try again!</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import providers from '@/providers/index.js'
	import UsersTable from '@/components/UsersTable.vue'
	import SortUsers from '@/components/SortUsers.vue'

	export default {
		name: 'UsersList',
		data: () => ({
			sortedUsers: [],
			searchString: '',
			isLoading: false
		}),
		components: {
			UsersTable,
			SortUsers
		},
		mounted(){
			this.getUsersByServer();
		},
		computed: {
			allUsers() {
				return this.$store.getters.USERS;
			},
			users() {
				const users = this.sortedUsers.filter(user => {
					if (user.name.first.toLowerCase().indexOf(this.searchString) != -1) {
						return true;
					} else if (user.name.last.toLowerCase().indexOf(this.searchString) != -1) {
						return true;
					};
				});
				return users;
			}
		},
		methods: {
			getUsersByServer() {
				this.isLoading = true;
				providers.getUser().then(
					data => {
						this.$store.dispatch('SET_USERS', data.results);
						this.isLoading = false;
					},
					error => {
						console.error(error);
						this.isLoading = false;
					}
				);
			},
			getSortedUsers(users){
				this.sortedUsers = users;
			}
		}
	}
</script>

<style>
</style>
