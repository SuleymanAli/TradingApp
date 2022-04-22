<template>
  <tr @click="$emit('change', stock.T)">
    <td>{{ stock.T }}</td>
    <td :class="price">{{ stock.vw }}</td>
    <td :class="net_chg">{{ calcNetChg }}</td>
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
      price: null,
      net_chg: null
    }
  },
  computed:{
    clonedStock: function(){
      return JSON.parse(JSON.stringify(this.stock))
    },
    calcNetChg(){
      if(this.stock.o && this.stock.vw) return (this.stock.o - this.stock.vw).toFixed(4);
    },
    clonedNetChg(){
      if(!isNaN(this.calcNetChg)){
        return JSON.parse(JSON.stringify(this.calcNetChg))
      }
    }
  },
  watch: {
    clonedStock: {
      handler(newVal, oldVal){
        if(newVal.vw >= oldVal.vw){
          this.price = 'green'
          setTimeout(() => {
            this.price = null
          }, 1500)
        }
        else if(newVal.vw <= oldVal.vw){
          this.price = 'red'
          setTimeout(() => {
            this.price = null
          }, 1500)
        }
        else {
          this.price = null
        }
      },
      deep: true
    },
    clonedNetChg: {
      handler(newVal, oldVal){
        if(newVal >= oldVal){
          this.net_chg = 'green'
          setTimeout(() => {
            this.net_chg = null
          }, 1500)
        }
        else if(newVal <= oldVal){
          this.net_chg = 'red'
          setTimeout(() => {
            this.net_chg = null
          }, 1500)
        }
        else {
          this.net_chg = null
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
    color: #63df89;
  }

  td.red {
    color: #ec4662;
  }
</style>