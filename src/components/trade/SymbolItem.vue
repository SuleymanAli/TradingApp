<template>
  <tr @click="$emit('change', stock.T)">
    <td>{{ stock.T }}</td>
    <td :class="vw">{{ stock.vw }}</td>
    <td :class="v">{{ calcOpeningAverageP }}</td>
  </tr>
</template>

<script>
export default {
  name: 'SymbolItem',
  props: {
    stock: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data(){
    return {
      v: null,
      vw: null
    }
  },
  computed:{
    clonedStock: function(){
      return JSON.parse(JSON.stringify(this.stock))
    },
    calcOpeningAverageP(){
      if(this.stock.o && this.stock.vw) return this.stock.o - this.stock.vw;
    },
    clonedOpeningAverageP(){
      if(!isNaN(this.calcOpeningAverageP)){
        return JSON.parse(JSON.stringify(this.calcOpeningAverageP))
      }
    }
  },
  watch: {
    clonedStock: {
      handler(newVal, oldVal){
        if(newVal.vw >= oldVal.vw){
          this.vw = 'green'
          setTimeout(() => {
            this.vw = null
          }, 1500)
        }
        else if(newVal.vw <= oldVal.vw){
          this.vw = 'red'
          setTimeout(() => {
            this.vw = null
          }, 1500)
        }
        else {
          this.vw = null
        }
      },
      deep: true
    },
    clonedOpeningAverageP: {
      handler(newVal, oldVal){
        if(newVal >= oldVal){
          this.v = 'green'
          setTimeout(() => {
            this.v = null
          }, 1500)
        }
        else if(newVal <= oldVal){
          this.v = 'red'
          setTimeout(() => {
            this.v = null
          }, 1500)
        }
        else {
          this.v = null
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  tr {
    cursor: pointer;
  }

  td.green {
    color: #4caf50;
  }

  td.red {
    color: #f44336;
  }
</style>