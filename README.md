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
<!--  -->
x = getSpanChart("Chart Title", "graphValues", "graphLabels", "axisTitles");
x.init();
x.makeBarChart();  //Bar Chart!
```



#### Live demo:
http://codepen.io/dburrell/pen/lGqgi
 
 

#### For example:

![ScreenShot](https://raw.github.com/dburrell/spanChart/master/scrshots/barChart.png)

