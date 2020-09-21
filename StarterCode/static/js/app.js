d3.json("./samples.json").then(data => {
    console.log("data",data);
    var btn = d3.select("#selDataset").node;
    // extract the ids of all samples as a list
    var samplesId = data.names;
    console.log("samplesID", samplesId);
    // create a loop to create an option dropdown for each sample id
    samplesId.forEach(id => {
        var option = btn.append('option');
        option.attr('value', id);
        option.text(id);
    });

    // // 1. Barchart function 
    // // extract the values, ids, and labels from the json file as lists.
    // var sampleValues = data.samples.sample_values
    // var otuIds = data.samples.otu_ids;
    // var otuLabels = data.samples.otu_labels;
    // console.log(sampleValues,otuIds,otuLabels);

    // //create a list to combine values, ids and labels together. 
    // let samplesInfo = [];
    // //create a loop to retrieve values from values, ids, and labels list.
    // for (i=0; i< sampleValues.length; i++) {
    //     // create a dictionary to store the value, id and label of each sample
    //     var sample = {};
    //     var sample.value = sampleValues[i];

    //     // push the sample dictionary to the samplesInfo list
    //     samplesInfo.push(sample);

    // };
    // console.log(samplesInfo);

    // // sort the dictionary by value descending
    // samplesInfo.sort((a,b) => (a.value - b.value));
    // // select samples with top ten values
    // var chartInfo = samplesInfo.slice(0,10);
    // // inverse the list to fit the horizontal bar chart
    // chartInfo.reverse();
    // var barValues = chartInfo.map(sample => sample.value);
    // var barIds = chartInfo.map(sample => sample.id);
    // var barLabels = chartInfo.map(sample => sample.label);
    // console.log(barValues,barIds,barLabels);

    // var bar1 = {
    //     type: 'bar',
    //     x: barValues,
    //     y: barIds,
    //     text: barLabels,
    //     oritention: 'h'
    // }

    // barTraces = [bar1];
    // var Barlayout = {
    //     title: "Top 10 OTUs",
    //     xaxis: {title: "Values"},
    //     yaxis: {title: "OTU id"}
    // };
    // Plotly.newPlot("bar",barTraces,barLayout);

    // 2. Bubble chart function
    // 3. Demographic info function
    // 4. Gauge chart funtion


});







