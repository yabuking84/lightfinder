import { validationMixin } from 'vuelidate'
import { get } from 'lodash'

export default {

mixins: [validationMixin],

methods: {
	fieldErrors (name) {
		let rule
		const errors = []
		const field = get(this.$v, name)
		const messages = get(this.$options.validationMessages, name)

		if(!field.$dirty) {
			// console.log(name)
			// console.log('fieldErrors if(!field.$dirty) errors = ',errors)
			// console.log("")
			return errors
		}

		if(messages) {
			for (rule in messages) {
				if (field[rule] === false && messages[rule]) {
					errors.push(messages[rule])
				}
			}
		}
		// console.log(name)
		// console.log('fieldErrors if(messages) errors = ',errors)
		// console.log("")
		return errors
	},	


},


}
