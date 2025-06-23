<template>
    <div class="w-10 h-10 grid place-items-center text-xl hover:scale-130 transition-all cursor-pointer"
        v-on:click="handleClick">
        {{ title }}
    </div>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        handleClick() {
            this.$emit("icon-clicked", this.title)
        }
    }
}
</script>

<style scoped></style>
