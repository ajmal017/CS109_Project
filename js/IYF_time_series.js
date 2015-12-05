$(function () {
    var seriesOptions = [],
        seriesCounter = 0,
        names = ['Ensemble', 'Index'];

    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    function createChart() {

        $('#IYF_container').highcharts('StockChart', {

            chart: {
                marginTop: 70
            },

            rangeSelector: {
                selected: 4
            },

            title: {
                text: 'Simulated growth of a $10,000 investment'
            },

            subtitle: {
                text: 'when trading based on ensemble classifier predictions'
            },

            legend: {
                align: 'left',
                verticalAlign: 'center',
                layout: 'vertical',
                enabled: true
            },
 
            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function (i, name) {

        $.getJSON('./data/time_series/IYF_' + name + '.json',    function (data) {

            seriesOptions[i] = {
                name: name,
                data: data
            };

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
            }
        });
    });
});