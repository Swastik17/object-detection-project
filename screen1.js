img="";
status="";
objects=[];
function preload(){
img=loadImage('bedroom.jpg');
}
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status! objects detected";
}
function draw(){
image(img,0,0,380,380);
if(status != ""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML="status! objects detected";
        document.getElementById("number_of_objects").innerHTML="number of objects detected are "+objects.length;
        console.log("objects are detected");
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}