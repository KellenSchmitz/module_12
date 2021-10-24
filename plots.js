function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    washFreq(firstSample)
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  washFreq(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(function(data){
        return data.id === sample;
    })
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values
  
  // build the bubble chart
  var bubbleLayout = {
    title: "<b> Bacteria Culture Per Sample </b>",
    hovermode: "closest",
    xaxis: { title: "OTU ID"},
    margin: {t:30}
  }
  var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
  ];

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);


  // Bar chart
  var yticks = otu_ids.slice(0,10).map(function(otuID) {
    return `OTU ${otuID}`;
  }).reverse();

  var barData = [
    {
      y:yticks,
      x:sample_values.slice(0,10).reverse(),
      text:otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }
  ];

  var barLayout = {
    title: "Top Bacteria Culture Found",
    margin: {t: 50, l: 100}
  };

  Plotly.newPlot("bar", barData, barLayout);

  });
}

// Gauge Chart
  
function washFreq(sample) {
  d3.json("samples.json").then(function(data){
    var metadata = data.metadata;
    var resultArray = metadata.filter(function(data){
      return data.id == sample;
    })
    
    var result = resultArray[0];
    var wfreq = result.wfreq;
    var level = parseFloat(wfreq);

    var gaugeData = [ 
      {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title:"<b>Belly Button Washing Frequency</b> <br> Scrubs per Week </br>",
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: {range: [null, 10]},
            bar: {color: "black"},
            steps: [
              {range: [0,2], color:"coral"},
              {range: [2,4], color:"orange"},
              {range: [4,6], color:"lightyellow"},
              {range: [6,8], color:"palegreen"},
              {range: [8,10], color:"mediumseagreen"}
            ],
            threshold: {
              line: { color: "red", width:6},
              thickness: 1,
              value: 4
            }
          }
      }
    ];

    var gaugeLayout = { 
      width: 500, 
      height: 400, 
      margin: {t:10, b:0},
      
    };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  


  })

}


//   // 2. Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     // 3. Create a variable that holds the samples array. 

//     // 4. Create a variable that filters the samples for the object with the desired sample number.

//     //  5. Create a variable that holds the first sample in the array.


//     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.


//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 

//     var yticks = otu_ids.slice(0,10).map(function(otuID) {
//       return 'OTU ${otuID}';
//     })

//     // 8. Create the trace for the bar chart. 
//     var barData = [
      
//     ];
//     // 9. Create the layout for the bar chart. 
//     var barLayout = {
     
//     };
//     // 10. Use Plotly to plot the data with the layout. 
    
//   });
// }
