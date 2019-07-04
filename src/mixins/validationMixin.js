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
			// this.cnsl(name)
			// this.cnsl('fieldErrors if(!field.$dirty) errors = ',errors)
			// this.cnsl("")
			return errors
		}

		if(messages) {
			for (rule in messages) {
				if (field[rule] === false && messages[rule]) {
					errors.push(messages[rule])
				}
			}
		}
		// this.cnsl(name)
		// this.cnsl('fieldErrors if(messages) errors = ',errors)
		// this.cnsl("")
		return errors
	},	


	fieldErrorsMOQ (name, moq) {
		let rule
		const errors = []
		const field = get(this.$v, name)
		const messages = get(this.$options.validationMessages, name)
		
		errors.push('=='+moq)

		if(!field.$dirty) {
			return errors
		}

		if(messages) {
			for (rule in messages) {
				if (field[rule] === false && messages[rule]) {
					// errors.push(messages[rule])
					errors.push('=='+moq)
				}
			}
		}
		return errors
	},	


},


}
