<template>
<!-- Timeframe Selector -->
<div class="tf-selector">
    <span class="timeframe" v-for="(tf, i) in timeframes"
        v-on:click="on_click(tf, i)"
        v-bind:style= "selected_tf === tf.tf ? {color: '#44c767'} : {}">
        {{tf.tf}}
    </span>
</div>
</template>

<script>
export default {
    name: 'TfSelector',
    props: {
        timeframes: {
            type: Array,
            default: []
        },
        selected: {
            type: String,
            default: '4H'
        }
    },
    mounted() {
        if(this.timeframes && this.timeframes.length > 0){
            let tf = this.timeframes.find(item => item.tf === this.selected_tf)
            this.$emit('selected', tf)
        }
    },
    methods: {
        on_click(tf, i) {
            this.selected_tf = tf.tf
            this.$emit('selected', tf)
        }
    },
    data() {
        return {
            selected_tf: this.selected
        }
    }
}
</script>

<style>
.tf-selector {
    position: absolute;
    top: 15px;
    right: 80px;
    font: 16px -apple-system,BlinkMacSystemFont,
        Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,
        Fira Sans,Droid Sans,Helvetica Neue,
        sans-serif;
    background: #34363b;
    color: #ccc;
    padding: 8px;
    border-radius: 3px;
}
.timeframe {
    margin-right: 5px;
    user-select: none;
    cursor: pointer;
    font-weight: 200;
    max-width: 10px;
}
.timeframe:hover {
    color: #fff;
}
</style>
