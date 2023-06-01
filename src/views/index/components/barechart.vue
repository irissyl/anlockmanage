<template>
  <div id="echart-line" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    methods: {
      initChart(name, xData, yData) {
        let getchart = echarts.init(document.getElementById('echart-line'))
        //   var  option = {
        var data = [
          {
            name: '宿舍人数',
            value: 15,
          },
          {
            name: '办公室人数',
            value: 35,
          },
        ]

        var option = {
          color: [
            '#315f97',
            '#005fa6',
            '#86c9f4',
            '#4da8ec',
            '#315f97',
            'rgba(250,250,250,0.3)',
          ],
          // backgroundColor: '#86c9f4',
          title: {
            text: '总数',
            subtext: 50,
            textStyle: {
              color: '#000',
              fontSize: 20,
              // align: 'center'
            },
            subtextStyle: {
              fontSize: 20,
              color: ['#ff9d19'],
            },
            x: 'center',
            y: 'center',
          },
          grid: {
            bottom: 150,
            left: 100,
            right: '10%',
            color: '#000',
          },
          legend: {
            orient: 'vertical',
            top: '2%',
            right: '5%',
            textStyle: {
              color: '#000',
              fontSize: 15,
            },
            icon: 'roundRect',
            data: data,
          },
          tooltip: [
            {
              //提示框
              trigger: 'item', //触发方式
              axisPointer: {
                type: 'shadow',
                textStyle: {
                  color: '#000',
                },
              },
            },
          ],
          series: [
            // 主要展示层的
            {
              radius: ['30%', '61%'],
              center: ['50%', '50%'],
              type: 'pie',
              label: {
                normal: {
                  show: true,
                  formatter: '{c}人',
                  textStyle: {
                    fontSize: 20,
                  },
                  position: 'outside',
                },
                emphasis: {
                  show: true,
                },
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 30,
                  length2: 55,
                },
                emphasis: {
                  show: true,
                },
              },
              name: '人数总量',
              data: data,
            },
            // 边框的设置
            {
              radius: ['30%', '34%'],
              center: ['50%', '50%'],
              type: 'pie',
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              animation: false,
              tooltip: {
                show: false,
              },
              data: [
                {
                  value: 1,
                  itemStyle: {
                    color: 'rgba(250,250,250,0.3)',
                  },
                },
              ],
            },
            {
              name: '外边框',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['65%', '65%'],
              label: {
                normal: {
                  show: false,
                },
              },
              data: [
                {
                  value: 9,
                  name: '',
                  itemStyle: {
                    normal: {
                      borderWidth: 2,
                      borderColor: '#0b5263',
                    },
                  },
                },
              ],
            },
          ],
        }

        getchart.setOption(option)
        //随着屏幕大小调节图表
        window.addEventListener('resize', () => {
          getchart.resize()
        })
      },
    },
  }
</script>
