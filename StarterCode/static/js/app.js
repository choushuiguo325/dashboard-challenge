
function process() {
    var dropdownMenu = d3.select("#selDataset");
    var targetId = dropdownMenu.property('value');
    console.log("id",targetId);
    // console.log("total",total);
    d3.json("./samples.json").then(data => {
        samplesLists = data.samples;
        console.log("list",samplesLists);

        // 1. Barchart function 
        // extract the values, ids, and labels from total.
        var targetSample = samplesLists.filter(sample => parseInt(sample.id) === parseInt(targetId))[0];
        console.log(targetSample);
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
        console.log("original sample",samplesInfo);

        // sort the dictionary by value descending
        samplesInfo.sort((a,b) => b.value - a.value);
        console.log("sorted sample",samplesInfo);
        
        // select samples with top ten values
        var chartInfo = samplesInfo.slice(0,10);
        // inverse the list to fit the horizontal bar chart
        chartInfo.reverse();
        console.log("chart",chartInfo);
        var barValues = chartInfo.map(sample => sample.value);
        var barIds = chartInfo.map(sample => `OTU ${sample.id}`);
        var barLabels = chartInfo.map(sample => sample.label);
        console.log("value, id, labels",barValues,barIds,barLabels);

        var bar1 = {
            type: 'bar',
            orientation: 'h',
            x: barValues,
            y: barIds,
            text: barLabels,
            
        }

        barTraces = [bar1];

        var layout = {
            title: "Top 10 OTUs",
            xaxis: {title: "Values"},
            yaxis: {title: "OTU id"}
        };

        Plotly.newPlot("bar", barTraces, layout);

    });
    // d3.event.preventDefault();

    

    // 2. Bubble chart function
    // 3. Demographic info function
    // 4. Gauge chart funtion 
};



    



// access the data stored in the json file
d3.json("./samples.json").then(data => {
    console.log("data",data);
    var dropdownMenu = d3.select("#selDataset");
    // extract the ids of all samples as a list
    var total = data.samples
    var samplesId = data.names;
    console.log("samplesID", samplesId);
    // create a loop to create an option dropdown for each sample id
    for (i=0; i<samplesId.length; i++) {
        var option = dropdownMenu.append('option');
        option.attr('value', samplesId[i]);
        option.text(samplesId[i]);
    };
    dropdownMenu.on("change", process);
});







