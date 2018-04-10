define(["jquery", "echarts"], function ($, echarts) {
    //根据ID初始化Echart
    let myChartBar = echarts.init(document.getElementById('major-echart-bar'));
    //获取后台的表格是数据
    let echartData = employmentSalariesEchartData;
    //表格X轴数据
    let xdatas = [];
    //表格Y轴数据
    let ydatas = [];
    console.log(echartData);
    //处理后台数据适应柱状图
    initEchartData();

    function initEchartData() {
        for (let i = 0; i < echartData.length; i++) {
            let xdata = "毕业" + echartData[i].afterGraduationYear + "年";
            xdatas.push(xdata);
            let ydata = echartData[i].salary;
            ydatas.push(ydata);
        }
    }

    //Echart配置
    var option = {
        color: ['#18b5dd'],
        tooltip: {},
        xAxis: {
            data: xdatas,
            axisLabel: {
                margin: 10,//刻度标签与轴线之间的距离
                textStyle: {
                    fontSize: 16,//控制轴线上字体大小

                }
            },
            nameGap: 75,
            axisLine: {
                show: true,//控制坐标线显示或不显示//默认状态下是true
                lineStyle: {
                    color: '#838383'
                }
            }

        },
        yAxis: {
            show: true,
            axisLine: {
                show: true,//控制坐标线显示或不显示//默认状态下是true
                lineStyle: {
                    color: '#838383'
                }
            },
            axisLabel: {
                margin: 10,//刻度标签与轴线之间的距离
                textStyle: {
                    fontSize: 16,//控制轴线上字体大小

                }
            },
        },
        series: [{
            name: '毕业时间',
            type: 'bar',
            barWidth: '50',
            data: ydatas
        }]
    };

    // 使用刚指定的配置项和数据显示图表。

    myChartBar.setOption(option);


})