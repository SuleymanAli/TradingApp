<template>
<!-- Timeframe Selector -->
<div class="tf-selector">
    <!-- <span class="timeframe" v-for="(tf, i) in timeframes"
        v-on:click="on_click(tf, i)"
        v-bind:style= "selected_tf === tf.tf ? {color: '#44c767'} : {}">
        {{tf.tf}}
    </span> -->
    <div class="tf-selected" @click="toggleTf">{{ selected_tf }}</div>
    <div class="tf-selector-content" v-if="tf_content">
        <div 
            class="tf-item"
            v-for="(tf, i) in timeframes"
            v-on:click="on_click(tf, i)"
            v-bind:style="selected_tf === tf.tf ? {color: '#44c767'} : {}"
        >
            {{ tf.tf }}
        </div>
    </div>
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

        window.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)){
              this.tf_content = false
            }
          })
    },
    methods: {
        on_click(tf, i) {
            this.selected_tf = tf.tf
            this.$emit('selected', tf)
            this.tf_content = false
        },
        toggleTf(){
            this.tf_content = !this.tf_content
        }
    },
    data() {
        return {
            selected_tf: this.selected,
            tf_content: false
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
    padding: 5px 8px;
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

/*dropdown version*/
.tf-selector {
    width: 80px;
    z-index: 100;
    cursor: pointer;
}
.tf-selector::before {
  content:"";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 5px solid #ccc;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}
.tf-selector-content {
    position: absolute;
    width: 100%;
    top: 37px;
    left: 0;
    border-radius: 4px;
    background: #34363b;
    max-height: 200px;
    overflow: auto;
}
.tf-selector-content::-webkit-scrollbar {
  width: 5px;
  border-radius: 4px;
}

/* Track */
.tf-selector-content::-webkit-scrollbar-track {
  background: #444444;
  border-radius: 4px;
}

/* Handle */
.tf-selector-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.tf-item {
    padding: 5px 8px;
}

.tf-item:hover {
    background: #444444;
}

@media(max-width: 991px){
    .tf-selector {
        /*width: 350px;*/
        font-size: 14px;
    }
}

@media(max-width: 767px){
    .tf-selector {
        right: 70px;
        /*width: 200px;*/
    }
}
</style>
