<template>
	<div class="sortUsers" id="sortUsers">
		<div>
			<div>
				<span class="sortUsers__title">Sort by:</span>
				<button class="sortUsers__btn mr-2" @click="changeSortType('name')">name
					<span v-show="sort.type === 'name'" class="sortUsers__btn-arrow" :class="{ 'sortUsers__btn-arrow-asc': !sort.desc }">></span>
				</button>
				<button class="sortUsers__btn" @click="changeSortType('age')">age
					<span v-show="sort.type === 'age'" class="sortUsers__btn-arrow" :class="{ 'sortUsers__btn-arrow-asc': !sort.desc }">></span>
				</button>
			</div>
			<div class="sortUsers__agerange mt-4">
				<div>Range of age</div>
				<vue-slider 
					@drag-end="sortUsers"
					:tooltip-placement="'bottom'" 
					:dot-options="[{tooltip: 'always'}, {tooltip: 'always'}]" 
					:max="90" :min="18" 
					v-model="valueAge" 
					:enable-cross="false" />
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import VueSlider from 'vue-slider-component';
	import 'vue-slider-component/theme/default.css';

	export default {
		name: 'SortUsers',
		props: {
			users: {
				required: true,
				type: Array,
				validator: val => val.length > 0
			}
		},
		data: () => ({
			valueAge: [18, 90],
			sort: {
				type: 'name',
				desc: true
			}
		}),
		components: {
			VueSlider
		},
		mounted() {
			this.sortUsers();
		},
		methods: {
			changeSortType(type){
				if (this.sort.type === type) {
					this.sort.desc = !this.sort.desc;
				} else {
					this.sort.type = type;
					this.sort.desc = true;
				};
				this.sortUsers();
			},
			sortUsers() {
				let sortedUsers = this.users.filter(user => user.dob.age >= this.valueAge[0] && user.dob.age <= this.valueAge[1]);
				sortedUsers = this.sort.type === 'name' ? this.sortUsersByName(sortedUsers) : this.sortUsersByAge(sortedUsers);
				this.$emit('usersSorted', sortedUsers);
			},
			sortUsersByName(sortedUsers) {
				sortedUsers.sort((user1, user2) => {
					return (user2.name.first<user1.name.first) - (user1.name.first<user2.name.first) || (user2.name.last<user1.name.last) - (user1.name.last<user2.name.last);
				});
				if (!this.sort.desc) {
					sortedUsers.reverse()
				};
				return sortedUsers;
			},
			sortUsersByAge(sortedUsers) {
				sortedUsers.sort((user1, user2) => {
					return moment().diff(user1.dob.date, 'days') - moment().diff(user2.dob.date, 'days');
				});
				if (this.sort.desc) {
					sortedUsers.reverse()
				};
				return sortedUsers;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sortUsers{
		margin-top: 50px;
		margin-bottom: 40px;
		font-size: 24px;
		&__agerange{
			max-width: 600px;
		}
		&__title{
			font-weight: bold;
		}
		&__btn{
			background: none;
			border: none;
			outline: none;
			position: relative;
			font-size: 22px;
			&-arrow{
				font-size: 16px;
				font-weight: bold;
				display: inline-block;
				transform: rotate(90deg);
				transition: 0.1s;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: -6px;
				top: calc(50% - 8px);
				&-asc{
					transform: rotate(-90deg);
				}
			}
		}
	}
</style>
