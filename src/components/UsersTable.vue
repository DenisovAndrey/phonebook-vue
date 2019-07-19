<template>
	<div class="usersTable" id="usersTable">
		<table class="table table-striped">
			<thead>
				<tr>
					<th class="hide-on-mobile" scope="col">Photo</th>
					<th scope="col">First name</th>
					<th scope="col">Last name</th>
					<th class="hide-on-mobile" scope="col">Date of Birth</th>
				</tr>
			</thead>
			<tbody v-if="users.length > 0">
				<tr v-for="(user, index) of users" :key="index">
					<td class="hide-on-mobile"><UserImage v-if="user.picture" :imageUrl="user.picture" /></td>
					<router-link tag="td" :to="`user/${user.id.value}`"><span v-if="user.name">{{user.name.first}}</span></router-link>
					<router-link tag="td" :to="`user/${user.id.value}`"><span v-if="user.name">{{user.name.last}}</span></router-link>
					<router-link class="hide-on-mobile" tag="td" :to="`user/${user.id.value}`"><span v-if="user.dob">{{getBirthday(user.dob.date)}}</span></router-link>
				</tr>
			</tbody>
		</table>
		<div v-if="users.length === 0" class="text-center h5">Users is not found</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import UserImage from './UserImage.vue';

	export default {
		name: 'UsersTable',
		props: {
			users: {
				required: true,
				type: Array
			}
		},
		components: {
			UserImage
		},
		mounted() {
		},
		methods: {
			getBirthday(dob) {
				return moment(dob).format('DD.MM.YYYY');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.usersTable{
		tr{
			cursor: pointer;
		}
		td{
			vertical-align: baseline;
		}
	}
	@media(max-width: 575px) {
		.hide-on-mobile{
			display: none;
		}
	}
</style>
