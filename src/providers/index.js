import axios from 'axios'
import VueAxios from 'vue-axios'

export default{
	getUser(){
		return new Promise((resolve, reject) => {
			const inc = ['name', 'phone', 'email', 'photo', 'picture', 'dob', 'id'].join(',');
			axios.get('https://randomuser.me/api/',
			{
				params: {
					results: 50,
					inc,
					nat: 'us',
					noinfo: true
				},
			})
			.then(
				response => resolve(response.data),
				error => reject(error)
			);
		});
	}
}