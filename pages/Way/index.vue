<template>
    <div class="way">
        <el-container>
            <el-header>
                <el-menu default-active="handle" class="el-menu-demo" mode="horizontal">
                   <el-row>
                        <el-col :span="2">时间:</el-col>
                        <el-col :span="2">本月</el-col>
                        <el-col :span="2">上月</el-col>
                        <el-col :span="18">
                            <el-date-picker
                                v-model="value7"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions2">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    
                </el-menu>
            </el-header>
            <el-main>
                <div id="myChart" :style="{width: '800px', height: '500px'}"></div>
                <div>
                    <el-col>
                        渠道统计报表
                    </el-col>
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        :default-sort = "{prop: 'from', order: 'descending'}"
                        >
                        <el-table-column
                        prop="from"
                        label="客户来源"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="count"
                        label="访问人数"
                        sortable
                        width="180">
                        </el-table-column>
                              <el-table-column
                        prop="counts"
                        label="导入客户数"
                        sortable
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="counts"
                        label="访客转化率" 
                        :formatter="formatter">
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
        data() {
      return {
          tableData: [{
          from: '总部统一市场活动',
          count: 0,
          counts: 0,
         
        }, {
          from: '电视媒体',
          count: 0,
           counts: 0,
        }, {
          from: '生日会',
          count: 0,
           counts: 0,
        
        },
        {
          from: '户外广告',
          count: 0,
           counts: 0,
         
        },
        {
          from: '中心微信',
          count: 0,
           counts: 0,
         
        },
        {
          from: 'phone in',
          count: 0,
           counts: 0,
         
        },
        {
          from: '大众点评',
          count: 0,
           counts: 0,
         
        },
        {
          from: '商场活动',
          count: 0,
           counts: 0,
         
        },{
          from: '路过看见',
          count: 0,
           counts: 0,
         
        }],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: ''
      };
    },
    methods: {

        formatter(row, column) {
            // console.log(row,column)
            console.log(row.counts/row.counts)
            if(row.count ==0){
                return 0+'%'
            }else{
                return row.counts/row.count+'%';
            }
            
        },
        drawLine(){
            // 基于准备好的dom，初始化echarts实例   
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // var seriesLabel = { 
            //     normal: {
            //         show: true, 
            //         textBorderColor: '#333',
            //         textBorderWidth: 2 
            //     }
            // }
            // 绘制图表
            myChart.setOption({
                            title: {
                    text: '热门渠道 Top 10'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['City Alpha', 'City Beta', 'City Gamma']
                },
                grid: {
                    left: 100
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'value',
                    name: 'Days',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    data: ['Sunny', 'Cloudy', 'Showers','sdadd'],
                    axisLabel: {
                        formatter: function (value) {
                            return '{' + value + '| }\n{value|' + value + '}';
                        },
                        margin: 20,
                        rich: {
                            value: {
                                lineHeight: 30,
                                align: 'center'
                            },
                            Sunny: {
                                height: 40,
                                align: 'center',
                               
                            },
                            Cloudy: {
                                height: 40,
                                align: 'center',
                                
                            },
                            Showers: {
                                height: 40,
                                align: 'center',
                               
                            }
                        }
                    }
                },
                series: [
                    {
                        name: 'City Alpha',
                        type: 'bar',
                        data: [165, 170, 30],
                        // label: seriesLabel,
                        markPoint: {
                            symbolSize: 1,
                            symbolOffset: [0, '50%'],
                            label: {
                            normal: {
                                    formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
                                    backgroundColor: 'rgb(242,242,242)',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    padding: [4, 10],
                                    lineHeight: 26,
                                    // shadowBlur: 5,
                                    // shadowColor: '#000',
                                    // shadowOffsetX: 0,
                                    // shadowOffsetY: 1,
                                    position: 'right',
                                    distance: 20,
                                    rich: {
                                        a: {
                                            align: 'center',
                                            color: '#fff',
                                            fontSize: 18,
                                            textShadowBlur: 2,
                                            textShadowColor: '#000',
                                            textShadowOffsetX: 0,
                                            textShadowOffsetY: 1,
                                            textBorderColor: '#333',
                                            textBorderWidth: 2
                                        },
                                        b: {
                                            color: '#333'
                                        },
                                        c: {
                                            color: '#ff8811',
                                            textBorderColor: '#000',
                                            textBorderWidth: 1,
                                            fontSize: 22
                                        }
                                    }
                            }
                            },
                            data: [
                                // {type: 'max', name: 'max days: '},
                                // {type: 'min', name: 'min days: '}
                            ]
                        }
                    },
                    {
                        name: 'City Beta',
                        type: 'bar',
                        // label: seriesLabel,
                        data: [150, 105, 110]
                    },
                    {
                        name: 'City Gamma',
                        type: 'bar',
                        // label: seriesLabel,
                        data: [220, 82, 63]
                    }
                ]
            });
        }
  },
  mounted(){
    this.drawLine();
  },
}
</script>
<style lang="scss" scoped>
.el-table{
    margin-left: 40px;
}
</style>

