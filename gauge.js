
function buildGaugeChart(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];

      var wfreq = result.wfreq
    
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

    
    // Gauge Chart
    var gaugeData = [ 
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Speed" },
        type: "indicator",
        mode: "gauge+number"
    }
    ];
    
    var gaugeLayout = { 
    width: 500, 
    height: 400, 
    margin: {t:0, b:0}
    };
    
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
      });
  


    });
  }









