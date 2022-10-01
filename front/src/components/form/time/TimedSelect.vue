<template>
	<vuejs-datepicker
		:disabled="dis"
		:minimum-view="'day'"
		:maximum-view="'month'"

		:format="'dd / MM / yyyy'"
		:placeholder="'Please select'"
	    v-if="timed" :value="timed" @selected="result"></vuejs-datepicker>
</template>
<script>
import moment from 'moment'
import VuejsDatepicker from 'vuejs-datepicker'
	export default {
		name: 'app',
		props: {
			dis: Boolean,
			timed: String
		},
		components: {
			VuejsDatepicker
		},
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
			result(v) {
				v = moment(v).format('YYYY-MM-DD')
				this.$emit('result', v)
			}
		}
	}
</script>
