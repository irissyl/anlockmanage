<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="房间使用情况" name="first">
      <div id="roomUse" style="width: 70%;height:800px;margin-top:100px;margin-left:250px"></div>
    </el-tab-pane>
    <el-tab-pane label="楼栋住宿情况" name="second">
      <div id="echartline" style="width: 900px;height:700px;margin-top:100px;margin-left:400px"></div>
    </el-tab-pane>
    <el-tab-pane label="设备统计情况" name="third">
      <div id="device" style="width: 900px;height:700px;margin-left:400px"></div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'first',
      formInline: {
        user: '',
        region: ''
      }
    };
  },
  mounted () {
    this.initChart();
    this.roomChart();
    this.deviceChart()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    onSubmit () {
      console.log('submit!');
    },
    roomChart () {
      let getchart = echarts.init(document.getElementById('roomUse'))
      var pic = 'data:image/png;base64,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'
      var room = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAABKlfNMl/NKl/NKlvNKlvNKlfNAj/9LlfJLlvRJlvJJlvNIl/dKlvJKlfNKlfRKlvJKlvRKlPJLlvNNahX2AAAAE3RSTlMAgEB/wNCQEPBwUD8g4LAwoF9PlDlXUQAAAJFJREFUOMvt0csKAjEMheHTsXd7mTHv/65aXdQWQoMiuvBfhg8CCb5ePTFd3OA2YtMDVH0+ZogYSMY+b9tY+MD7kVg4l6MQkpdC+sN3oZdBBTgrgAqtsoYVd7GGSQoDWvsa+gggiM6Ttf/9F34Knm+FCR7EVjBkOacTpmookwHfpvQSdmxNh4tcbDijJcAJr3UFPi4x3UUk2hAAAAAASUVORK5CYII='
      var data = [{
        name: '干部宿舍楼',
        total: 120,
        use: 60,
        empty: 60,
      }, {
        name: '公寓住房',
        total: 110,
        use: 40,
        empty: 70,
      }]

      // 计算总数
      var total = 0;
      var seriesOption = []
      data.map((item, index) => {
        total += item.total
        seriesOption.push({
          name: '柱背景',
          type: 'bar',
          xAxisIndex: index,
          yAxisIndex: index,
          data: [{

          }, {
            name: item.name,
            value: item.total,
            rate: (item.use / item.total).toFixed(2) * 100 + '%',
          }],
          barWidth: 16,
          itemStyle: {
            normal: {
              barBorderRadius: 8,
              color: '#DFEEFF'
            }
          },
          label: {
            show: true,
            position: 'insideRight',
            formatter: params => {
              return `{pb|使用率：${params.data.rate}}`
            },
            rich: {
              pb: {
                color: '#4B96F3',
                padding: [0, 0, -30, 0]
              }
            }
          }
        })
        seriesOption.push({
          value: item.use,
          max: item.total,
          name: item.name,
          zlevel: 2,
          type: 'bar',
          yAxisIndex: index,
          xAxisIndex: index,
          data: [{

          }, {
            value: item.use,
            use: item.use,
            empty: item.empty,
            total: item.total
          }],
          label: {
            show: true,
            color: 'transparent',
            position: 'insideLeft',
            formatter: params => {
              console.log(params)
              return `{pb|}\n{imgIcon|}  {normalText|房间：${params.data.total}间}
                \n\n{circleYellow|●}  {normalText|使用：${params.data.use}间}
                \n\n{circleGreen|●}  {normalText|空闲：${params.data.empty}间}`
            },
            rich: {
              circleYellow: {
                color: '#FFA83E',
                width: 16,
                height: 16,
                fontSize: 20,
                lineHeight: 20,
                padding: [0, 0, 0, 4]
              },
              pb: {
                padding: [0, 0, 200, 0]
              },
              circleGreen: {
                color: '#36C78B',
                fontSize: 20,
                width: 16,
                height: 16,
                lineHeight: 20,
                padding: [0, 0, 0, 4]
              },
              imgIcon: {
                backgroundColor: {
                  image: room,
                },
                width: 20,
                height: 20,
              },
              normalText: {
                fontSize: 15,
                height: 20,
                textVeticalAlign: 'middle',
                color: '#666666'
              }
            }
          },
          rate: item.total === 0 ? 0 : (item.use / item.total).toFixed() * 100 + '%',
          barGap: '-100%',
          barWidth: 16,
          itemStyle: {
            normal: {
              barBorderRadius: 8,
              color: '#4B96F3'
            }
          }

        })
      })
      let option = {
        graphic: {
          elements: [{
            type: 'image',
            left: 'center',
            top: 25,
            style: {
              image: pic,
              width: 136,
              height: 136,
              textAlign: 'center'
            }
          }, {
            type: 'text',
            left: 'center',
            top: 180,
            style: {
              text: '房间总数',
              fill: '#333333',
              fontSize: 16,
            }
          }, {
            type: 'rect',
            left: 'center',
            top: 200,
            textVeticalAlign: 'middle',
            shape: {
              width: 80,
              height: 36,
            },
            style: {
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'bold',
              text: total,
              fill: '#4B96F3',
            }
          }]
        },
        grid: [{
          left: '5%',
          top: '5%',
          width: '30%',
          bottom: '5%',
          containLabel: true,
        }, {
          left: '35%',
          top: '5%',
          width: '30%',
          bottom: '5%',
          containLabel: true,
        }, {
          left: '65%',
          top: '5%',
          width: '30%',
          bottom: '5%',
          containLabel: true,
        }],
        yAxis: [{
          type: 'category',
          data: ['', '干部宿舍楼'],
          gridIndex: 0,
          axisLabel: {
            inside: true,
            padding: [0, 0, 48, 0],
            color: '#333333',
            fontWeight: 'bold'
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          }
        }, {
          type: 'category',
          data: ['', '公寓住房'],
          gridIndex: 2,
          axisLabel: {
            inside: true,
            padding: [0, 0, 48, 0],
            color: '#333333',
            fontWeight: 'bold'
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          }
        }],
        xAxis: [{
          type: 'value',
          gridIndex: 0,
          max: data[0].total,
          show: false,
        }, {
          type: 'value',
          gridIndex: 2,
          max: data[1].total,
          show: false,
        }],
        series: [...seriesOption]
      }
      getchart.setOption(option)
      //随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        getchart.resize()
      })
    },
    initChart () {
      let getchart = echarts.init(document.getElementById('echartline'))

      var option = {
        title: {
          text: '楼栋住宿情况',
          left: '20px',
          textStyle: {
            color: "#000",
            fontSize: 20,
          }
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          itemWidth: 15,
          itemHeight: 15,
          data: ['已住', '未住'],
        },
        xAxis: {
          data: ["A栋", "B栋", "C栋", "D栋", "E栋", "F栋"],
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
        },
        series: [{
          name: '已住',
          type: 'bar',
          stack: '使用情况',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: { color: "#FF8849" },
          }
        }, {
          name: '未住',
          type: 'bar',
          stack: '使用情况',
          data: [40, 22, 18, 35, 42, 40],
          itemStyle: {
            normal: { color: "#7fc3ff" },
          }
        }]
      };

      getchart.setOption(option)
      //随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        getchart.resize()
      })
      console.log(this.analyseCountData, 'analyseCountData')

    },
    deviceChart () {
      let getchart = echarts.init(document.getElementById('device'))
      var colorList = ["#b83939", '#1a57b2', '#b04b07', '#af8108'];
      var colorListSub = ['rgb(95, 37, 37)', 'rgba(26,87,178,.5)', 'rgba(176,75,7,.5)', 'rgba(175,129,8,.5)'];
      var rich = {
        a: {
          color: '#fff',
          backgroundColor: colorList[0],
          padding: [2, 20],
          lineHeight: 20,
          fontSize: 16,
          height: 30,
          borderRadius: 15
        },
        b: {
          color: '#fff',
          backgroundColor: colorList[1],
          padding: [2, 20],
          lineHeight: 30,
          fontSize: 16,
          height: 30,
          borderRadius: 15
        },
        c: {
          color: '#fff',
          backgroundColor: colorList[2],
          padding: [2, 20],
          lineHeight: 30,
          fontSize: 16,
          height: 30,
          borderRadius: 15
        },
        d: {
          color: '#ffffff',
          backgroundColor: colorList[3],
          padding: [2, 20],
          lineHeight: 30,
          fontSize: 14,
          height: 30,
          borderRadius: 15
        },
        pera: {
          color: '#ffffff',
          backgroundColor: colorListSub[0],
          padding: [2, 15],
          lineHeight: 20,
          fontSize: 14,
          height: 20,
          borderRadius: 15
        },
        perb: {
          color: '#ffffff',
          backgroundColor: colorListSub[1],
          lineHeight: 20,
          fontSize: 14,
          height: 20,
          padding: [2, 15],
          borderRadius: 15
        },
        perc: {
          color: '#ffffff',
          backgroundColor: colorListSub[2],
          lineHeight: 20,
          fontSize: 14,
          height: 20,
          padding: [2, 15],
          borderRadius: 15
        },
        perd: {
          color: '#fff',
          backgroundColor: colorListSub[3],
          lineHeight: 20,
          fontSize: 14,
          height: 20,
          padding: [2, 15],
          borderRadius: 15
        }
      };
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c}个"
        },
        legend: {
          textStyle: {
            color: '#000',
            fontSize: 14
          },
          x: 'center',
          bottom: '30',
          itemGap: 25,
          data: ['未知异常', '报废设备', '停运设备', '离线设备', '检修设备', '故障设备']
        },
        series: [
          {
            type: 'pie',
            radius: ['10%', '55%'],
            roseType: 'radius',
            clockwise: false,
            z: 10,
            itemStyle: {
              normal: {
                color: function (params) {
                  // build a color map as your need.
                  return colorList[params.dataIndex]
                },
                shadowBlur: 30,
                shadowColor: 'rgba(255, 255, 255, 0.4)'
              }
            },
            label: {
              normal: {
                formatter: function (params) {
                  // return '{b|'+params.name+'}\n'+params.value+'度({per|'+params.percent+'%})  '
                  var str = ''
                  switch (params.name) {
                    case '未知异常': str = '{a|' + params.name + '}\n\n{pera|' + params.value + '个 }'; break;
                    case '离线设备': str = '{b|' + params.name + '}\n\n{perb|' + params.value + '个 }'; break;
                    case '检修设备': str = '{c|' + params.name + '}\n\n{perc|' + params.value + '个}'; break;
                    case '故障设备': str = '{d|' + params.name + '}\n\n{perd|' + params.value + '个 }'; break;
                  }
                  return str
                },
                rich: rich
              }
            },
            labelLine: {
              normal: {
                length: 50,
                length2: 50,
                lineStyle: {
                  width: 2
                }
              }
            },
            data: [
              { value: 41, name: '未知异常' },
              { value: 23, name: '离线设备' },
              { value: 11, name: '检修设备' },
              { value: 9, name: '故障设备' }
            ]
          },
          // 边框的设置
          {
            radius: ['10%', '14%'],
            type: 'pie',
            clockwise: false,
            z: 11,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            animation: true,
            tooltip: {
              show: true
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  // build a color map as your need.
                  var colorList = ['#b83939', '#15458c', '#563527', '#594f27'];
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [
              { value: 41, name: '泵' },
              { value: 23, name: '设备一' },
              { value: 11, name: '设备二' },
              { value: 9, name: '设备三' }
            ]
          },
          // 中心的圆圈
          {
            radius: ['60%', '60.3%'],
            type: 'pie',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 30,
                shadowColor: 'rgba(255, 255, 255, 0.5)'
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: false
            },
            data: [{
              value: 100,
              name: '设备数量统计',
              itemStyle: {
                normal: {
                  color: '#6CB5FF',
                  shadowBlur: 30,
                  shadowColor: 'rgba(255, 255, 255, 0.5)'
                }
              }
            }],
            animation: true
          }
        ]
      };
      getchart.setOption(option)
      //随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        getchart.resize()
      })
      console.log(this.analyseCountData, 'analyseCountData')

    },
  }
};
</script>

<style lang="scss" scoped>
dd {
  color: rgb(95, 37, 37);
}
</style>
