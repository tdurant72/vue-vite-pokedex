<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	}
});
</script>

<template>
    <div>
        <h3>{{name}}</h3>   
        <p># {{number}}</p>
    </div>
</template>
<style  scoped>
</style>