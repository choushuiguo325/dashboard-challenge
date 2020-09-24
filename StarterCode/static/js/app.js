
function process() {
    var dropdownMenu = d3.select("#selDataset");
    var targetId = dropdownMenu.property('value');
    console.log("id",targetId);
    // console.log("total",total);
    d3.json("./samples.json").then(data => {
        console.log(data);
        samplesLists = data.samples;
        var samplesDemos = data.metadata;
        console.log("list",samplesDemos);
        console.log("list",samplesLists);

        // 1. Barchart function 
        // extract the values, ids, and labels from total.
        var targetSample = samplesLists.filter(sample => parseInt(sample.id) === parseInt(targetId))[0];
        var targetDemo = samplesDemos.filter(sample => parseInt(sample.id) === parseInt(targetId))[0];
        console.log("target demo", targetDemo);
        console.log("target sample", targetSample);
        let samplesInfo = [];
        var barLength = targetSample.sample_values.length;
        // create a list to combine values, ids and labels together
        for (i=0; i < barLength; i++) {
            // create a dictionary to store the value, id and label of each sample
            let sample = {};
            sample.value = targetSample.sample_values[i];
            sample.id = targetSample.otu_ids[i];
            sample.label = targetSample.otu_labels[i];
            // push the sample dictionary to the samplesInfo list
            samplesInfo.push(sample);
        };
        // sort the dictionary by value descending
        samplesInfo.sort((a,b) => b.value - a.value);
        console.log("sorted sample",samplesInfo);
        
        // select samples with top ten values
        var chartInfo = samplesInfo.slice(0,10);
        // inverse the list to fit the horizontal bar chart
        chartInfo.reverse();
        var barValues = chartInfo.map(sample => sample.value);
        var barIds = chartInfo.map(sample => `OTU ${sample.id}`);
        var barLabels = chartInfo.map(sample => sample.label);
        console.log("value, id, labels",barValues,barIds,barLabels);
        // plot the bar chart
        var bar1 = {
            type: 'bar',
            orientation: 'h',
            x: barValues,
            y: barIds,
            text: barLabels, 
        }
        barTraces = [bar1];
        var barLayout = {
            title: "Top 10 OTUs",
            xaxis: {title: "Values"},
            yaxis: {title: "OTU ID"}
        };
        Plotly.newPlot("bar", barTraces, barLayout);

        // 2. Bubble chart function
        var bubValues = samplesInfo.map(sample => sample.value);
        var bubIds = samplesInfo.map(sample => sample.id);
        var bubLabels = samplesInfo.map(sample => sample.label);
        // var bubSize = samplesInfo.map(sample => 2*Math.max(sample.value)/(Math.min(sample.value)));
        // var bubColor = samplesInfo.map(sample => `(${sample.id},${sample.id},${sample.id})"`);
        var bubColor = 'yellow';
        var bub1 = {
            type: 'scatter',
            x: bubIds,
            y: bubValues,
            text: bubLabels,
            mode: 'markers',
            marker: {color: bubIds, size: bubValues} //, sizeref: 2
        }
        bubTraces = [bub1]
        bubLayout = {
            autosize: true,
            yaxis: {title: "Values", autorange: true, showgrid: true},
            xaxis: {title: "OTU ID", autorange: true, showgrid: true}  
        };
        Plotly.newPlot("bubble", bubTraces, bubLayout);
        
        // 3. Demographic info function
        var demoCard = d3.select('#sample-metadata');
        demoCard.html("");
        Object.entries(targetDemo).forEach(([key,value]) => {
            var demoInfo = demoCard.append('p');
            demoInfo.text(`${key}:${value}`);
        });

        // 4. Gauge chart funtion 
        
        // var data = [
        //     {
        //       domain: { x: [0, 1], y: [0, 1] },
        //       value: 9,
        //       title: { text: "Speed" },
        //       type: "indicator",
        //       mode: "gauge+number+delta",
        //       delta: { reference: 380 },
        //       gauge: {
        //         axis: { range: [null, 500] },
        //         steps: [
        //             { range: [0, 1], color: "#f6f9eb" },
        //             { range: [1, 2], color: "#eef4d7" },
        //             { range: [2, 3], color: "#dce9af" },
        //             { range: [3, 4], color: "#cbdd88" },
        //             { range: [4, 5], color: "#b9d260" },
        //             { range: [5, 6], color: "#a8c738" },
        //             { range: [6, 7], color: "#869f2d" },
        //             { range: [7, 8], color: "#657722" },
        //             { range: [8, 9], color: "#435016" }
        //         ],
        //         threshold: {
        //           line: { color: "red", width: 4 },
        //           thickness: 0.75,
        //           value: 490
        //         }
        //       }
        //     }
        //   ];
          
        
        // Plotly.newPlot('gauge', data, layout);
        var wfreq = targetDemo.wfreq;
        var gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                value: wfreq,
                title: {text:"Scrubs per Week"  },
                type: "indicator",
                mode: "gauge+number+delta",
                gauge: {
                    axis: { range: [0, 9]},
                    // bar: { color: "darkblue" },
                    // bgcolor: "white",
                    // borderwidth: 2,
                    // bordercolor: "gray",
                    steps: [
                        { range: [0, 1], color: "#f6f9eb" },
                        { range: [1, 2], color: "#eef4d7" },
                        { range: [2, 3], color: "#dce9af" },
                        { range: [3, 4], color: "#cbdd88" },
                        { range: [4, 5], color: "#b9d260" },
                        { range: [5, 6], color: "#a8c738" },
                        { range: [6, 7], color: "#869f2d" },
                        { range: [7, 8], color: "#657722" },
                        { range: [8, 9], color: "#435016" }
                    ]}
            }
        ];

        var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);




        // var gaugeLayout = {width: 600, height: 500, margin: { t: 0, b: 0 } };
       
        // 
        
        // pie 
        // var traceGauge = {
        // type: 'pie',
        // showlegend: false,
        // hole: 0.4,
        // rotation: 90,
        // values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
        // text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        // direction: 'clockwise',
        // textinfo: 'text',
        // textposition: 'inside',
        // marker: {
        //     colors: ['#f6f9eb','#eef4d7','#dce9af','#cbdd88','#b9d260','#b9d260','#a8c738','#869f2d','#657722','#435016'],
        //     labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        //     hoverinfo: 'label'
        // }
        // };

        // // needle
        // var degrees = 50, radius = .9;
        // var radians = degrees * Math.PI / 180;
        // var x = -1 * radius * Math.cos(radians) * wfreq;
        // var y = radius * Math.sin(radians);

        // var gaugeLayout = {
        // shapes: [{
        //     type: 'line',
        //     x0: 0.5,
        //     y0: 0.5,
        //     x1: 0.6,
        //     y1: 0.6,
        //     line: {
        //     color: 'black',
        //     width: 3
        //     }
        // }],
        //     title: 'Belly Button Washing Frequency',
        //     xaxis: {visible: false, range: [-1, 1]},
        //     yaxis: {visible: false, range: [-1, 1]}
        // };

        // var dataGauge = [traceGauge];

        // Plotly.plot('gauge', dataGauge, gaugeLayout);

    });
};


// access the data stored in the json file
d3.json("./samples.json").then(data => {
    var dropdownMenu = d3.select("#selDataset");
    // extract the ids of all samples as a list
    var total = data.samples
    var samplesId = data.names;
    // create a loop to create an option dropdown for each sample id
    for (i=0; i<samplesId.length; i++) {
        var option = dropdownMenu.append('option');
        option.attr('value', samplesId[i]);
        option.text(samplesId[i]);
    };
    dropdownMenu.on("change", process);

});
