#### Create graphs &amp; charts using data from simple html elements

Selling points:

 * Object oriented - create, edit & destroy graphs programatically
 * HTML5 canvas based - compatible with all major browsers, **no plugins required**
 * Completely customisable - a huge range of customisation options are available for adjustment before drawing.

 
#### Easy to use:
```
<!-- Add html elements (in this case spans) with the data setup -->

<span id="graphValues">3,4,5,4,8,2.8,3,10</span><br>
<span id="graphLabels">Jan,Feb,Mar,Apr,May,Jun,Jul,Aug</span><br>
<span id="axisTitles">Months, Numbers</span><br>

<script>
  //Instanciate the object, initialise and then call one simple function
  x = getSpanChart("Chart Title", "graphValues", "graphLabels", "axisTitles");
  x.init();
  x.makeBarChart();
</script>
```


#### Easy to customise:
```
<script>
  x = getSpanChart("Chart Title", "graphValues", "graphLabels", "axisTitles");
  x.init();


  //Below are all OPTIONAL attributes. In this case we're building a pie chart.
 
  x.colorStart = '#72A745';	// rustom colour to start with
  x.radius = 100;		// radius of pie chart
  x.bottom = 630;		// X positioning
  x.left = -100;		// Y positioning
  x.totalWidth = 250;		// width (everything scales out) 
  x.labelDistance = -25;	// distance from pie segment to data label
  x.bgStartCol = '#9B9';	// starting colour for gradient of the background
  x.bgEndCol = '#ABA';		// finishing colour for gradient of the background
  x.bgBorderCol = '#000';	// Colour of border
  x.titleColor = '#000';	// Colour of title


  //Then simple function to draw (in this case a pie chart)

  x.makePieChart();      	// Pie chart!
 
</script>
```


#### Live demo:
http://codepen.io/dburrell/pen/lGqgi
 
 
#### Sample screenshot:

![ScreenShot](https://raw.github.com/dburrell/spanChart/master/scrshots/barChart.png)

