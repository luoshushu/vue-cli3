<template>

  
   
    
  <div id="app">
  <div id="headerTitle">头部</div>
  <div id="content"> 
    <div class="content1">
       <!-- <div class="chart-container">
      <mixChart height="100%" width="100%" />
    </div> -->
    <index-three></index-three>
    </div>
    <div class="content2">
          <!-- <div class="chart-container">
             <chart height="100%" width="100%" />
        </div> -->
        <index-one></index-one>
      </div>
    <div class="content3">
      <index-two></index-two>
    <!-- <div class="chart-container">
      <lineMarker height="100%" width="100%" />
    </div> -->
    </div> 
  </div>
 
</div>
</template>

<script>
  import Chart from '@/components/Charts/keyboard'
  import lineMarker from '@/components/Charts/lineMarker'
  import mixChart from '@/components/Charts/mixChart'
  import indexOne from './index-1'
  import indexTwo from './index-2'
  import indexThree from './index-3'
  export default {
    name: 'test',
    data() {
      return {}
    },
    components: {
      Chart,
      lineMarker,
      mixChart,
      indexOne,
      indexTwo,
      indexThree
    },
    mounted() {
      // this.initCharts();
    },
    methods: {
      // initCharts() {
      //   this.chart = this.$echarts.init(this.$el);
      //   this.setOptions();
      // },
      // setOptions() {
      //   this.chart.setOption({
      //     title: {
      //       text: 'ECharts 入门示例'
      //     },
      //     tooltip: {},
      //     xAxis: {
      //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      //     },
      //     yAxis: {},
      //     series: [{
      //       name: '销量',
      //       type: 'bar',
      //       data: [5, 20, 36, 10, 10, 20]
      //     }]
      //   })
      // }
    }
  }
</script>

<style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#headerTitle {
  height: 50px;
  border-bottom: 1px solid #eee;
  font-style: 16px;
}

#content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  background: #234;
}


#content .content1{
  background: #890;
  flex-grow:1;
  width: 25%;

}
#content .content2{
  background: red;
  flex-grow:2;
  width: 50%;
}
#content .content3{
  background: #143;
  flex-grow:1;
    width: 25%;

}

</style>