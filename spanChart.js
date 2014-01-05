function toolTip(x,y,hint)
{
  $("#tooltip").remove();
  
  var gap = 15;
  
  var width = 100;
  var height= 50;
  var startCol = "#000";
  var endCol = "#333";
  
  $('body').append("<div id='tooltip' style='left:" + (x + gap) + "px; top:" + (y + gap) + "px; width: " + width +  "px; background: linear-gradient(to bottom, " + startCol + " 0%," + endCol + " 100%); color:#FFF;  border-style: solid; border-width: 1px; border-radius:10px; height:" + height + "px; position:absolute; vertical-align:middle; z-index:1002; text-align:center'><div style='position:relative; margin:auto auto; top:20%;'>" + hint + "</div></div>");  
  
  $("#tooltip").mouseover("function(){$('#tooltip').remove();}");
  
}


function removeToolTip()
{
  $('#tooltip').remove();
}



//THE FUNCTION
function getSpanChart(title, id, labelID, axisTitleID)
{  
  var s = 
      {        
        //GENERAL PREFERENCES
        displayValues:true,     // display values
        hideSourceDataBool:true,    // Hide the elements you took the data from
        titleColor:'#FFF',      // Colour of the title
        ran: 1,
        
        
        //POSITIONING
        anchorObject:"",        // an object to anchor to
        totalHeight:200,        // height
        totalWidth:500,         // width
        bottom:370,             // Y offset
        left:200,               // X offset
        gap:10,                 // gap between bars
        
        
        //ANIMATION
        animate:true,           // animate the bar growth
        animationTime:800,      // time taken for animation of each
        delayBetweenGrowth:10,  // delay between bar growth starts
        totalAnimationTime:1000,
        
        
        //COLOURS  
        colorStart:'#4572A7',
        barColorGradient:true,  // Each bar is slightly darker than the last
        barBorder:true,         // Should bars have borders
        barBorderColor:'#FFF',  //
        barTransparency:0.9,    //Bar Transparency!
        barWidth:0,
        
        
        //DATA LABELS
        labelYOffset:-20,       // Vertical offset for the label from the top of the bar
        labelXOffset:0,         // Horizontal offset for the label from center the bar
        labelWaitComplete:true, // Only animate in after all bars exist
        hintID:"graphLabels",   // hint text (e.g. in a pie chart)
        labelDistance:60,
        labelColor:'#FFF',
	tipLineColor:"",	// Color of the line pointing to data labels
        
        //BACKGROUND
        showBackground:true,    // Show a background        
        bgStartCol:'#5b584e',
        bgEndCol:'#1a1813',
        bgColor:'#3A3A3A',       // Background color for the charting area
        bgVPadding:100,         // Extra space around bars 
        bgHPadding:130,         // As above
        bgBorderCol:'#FFF',
        
	//CANVAS
	canvas:"",	
        
        //LINE CHART
        showDataLines:false,    //For bar charts, show lines
        showDataBars:true,      //For bar charts, show the bars
        showCurveLines:false,   //For bar charts, show curve lines
        shadeUnder:true,        //shading under curved lines 
        
        //PIE CHART
        innerRadius:50,        //Inner radius
        radius:150,
        polar:false,
        growOnEntry:false,
        
        
        //AXIS
        showAxis:true,          // Show axis at all
        axisColor:'#FFF',       // Color of the axis
        axisLabels:true,        // Show axis values	
        axisHPadding:30,        // Distance from the bars
        axisVPadding:1,         // Distance from the bars
        axisXSize:40,           // Height of X-Axis
        axisYSize:15,           // Width of Y-Axis
        axisFontColor:'#FFF',   // Font of the axis-data
        axisXturn90:false,      // Turn axis X labels by 90 degrees
        axisGrid:true,          // show horizontal lines for axis
        axisGridColor:'#888',   // color of the gridlines
        YAxisSkip:1,            // how many values to skip on Y axis
        YAxisLabelWidth:20,
        
        
        //shape objects
        shapes:new Array(),
        
        
        //init spanchart
        init: function()
        {
          s.ran = parseInt(Math.random()*500,0);                   // a random integer
          s.hideSourceData();
        },
        
        
        //destroy spanchart
        destroy: function()
        {
          $(".childOf"+s.ran).remove();
        },
        
        
        //hide the source data spanchart
        hideSourceData: function()
        {
          if (s.hideSourceDataBool)
          {
            $("#"+id).hide(); 
            $("#"+labelID).hide(); 
            $("#"+axisTitleID).hide(); 
          }
        },
        
        
        //get the data
        getData: function()
        {
          var values = $('#'+id).text().split(",");   // Get the values     
          return values;
        },
        
        
        //get hints
        getHints: function()
        {
          var hints = $('#' + s.hintID).text().split(",");
          return hints;
        },
        
        
        //Get sum of array elements
        getArraySum: function(arr)
        {
          var total = 0;   
          for (var i = 0; i < arr.length; i++)
          {
            total += parseFloat(arr[i],2);
          }     
          return total;
        },
        
        
        //Get sum of array elements
        getArrayHighest: function(arr)
        {
          var highest= 0;   
          for (var i = 0; i < arr.length; i++)
          {
            if (parseFloat(arr[i],2) > highest)
            { highest = arr[i];}
            
          }     
          return highest;
        },
        
        
        //convert decimal to radians         
        d2r: function(x)
        {
          return (x/360)*(2*Math.PI); 
        },
        
        //convert radians to decimal
        r2d: function(x)
        {
          return (x/(2*Math.PI))*360; 
        },
        
                
        addCanvas: function(y1, y2, x1, x2)
        {
          $("body").append("<canvas id='canvas" + s.ran + "' class='childOf" + s.ran + "' style='position:absolute; top:" + y2 + "px; left:" + x1 + "px;  ' height=" + (y2-y1) + "px width=" + (x2-x1) + "px></canvas>");
          $("#canvas" + s.ran).click(function(){s.graphClick();});
          
        },
        
        
        graphClick: function(event)
        {                    
          event = event || window.event;
          var x = event.clientX - s.left;
          var y = s.bottom - event.clientY;
                    
          for (var i = 0; i < s.shapes.length; i++)          
          {
            if (x >= s.shapes[i].startX && x <= (s.shapes[i].startX + s.barWidth) && y <= s.shapes[i].height)               
            {
              alert(i);
            }  
          }                    
        },
        
        
        
        
        graphHover: function(passedY, passedX)
        {           
          var shapeFound = null;
          var hintToShow = "";
          
          for (var i = 0; i < s.shapes.length; i++)          
          {
            var shape = s.shapes[i];
            
            //Square
            if (shape.square === true)
            {	      
              var x = passedX - s.left;
              var y = s.bottom - passedY;
	      
              if (x >= shape.startX && x <= (shape.startX + s.barWidth)
                  && y <= shape.height)                 
              {
                shapeFound = shape;
                hintToShow = shape.hint;
              }
            }
            
            //Triangle (cone...pie)
            if (shape.tri === true)
            {	      
              var x = Number(passedX) - (Number(s.left) + Number(s.totalWidth));
              var y = s.bottom - (passedY*1);
              
              var plusX = Math.max(x,0-x);
              var plusY = Math.max(y,0-y);
              
              var hyp = Math.sqrt((plusX*plusX)+(plusY*plusY));
              
              if (hyp < shape.radius && hyp > shape.innerRadius)
              {
              
                var a = 0;
                if (x > 0 && y > 0)
                {
                  //top right
                  a = 270 + s.r2d((Math.atan(x/y)));    
                }
                if (x > 0 && y < 0)
                {
                  //bottom right
                  a = s.r2d((Math.atan((0-y)/x)));    
                }
                if (x < 0 && y < 0)
                {
                  //bottom left
                  a = 90 + s.r2d((Math.atan((0-x)/(0-y))));    
                }
                if (x < 0 && y > 0)
                {
                  //bottom left
                  a = 180 + s.r2d((Math.atan(y/(0-x))));    
                }
             
                if (a >= shape.angle && a <= shape.angle2)
                {                
                  shapeFound = shape;
                  hintToShow = a;                                    
                }            
              }
            }                        
          }       
          
          if (hintToShow != "")
          {
            toolTip(passedX,passedY, shapeFound.hint);
          }
          else
          {
            removeToolTip(); 
          }                             
        },
        
        
        
        
        
        //Add background chart area
        addChartArea: function(left, top, width, height)
        {
          if (s.showBackground)
          {
            $('body').append("<div class='spanChartChartArea childOf" + s.ran + "' id='spanChartChartArea'"+s.ran+"' style='left:" + (left) + "px; top:" + top + "px; width: " + width +  "px; z-index:-100; background: linear-gradient(to bottom, " + s.bgStartCol + " 0%," + s.bgEndCol + " 100%);  border-style: solid; border-width: 1px; border-color: " + s.bgBorderCol + "; border-radius:20px; height:" + height + "px; position:absolute;'></div>");  
          }
        },
        
        
        //Calculate adjustment on colour
        colorDecrease: function(colorStart, totalDown, totalCt, ct, transparency)
        {     
          var r = parseInt(s.colorStart.substring(1,3),16);
          var g = parseInt(s.colorStart.substring(3,5),16);
          var b = parseInt(s.colorStart.substring(5,7),16);
          
          r -= parseInt((totalDown/totalCt)*ct,0);
          g -= parseInt((totalDown/totalCt)*ct,0);
          b -= parseInt((totalDown/totalCt)*ct,0);
          
          return  "rgba(" + r + "," + g + "," + b + "," + transparency + ")"; 
        },
        
        addDiv: function(newID, newClass, ran, left, top, width, height, color, bgColor, innerText)
        {
          $('body').append("<div id='" + newID + "'; class='" + newClass + " childOf" + ran + "' style='left:" + left + "px; top:" + top + "px; color:" + color + "; background-color:" + bgColor + ";  width: " + width + "px; height: " + height + "px; position:absolute;  text-align:center;'>" + innerText + "</div>");
          
        },
        
        
        shapeTest: function()
        {
          alert(s.shapes.length);
        },
        
        addShape: function(shape)
        {
          var l = s.shapes.length;
          s.shapes[l] = shape;
        },
        
        makeShape: function()
        {          
          var s = 
              {
                square:false,
                startX:0,
                startY:0,
                width:0,
                height:0,
                
                tri:false,
                angle:0,
                angle2:0,
                radius:0,
                innerRadius:0,
                
                hint:""
              };                                
          
          return s;          
        },
        
        
        //////////////////////////////////////////////
        //Polar Chart
        //////////////////////////////////////////////
        makePolarChart: function()
        { 
          s.polar = true;    
          s.innerRadius = 20;
          s.makePieChartOptions();
        },
        
        makePieChart: function()
	{
	  s.polar = false;
	  s.innerRadius = 0;  
	  s.makePieChartOptions();
	},
	
	makeDonutChart: function()
	{
	  s.polar = false;
	  s.innerRadius = 20;
	  s.makePieChartOptions();
	},
	  

	
	makeBarChart: function()
	{
	  s.showDataLines = false;
	  s.showDataBars = true;
	  s.showCurveLines = false;
	  s.makeBarChartOptions();
	},
	
	
        //////////////////////////////////////////////
        //Line Chart
        //////////////////////////////////////////////
        makeLineChart: function()
        {
          s.showDataLines = true;
          s.showDataBars = false;
          s.showCurveLines = false;
          s.makeBarChartOptions();
        },
        
        
        
        //////////////////////////////////////////////
        //Curve Chart
        //////////////////////////////////////////////
        makeCurveChart: function()
        {
          s.showDataLines = false;
          s.showDataBars = false;
          s.showCurveLines = true;
          s.makeBarChartOptions();
        },
        
        
        
        //////////////////////////////////////////////
        //Pie Chart
        //////////////////////////////////////////////
        
        ///////////////////////////////////
        //Make the pie chart
        ///////////////////////////////////
        makePieChartOptions: function()
        {                    
          if (s.anchorObject != "")
          {
            s.bottom = $("#" + s.anchorObject).offset().top + (s.totalWidth/2) + 30;            
            s.left = $("#" + s.anchorObject).offset().left - (s.totalWidth/2);
          }
          
          //Chart Area     
          s.addChartArea((s.left+(s.totalWidth/2)), (s.bottom-(s.totalWidth/2)-30), s.totalWidth, s.totalWidth+30);          
          
          //Title (COMMENTED 24-Dec-2013)
          //s.addDiv("chartIdTitle" + s.ran, "spanChartTitle", s.ran, (s.left + (s.totalWidth/2)), ((s.bottom - (s.totalHeight/2)) - 40), s.totalWidth , 0, s.titleColor, '#F00', title);
          
	  	  
	  
          //Canvas bits          
	  if (s.canvas == "") 
	  {
	    s.canvas = 'canvas' + s.ran;	    
	  	  
	    $("body").append("<canvas id='" + s.canvas + "' class='childOf" + s.ran + "' style='position:absolute; top:" + (s.bottom - (s.totalWidth/2)) + "px; left:" + (s.left+(s.totalWidth/2)) + "px;  ' height=" + s.totalWidth + "px width=" + s.totalWidth + "px></canvas>");
	
	  }
	  else
	  {	    
	    var canvasWidth = $("#" + s.canvas).css("width").replace("px","");
	    s.totalWidth = canvasWidth;	   
	    s.totalHeight = canvasWidth;
	    
	    var canvasTop = $("#" + s.canvas).offset().top;
	    var canvasLeft = $("#" + s.canvas).offset().left - canvasWidth/2;
	    	    	    	    	    
	    s.bottom = (canvasWidth/2) + (canvasTop*1);	    	    
	    s.left = canvasLeft; 
	  }
	  
	  
	  //Mouse detection
	  $("#" + s.canvas).mousemove(function() {var e=arguments[0] ; s.graphHover(e.pageY,e.pageX);});
	  $("#" + s.canvas).mouseout(function(){removeToolTip();});
		  
	  var canvas = document.getElementById(s.canvas);  // grab canvas element
	  var ctx = canvas.getContext('2d');                       // 2d context of element               
          s.ctx = ctx;                
	  s.ctx.translate(0.5, 0.5)
          s.callMakeSection( new Date().getTime(), canvas);        // recurring function (animation)                         
                    
          
        },
        
        //Animation function. Each call draws all the elements up to angle FC
        callMakeSection: function(startingTime, canvas)
        {
          s.ctx.clearRect(0, 0, canvas.width, canvas.height);               // clear canvas
	  s.ctx.webkitImageSmoothingEnabled = true;
	  s.ctx.imageSmoothingEnabled = true;
          var values = s.getData();                                         // graph the data
          
          var timeDiff = (new Date().getTime() - startingTime) ;            // duration so far     
          var fc = Math.min(360/(s.totalAnimationTime/timeDiff),360);       // big angle at this point
          
          var angleCum = 0;                                                 // start of next object
          
          s.shapes = new Array();
          for (var i = 0; i < values.length; i++)
          {                                         
            var sec = s.makeSection(s.ctx, canvas);                         // New section            
            sec.sAngle = angleCum;                                          // Start after last one
            sec.value = values[i];
            var ratio = 1;
            if (s.growOnEntry)
            {
              ratio = (fc/360);
            }
            if (s.polar)
            {
              angleCum += (fc / values.length);                             // increase angle sum       
              sec.radius = ratio * ((s.radius - s.innerRadius)/ s.getArrayHighest(values)) * values[i];
            }
            else
            {
              angleCum += (fc / s.getArraySum(values)) * values[i];         // increase angle sum       
              sec.radius = ratio * s.radius;
            }
           
	    sec.tipColor = s.labelColor;
            sec.eAngle = angleCum ;                                         // set end angle       
            sec.col1 = s.colorDecrease(s.colorStart, 40, values.length,i, s.barTransparency);  //
            sec.col2 = sec.col1;                                            // no inner gradient 
            if (fc >= 360)
            {sec.tip = s.getHints()[i];}                                    // set tip               
            sec.draw();                                                     // DRAW!                
          }
          
          if (fc < 360) 
          {  
            //call back on yourself IF haven't had 360 degrees yet
            requestAnimationFrame(function(){s.callMakeSection(startingTime, canvas);});       
          }
          
        },
        
        
        ///////////////////////////////////
        //Make a section of the pie chart
        ///////////////////////////////////
        makeSection: function(ctx, canvas)
        {
          var sec = 
              {           
                sAngle:0,
                
                eAngle:100,
                col1:"#000",
                col2:"#FFF",      
                tip:"",      
                tipColor:'#FFF',
                tipFont:'Verdana',
                tipSize:13,            
                totalTime:1000,
                radius:50,
                value:0,
                
                ///////////////////////
                //Draw
                ///////////////////////
                draw: function()
                {                                      
                  //Maths        
                  var a = s.d2r(sec.sAngle + ((sec.eAngle - sec.sAngle) / 2));
                  var halfWidth = s.totalWidth/2;
                  var labelX = ((sec.radius + s.labelDistance) * Math.cos(a)) + halfWidth ;
                  var labelY = ((sec.radius + s.labelDistance) * Math.sin(a)) + halfWidth ;
		  
		  //alert(labelY + "," + labelX);
                  var x2 = (s.radius * Math.cos(a)) + (s.totalWidth/2);
                  var y2 = (sec.radius * Math.sin(a)) + (s.totalWidth/2);         
                  var innerX = (s.innerRadius * Math.cos(s.d2r(sec.eAngle))) + halfWidth;
                  var innerY = (s.innerRadius * Math.sin(s.d2r(sec.eAngle))) + halfWidth;               
                  
                  
                  //shape management
                  var shape = s.makeShape();
                  shape.tri = true;                  
                  shape.angle = sec.sAngle;
                  shape.angle2 = sec.eAngle;
                  shape.radius = sec.radius;
                  shape.innerRadius = s.innerRadius;
                  shape.hint = "'" + sec.tip + "': " + sec.value;
                  s.addShape(shape);
                  
                  
                  //Colouring
                  ctx.beginPath();        
                  var grd = ctx.createLinearGradient(halfWidth, halfWidth, x2, y2);
                  grd.addColorStop(0,sec.col1);     
                  grd.addColorStop(1,sec.col2);                        
                  ctx.fillStyle = grd;          
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = s.barBorderColor;               
                  
                  //Line drawing
                  ctx.arc(halfWidth, halfWidth, sec.radius, s.d2r(sec.sAngle), s.d2r(sec.eAngle));
                  ctx.lineTo(innerX,innerY); 
                  ctx.arc(halfWidth, halfWidth, s.innerRadius, s.d2r(sec.eAngle), s.d2r(sec.sAngle), true);
                  ctx.closePath();
                  ctx.stroke();        
                  ctx.fill();
                  
		  
		  
                  //Add Tips
                  if (sec.tip !== "")
                  {
		    ctx.fillStyle = sec.tipColor;
		    ctx.textAlign = 'center';
		    ctx.font = sec.tipSize + "px " + sec.tipFont;
		    ctx.fillText(sec.tip, labelX , labelY); 
		    
		    var gap = 15;
                    
                    if (s.labelDistance > 0)
                    {
                      var lineX = ((sec.radius + gap) * Math.cos(a)) + halfWidth;
                      var lineY = ((sec.radius + gap) * Math.sin(a)) + halfWidth;    
                      var lineX2 = (((sec.radius + s.labelDistance) - gap) * Math.cos(a)) + halfWidth;
                      var lineY2 = (((sec.radius + s.labelDistance) - gap) * Math.sin(a)) + halfWidth;    
                      ctx.beginPath();
                      ctx.moveTo(lineX, lineY);
                      ctx.lineTo(lineX2,lineY2);
		      if (s.tipLineColor == "")
		      {
			ctx.strokeStyle = s.tipColor;         
		      }
		      else
		      {
			ctx.strokeStyle = s.tipLineColor;         
		      }
		      
                      ctx.stroke();         
                    }
                                        
                    $('.tooltip.childOf' + s.ran ).css("display","block");
                    $('.tooltip.childOf' + s.ran ).animate({opacity: 1});
		    
		    //Title
		    //ADDED 24-Dec-2013		        		    
		    ctx.fillStyle = s.titleColor;
		    ctx.textAlign = 'center';
		    ctx.font = s.tipSize + "px " + s.tipFont;
		    ctx.fillText(title, Number(s.totalWidth/2), 20);

                  }            
                }		
	      };
          return sec;
        },
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //////////////////////////////////////////////
        //Make Bar Chart
        //////////////////////////////////////////////
        
        makeBarChartOptions: function()
        {	  
	
	  
          var values = $('#'+id).text().split(",");                // Get the values     
          
          var topValue = Math.max.apply(Math, values);             // Find the highest value
          s.hideSourceData();                                      // Hide the data
                    
	  if (s.anchorObject != "")
          {	    
            s.bottom = $("#" + s.anchorObject).offset().top + s.totalHeight + (s.bgVPadding/2) ;            
            s.left =  $("#" + s.anchorObject).offset().left + (s.axisHPadding + s.axisYSize + s.bgHPadding)/2 ; 	                
          }
          
          ///////////////////////
          //Add Chart Area
          ///////////////////////
          if (s.showBackground)
          {
            //take into account the axis padding and space
            s.bgHPadding += s.axisHPadding + s.axisYSize;
            s.bgVPadding += s.axisVPadding + s.axisXSize;
            
            var bgLeft = s.left - (s.bgHPadding/2);
            var bgTop = (s.bottom - s.totalHeight) - (s.bgVPadding/2);
            var bgWidth = s.totalWidth + s.bgHPadding;
            var bgHeight = s.totalHeight + s.bgVPadding;    
            
            s.addChartArea(bgLeft, bgTop, bgWidth, bgHeight);    
          }
          
          
          //Canvas bits          
          var padding = 5;
          
	  if (s.canvas == "")
	  {	    
	    $("body").append("<canvas id='canvas" + s.ran + "' class='childOf" + s.ran + "' style='position:absolute; top:" + ((s.bottom - ((s.totalHeight + padding))) ) + "px; left:" + (s.left) + "px; background:rgba(64,64,64,0.0); ' height=" + (s.totalHeight + padding) + "px width=" + s.totalWidth + "px></canvas>");
	    
	    s.canvas = "canvas" + s.ran;
	  }
	  else
	  {
	    var canvasWidth = $("#" + s.canvas).css("width").replace("px","");
	    var canvasHeight = $("#" + s.canvas).css("height").replace("px","");
	    s.totalWidth = canvasWidth;
	    s.totalHeight = canvasHeight;
	    
	    var canvasTop = $("#" + s.canvas).offset().top;
	    var canvasLeft = $("#" + s.canvas).offset().left;
	    	    	    	    	    
	    s.bottom = Number(canvasHeight) + Number(canvasTop);	    	    
	    s.left = Number(canvasLeft);  
	  }
	  
	            
          $("#" + s.canvas).mousemove(function() {var e=arguments[0] ; s.graphHover(e.pageY,e.pageX);});
          $("#" + s.canvas).mouseout(function(){removeToolTip();});
          
          var canvas = document.getElementById(s.canvas);  // grab canvas element
          var ctx = canvas.getContext('2d');               // 2d context of element               
          
          //ANIMATE
          s.animateBarsHTML5(ctx, canvas, s.totalHeight, padding, new Date().getTime());
          
          
          
          
          
          
        },
        
        
        
        
        
        animateBarsHTML5: function(ctx, canvas, finalHeight, padding, startTime)
        {
          ctx.clearRect(0, 0, canvas.width, canvas.height);            // clear canvas          
          var values = $('#'+id).text().split(",");                    // Get the values               
	  var axisTitles = $('#'+ axisTitleID).text().split(",");  // Get the values 
          var xLabels = $('#'+labelID).text().split(",");          // Get the values 
          var topValue = Math.max.apply(Math, values);                 // Find the highest value          
          var barWidth = (((s.totalWidth - s.axisHPadding - s.axisYSize -5) / values.length) - s.gap) ;   // width of bars                 
          s.barWidth = barWidth;
          
          var bottomGraphPoint = Number(s.totalHeight) + padding - s.axisXSize;
	  var leftGraphPoint = s.axisHPadding + s.axisYSize;
	  
          var topGap = 40;
          
          //DRAW elements                   
          var timeDiff = ((new Date().getTime() - startTime)) ;
          var totalHeight = (finalHeight) * ((timeDiff)/(s.totalAnimationTime));
          
          totalHeight = Math.min(totalHeight, finalHeight);           
          var pxMult = ((totalHeight) - topGap - s.axisXSize)/topValue;                     // Pixel Multiplier
          pxMult = Math.max(pxMult,0);
          
          var pxMultAbs = ((finalHeight) - topGap - s.axisXSize)/topValue;                     // Pixel Multiplier              
          
          ctx.lineWidth = 2;
          ctx.strokeStyle = s.barBorderColor;               
          ctx.strokeStyle = s.tipColor;   
          
	  
	  
	  
	  
	  ///////////////////////////////////////
	  //Title
	  ///////////////////////////////////////	  	  
          ctx.fillStyle = s.titleColor;
	  ctx.textAlign = 'center';
	  ctx.font = s.tipSize + "px " + s.tipFont;
	  ctx.fillText(title, (s.totalWidth/2), 20);
	
	  
          ///////////////////////
          // X-Axis
          ///////////////////////  
          if (s.showAxis)
          {    
            //Line
	    ctx.beginPath();
	    ctx.moveTo(leftGraphPoint, bottomGraphPoint );
	    ctx.lineTo(s.totalWidth-s.gap, bottomGraphPoint );
	    ctx.stroke();
            
            //Values    
            var xLabels = $('#'+labelID).text().split(",");          // Get the values    
            for (var Xi = 0; Xi < xLabels.length; Xi++)
            {                                  
              ctx.fillStyle = s.titleColor;
	      ctx.textAlign = 'center';
	      ctx.font = s.tipSize + "px " + s.tipFont;
	      ctx.fillText(xLabels[Xi], (s.axisYSize + s.axisHPadding + (barWidth/2) + 2 + Xi*(s.gap + barWidth)), s.bottom - s.axisHPadding);	   	    
            }
            
            //Title          
            ctx.fillStyle = s.titleColor;
	    ctx.textAlign = 'center';
	    ctx.font = s.tipSize + "px " + s.tipFont;
	    ctx.fillText(axisTitles[0], (s.totalWidth/2), 10 + s.bottom - s.axisHPadding);	   
          }
	  
	  
	  ///////////////////////
          // Y-Axis
          ///////////////////////
          if (s.showAxis)
          {
            //Line
	    ctx.beginPath();
	    ctx.moveTo(leftGraphPoint, topGap);
	    ctx.lineTo(leftGraphPoint, bottomGraphPoint);
	    ctx.stroke();
            
            //Values
            for (var Yi = 0; Yi <= topValue; Yi += s.YAxisSkip)
            {
              ctx.fillStyle = s.titleColor;
	      ctx.textAlign = 'center';
	      ctx.font = s.tipSize + "px " + s.tipFont;
	      ctx.fillText(Yi, s.axisHPadding, bottomGraphPoint - (Yi* pxMultAbs)) ;
	      
              if (s.axisGrid)
              {  		
		ctx.beginPath();
		ctx.moveTo(leftGraphPoint, bottomGraphPoint - (Yi* pxMultAbs) );
		ctx.lineTo(s.totalWidth-s.gap, bottomGraphPoint - (Yi* pxMultAbs) );
		ctx.stroke();
              }
            }
          }
	  
	  
	  ///////////////////////
          //Data labels
          ///////////////////////                    
	  if (s.displayValues) 
	  {            
	    for (var i = 0; i < values.length; i++)
	    {                         
	      var labelLeft = (s.axisYSize + s.axisHPadding + (barWidth/2) + 2 + i*(s.gap + barWidth))
              var labelTop = (bottomGraphPoint - (values[i] * pxMult))-5;
              
	      ctx.fillStyle = s.titleColor;
	      ctx.textAlign = 'center';
	      ctx.font = s.tipSize + "px " + s.tipFont;
	      ctx.fillText(values[i], labelLeft, labelTop);	      	              
	    }
	  }
	  
	  
	  
	  
          ///////////////////////////////////////
          //Data bars
          ///////////////////////////////////////
          if (s.showDataBars)
          {
            //clear shapes made
            s.shapes = new Array();
            
            for (var i = 0; i < values.length; i++)
            { 
              //Calculations for each bar
              var newID = "chartIDBar" + i + s.ran;
              var val = values[i];               
              var barHeight = (val * pxMult);            
              
              var x1 = s.axisHPadding + s.axisYSize + 2 + ((barWidth + s.gap) * i);
              var x2 = 2 + x1 + barWidth;
              var y1 = (Number(s.totalHeight) + padding) - s.axisXSize;	      
              var y2 = y1 - (barHeight);
              
              
              //Add to shapes array
              var newShape = s.makeShape();
              newShape.square = true;
              newShape.startX = x1;
              newShape.startY = y1;
              newShape.width = barWidth;
              newShape.height = barHeight;
              newShape.hint = xLabels[i] + ": " + val;
              s.addShape(newShape);
              
              
              //Draw in the canvas
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x1, y2);
              ctx.lineTo(x2, y2);
              ctx.lineTo(x2, y1);              
              var col1 = s.colorDecrease(s.colorStart, 40, values.length, i, s.barTransparency);
              var col2 = col1;            
              var grd = ctx.createLinearGradient(x1, y1, x1, y2);            
              grd.addColorStop(0,col1);                 
              grd.addColorStop(1,col2);                                                
              ctx.fillStyle = grd;                                           
              ctx.stroke();                  
              ctx.fill();              
            }
          }
          
          
          
          
          ///////////////////////////////////////
          //Data Lines
          ///////////////////////////////////////
          if (s.showDataLines)
          {         
            ctx.beginPath();
            //ctx.moveTo((barWidth/2), (s.totalHeight + padding)  );
	    ctx.moveTo((barWidth/2) + s.axisYSize + s.axisHPadding , bottomGraphPoint  );
            
	    
	    
            for (var i = 0; i < values.length; i++)
            {                             
              var newID = "chartIDLine" + i + s.ran;
              var val = values[i];               
              var barHeight = (val * pxMult);                          
              
              //LINES
              if (s.showDataLines)
              {                
                var starter = 1;
                if (s.shadeUnder)
                {
                  starter = 0; 
                }
                
                if (i >= starter)
                {
		  
		  
                  if (i!==0)
                  {		    
                    y1 = (Number(s.totalHeight) + Number(padding)) - (values[i-1] * pxMult);
                    x1 = (barWidth/2) + ((Number(barWidth) + Number(s.gap)) * (i-1));                  
		    
                  }
                
		  
		  var pxMult = ((totalHeight) - topGap - s.axisXSize)/topValue;                     // Pixel Multiplier              
		  pxMult = Math.max(pxMult,0);
		  var val = values[i];               
		  var barHeight = (val * pxMult);            
              
		  //findme
		  //(s.axisYSize + s.axisHPadding + (barWidth/2) + 2 + Xi*(s.gap + barWidth))
		  //var x1 = s.axisHPadding + s.axisYSize + 2 + ((barWidth) * i) + barWidth/2;
		  var x1 = s.axisYSize + s.axisHPadding + (barWidth/2) + (i-1) * (s.gap + barWidth);		 
		  var x2 = x1 + barWidth + s.gap ;
		  
		  
		  var y1 = 0;	//holder - gets changed below
		  var y2 = 0;	//holder - gets changed below
                
 		  if (i==starter && s.shadeUnder)
		  {
		    y1 = bottomGraphPoint ;
		    y2 = bottomGraphPoint - (values[i] * pxMult);
		  }
		  else
		  {		    
		    y1 = bottomGraphPoint - (values[i-1] * pxMult);
		    y2 = bottomGraphPoint - (values[i] * pxMult)
		  }
		  
		  
                  var col1 = s.colorDecrease(s.colorStart, 40, values.length, i, s.barTransparency)
                  var col2 = col1;            
                  var grd = ctx.createLinearGradient(x1, y1, x1, y2);            
                  
		  grd.addColorStop(0, col1);
                  grd.addColorStop(1, col2);
                  ctx.fillStyle = grd;                 
                  
                  
                  if (!s.shadeUnder)
                  {		   		    
                    ctx.moveTo(x1, y1);
                  }
                  ctx.lineTo(x2, y2);
                  
                  if (i === values.length - 1 && (s.shadeUnder))
                  {
		    ctx.lineTo(x2, bottomGraphPoint);                  
		    ctx.closePath();
                  }
                  
                  ctx.stroke();    //Draw the line
                }                     
              }              
            }
            
            if (s.shadeUnder)
            {
              //var grd = ctx.createLinearGradient(0, 0, 0, s.totalHeight);
	      var grd = ctx.createLinearGradient(0, 0, 0, bottomGraphPoint);          
              grd.addColorStop(0,s.colorStart);                 
              grd.addColorStop(1,s.colorDecrease(s.colorStart, 60, values.length, values.length, s.barTransparency));                   
              ctx.fillStyle = grd;                 
              ctx.fill();
            }            
          }
          
          
          ///////////////////////////////////////
          //Curve Lines
          ///////////////////////////////////////
          if (s.showCurveLines)
          {
            
	    var pxMult = ((totalHeight) - topGap - s.axisXSize)/topValue;                     // Pixel Multiplier              
	    pxMult = Math.max(pxMult,0);
		  
            if (s.shadeUnder)
            {              
              ctx.beginPath();    
	      ctx.moveTo((barWidth/2) + s.axisYSize + s.axisHPadding , bottomGraphPoint);
              
	      ctx.lineTo((barWidth/2) + s.axisYSize + s.axisHPadding, bottomGraphPoint - (values[0] * pxMult));
	      
	      
	      
              ctx.stroke();
            }
            
            for (var i = 0; i < values.length; i++)
            {           
              var newID = "chartIDCurve" + i + s.ran;
	      
              var val = values[i];               
              var barHeight = (val * pxMult);            
              
              if (!s.shadeUnder)
              {
                ctx.beginPath();
              }
              
              if (i > 0)
              {
                var y1 = (s.totalHeight + padding) - (values[i-1] * pxMult);
                var x1 = (barWidth/2) + ((barWidth + s.gap) * (i-1));
                
                var x2 = (barWidth/2) + ((barWidth + s.gap) * i);                
                var y2 = (s.totalHeight + padding) - (barHeight);
                
		
		
		var x1 = s.axisYSize + s.axisHPadding + (barWidth/2) + (i-1) * (s.gap + barWidth);		 
		var x2 = x1 + barWidth + s.gap ;
		  
		
		var y1 = 0;	//holder - gets changed below
		var y2 = 0;	//holder - gets changed below
	      
		if (i==starter && s.shadeUnder)
		{
		  y1 = bottomGraphPoint ;
		  y2 = bottomGraphPoint - (values[i] * pxMult);
		}
		else
		{		    
		  y1 = bottomGraphPoint - (values[i-1] * pxMult);
		  y2 = bottomGraphPoint - (values[i] * pxMult)
		}
		
		
		
                if (!s.shadeUnder)
                {
                  ctx.moveTo(x1, y1);
                }
                ctx.bezierCurveTo(x2-(barWidth/2), y1, x2-(barWidth/2), y2, x2, y2);
                
                if (i === values.length - 1 && (s.shadeUnder))
                {
                  //ctx.lineTo(x2, (s.totalHeight + padding));
		  ctx.lineTo(x2, bottomGraphPoint);                  
                }
                
                ctx.stroke();  
              }              
            }
            
            if (s.shadeUnder)
            {        
              ctx.closePath();
              var grd = ctx.createLinearGradient(0, 0, 0, s.totalHeight);          
              grd.addColorStop(0,s.colorStart);                 
              grd.addColorStop(1,s.colorDecrease(s.colorStart, 60, values.length, values.length, s.barTransparency));                   
              ctx.fillStyle = grd;                 
              ctx.fill();
            }            
          }
          
          
          
          
          
          if (totalHeight < finalHeight)
          {
	    //Keep animating
	    //findme
	      requestAnimationFrame(function(){s.animateBarsHTML5(ctx, canvas, finalHeight, padding, startTime);});           	    
	  } 
	  else	    
	  {
	    //finalise
	    
	  }
        }                
      };
  return s;
}


