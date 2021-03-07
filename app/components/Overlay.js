import React from "react";
import Sketch from "react-p5";

let x = 20;
let y = 20;
export default (props) => {


	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(300, 300).parent(canvasParentRef);
  		p5.angleMode(p5.DEGREES)
	};

	const draw =(p5) =>  {
	  p5.background(300)
	  p5.strokeWeight(2)
	  p5.noFill()


	  p5.translate(p5.width / 2, p5.height / 2)

	  // capturer.start();

	  for (var t = 0; t < 3; t++) {
	  	// console.log(props.getForm())

	    // capturer
	    // capturer.capture(canvas);

	    p5.stroke(100 - t * 20, 150 - t * 30, 220 - t * 30)
	    p5.stroke(props.color1)

	    p5.beginShape()
	    for (var i = 0; i < 359; i++) {
	  
	      var r1Min = p5.map(p5.sin(p5.frameCount), -1, 1, 50, 60)
	      var r1Max = p5.map(p5.sin(p5.frameCount * 2), -1, 1, 50, 20)
	  
	      var r2Min = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 60, 50)
	      var r2Max = p5.map(p5.sin(p5.frameCount), -1, 1, 20, 40)
	  
	      var r1 = p5.map(p5.sin(i * 3), -1, 1, r1Min, r1Max)
	      var r2 = p5.map(p5.sin((i * 3 + 90)), -1, 1, r2Min, r2Max)
	      var r = r1 - r2 + t * 10
	      var x = r * p5.cos(i)
	      var y = r * p5.sin(i)
	      p5.vertex(x, y)
	    }
	    p5.endShape(p5.CLOSE)


	    p5.stroke(50 - t * 20, 80 - t * 30, 130 - t * 30)
	    // p5.stroke('red')
	    p5.stroke(props.color2)



	    p5.beginShape()
	    for (var i = 0; i < 359; i++) {
	  
	      var r1Min = p5.map(p5.sin(p5.frameCount), -1, 1, 50, 60)
	      var r1Max = p5.map(p5.sin(p5.frameCount * 3), -1, 1, 50, 20)
	  
	      var r2Min = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 60, 50)
	      var r2Max = p5.map(p5.sin(p5.frameCount), -1, 1, 20, 50)
	  
	      var r1 = p5.map(p5.sin(i * 5), -1, 1, r1Min, r1Max)
	      var r2 = p5.map(p5.sin(i * 5 + 90), -1, 1, r2Min, r2Max)
	      var r = r1 + r2 - t * 20
	      var x = r * p5.cos(i)
	      var y = r * p5.sin(i)
	      p5.vertex(x, y)
	    }

	    // if(frameCount == 360) capturer.save();
	    p5.endShape(p5.CLOSE)
	}

  
}

	return <Sketch setup={setup} draw={draw} />;
};