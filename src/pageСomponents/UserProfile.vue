<template>
	<div id="userProfile">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div v-if="!user.name" class="mt-5 text-center h4">User is not found</div>
					<div class="mt-3 text-secondary h5"><router-link to="/">< Back to all users</router-link></div>
					<div v-if="user && user.name" class="userProfile__wrapper">
						<div class="userProfile__img"><UserImage size="large" v-if="user.picture" :imageUrl="user.picture" /></div>
						<div class="d-flex userProfile__info">
							<div class="mr-4 h5 text-secondary userProfile__info_items">
								<div>First name:</div>
								<div>Last name:</div>
								<div>Phone:</div>
								<div class="d-none d-sm-block">Email:</div>
								<div>Age:</div>
								<div>Date of Birth:</div>
							</div>
							<div class="ml-2 h5 userProfile__info_items">
								<div><span v-if="user.name && user.name.first">{{user.name.first}}</span><span v-else>—</span></div>
								<div><span v-if="user.name && user.name.last">{{user.name.last}}</span><span v-else>—</span></div>
								<div><span v-if="user.phone">{{user.phone}}</span><span v-else>—</span></div>
								<div class="d-none d-sm-block"><span v-if="user.email">{{user.email}}</span><span v-else>—</span></div>
								<div><span v-if="user.dob">{{user.dob.age}}</span><span v-else>—</span></div>
								<div><span v-if="user.dob">{{getBirthday(user.dob.date)}}</span><span v-else>—</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UserImage from '@/components/UserImage.vue';
	import moment from 'moment';

	export default {
		name: 'UserProfile',
		props: {
			id: {
				type: String,
				required: true
			}
		},
		data: () => ({
			user: {}
		}),
		components: {
			UserImage
		},
		mounted() {
			this.user = this.$store.getters.USER_BY_ID(this.id);
		},
		methods: {
			getBirthday(dob) {
				return moment(dob).format('DD.MM.YYYY');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userProfile{
		&__wrapper{
			padding: 50px 30px;
			margin-top: 50px;
			border: 1px solid #ccc;
			border-radius: 5px;
			display: flex;
			flex-direction: row;
		}
		&__info{
			margin-left: 80px;
			&_items{
				div{
					margin-top: 19px;
					&:nth-child(1){
						margin-top: 0;
					}
				}
			}
		}
	}
	@media(max-width: 767px) {
		.userProfile{
			&__wrapper{
				padding: 40px 15px;
				flex-direction: column;
			}
			&__info{
				margin-left: 0;
				margin-top: 20px;
				&_items{
					font-size: 16px;
					white-space: nowrap;
					div{
						margin-top: 19px;
						&:nth-child(1){
							margin-top: 0;
						}
					}
				}
			}
		}
	}
</style>
