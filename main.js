song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

leftwristX=0;
leftwristY=0;

rightwristX=0;
rightwristY=0;

leftwrist_score=0;
rightwrist_score=0;

results=[];

function preload(){
  song1 = loadSound("dancem.mp3");
  song2 = loadSound("end_of_time.mp3");
}

function setup(){
  canvas = createCanvas(600, 500);
  canvas.position(200 , 300);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results){
  if (results.length > 0){
   console.log(results);

   leftwristX=results[0].pose.leftWrist.x;
   leftwristY=results[0].pose.leftWrist.y;
   console.log("leftwristX =" + leftwristX + "leftwristY=" + leftwristY);

   rightwristX=results[0].pose.rightWrist.x;
   rightwristY=results[0].pose.rightWrist.y;
   console.log("rightwristX =" + rightwristX + "rightwristY=" + rightwristY);

   leftwrist_score=results[0].pose.keypoints[9].score;
   rightwrist_score=results[0].pose.keypoints[10].score;
   console.log("leftwrist score=" + leftwrist_score + "rightwrist score=" + rightwrist_score);
     }
  }  

function draw(){
image(video , 0 , 0 , 600 , 500);

song1_status = song1.isPlaying();
song2_status = song2.isPlaying();

fill("blue");
stroke("#black");

if( leftwrist_score > 0.2){
circle(leftwristX , leftwristY , 20);
  song2.stop();

  if( song1_status == false){
song1.play();
document.getElementById("song_name").innerHTML="Playing:- Dance Monkey";
  }
}

if( rightwrist_score > 0.2){
  circle(leftwristX , leftwristY , 20);
  song1.stop();

  if( song2_status == false){
    song2.play();
    document.getElementById("song_name").innerHTML="Playing:- End Of Time";
      }
  }

}
