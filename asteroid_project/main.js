// asteroid image data
let asteroid_img_src = "Asteroid.png" 
let asteroid_explode_img_src = "Asteroid Destroyed.png"
let asteroid_damage_img_src = "Asteroid Damage.png" 
let Ship_img_src = "Space ship.png"
let Posx = 100
let Posy = 1
let Posx2 = 300
let Posy2 = 1
let Posx3 = 120
let Posy3 = 1
var ScoreNum = 0;
var LiveNum = 3;
const Scorecount = document.getElementById("Score")
const Lifecount = document.getElementById("Lives")

class StarShip
{
  constructor() 
  {
    // create the HTML element
    this.element = document.createElement('img')
    // set its image
    this.element.src = Ship_img_src
    // set width
    this.element.style.width = '700px'
    // set height
    this.element.style.height = '100px'
    //set the position
    this.element.style.position = 'fixed'
    this.element.style.left = "15" + "px"
    this.element.style.top = "850" + "px"
    //makes it unclickable
    this.element.style.pointerEvents = "none";
         //sets it to render behind other elements which have a default index of 0. but I decided not to use it.
         //this.element.style.zIndex = -1
    // add it to the page
    document.body.appendChild(this.element)
  }
}

class Asteroid 
{
  constructor() 
  {
    var Health = 1;
    this.Health = Health;
    
    // create the HTML element
    this.element = document.createElement('img')
    // set image opacity
    this.element.style.opacity = Health
    // set its image
    this.element.src = asteroid_img_src
    // set width
    this.element.style.width = '50px'
    // set height
    this.element.style.height = '50px'
    // add it to the page
    document.body.appendChild(this.element)
    
    
    // make it respond to clicks
    //this.element.onclick = this.clicked
    this.element.onclick = this.clicked
    
    // start it in the top-left
    this.setXY(0, 0)
  }

    //this function lets me set an x and y value and apply it to this asteroid-
  setXY(x, y) 
  {
    this.x = x
    this.y = y
    //then I set the elements position on the page to the x and y value
    this.element.style.position = 'fixed'
    this.element.style.left = this.x + "px"
    this.element.style.top = this.y + "px"
  }

  //when an asteroid is destroid it will become transparent and have a different image
  // this function will reset the opacity and image of the asteroid-
  //asteroids are reset only after reaching the bottom of the game area,
  //even if "destroyed" the asteroid will continue to fall until it reaches the bottom-
  //of the game area and is reset. this gives the illusion of new asteroids appearing
  //at random times, instead of as soon as destroyed.
  setNotExploded() 
  {
    
    this.element.src = asteroid_img_src
    if(this.element.Health == 1)
    {
      //Randomizes which sound will be played, creates a-
    // random number between 1 and 3 and sets the audio file to use based on that.
      var rand = (Math.floor(Math.random() * (3 - 1 + 1)) + 1)
      if(rand == 1)
      {
        var ShipHit = new Audio('Asteroid_explosion1.mp3');
         ShipHit.play();
      }
      if(rand == 2)
      {
        var ShipHit = new Audio('Asteroid_explosion2.mp3');
        ShipHit.play();
      }
      if(rand == 3)
      {
        var ShipHit = new Audio('Asteroid_explosion3.mp3');
        ShipHit.play();
      }
   
      LiveNum -= 1;
    }
    this.element.Health = 1;
    this.element.style.opacity = this.Health;
    
  }

  //this function is called when the asteroid reaches far enough down the page-
  //to hit the space ship, and changes the image to appear like-
  //it has hit something, before it is reset.
  setExplodedDamage() 
  {
    
      this.element.src = asteroid_damage_img_src
  }


  //function is called when you click an asteroid.
  //changes the image and sets the health and score. 
  clicked() 
  {
    //set a set sound instand and play it
      var AsteroidHit = new Audio('Lazer2.mp3');
       AsteroidHit.play();
    //set the image of the asteroid
    this.src = asteroid_explode_img_src
    //set asteroid health after explosion-
    // higher value under 1 will have a slower fade
    this.Health = 0.5;
    //increase player score.
    ScoreNum += 100;
    // console.log('asteroid clicked')
  }
  

  
  //when the asteroid is clicked and health is less then 1,
  //theopacity will decrease overtime until its invisable.  
  setFade()
  {
      if(this.element.Health < 1)
      {
      
      this.element.style.opacity -=0.03
      }
  }
}
//using the class created above this will create a starship in the gamearea.
let starShip = new StarShip()
//using the asteroid class created above this will create three separate-
//asteroids sharing the same code and characteristics
let asteroid = new Asteroid()
let asteroid2 = new Asteroid()
let asteroid3 = new Asteroid()
//this is the max positions for the asteroid. I dont want to exceed this. 
let max_x = 400
let max_y = 400



function moveAsteroidDown () 
{
  //call a function to set the asterioid opacity based on the health variable
  asteroid.setFade()
  asteroid2.setFade()
  asteroid3.setFade()

    //if the asteroid is below a certain point on the page 
    //this will change the asteroid image before it resets
    if(Posy > 840)
    {
      asteroid.setExplodedDamage()
    }
    if(Posy2 > 840)
    {
      asteroid2.setExplodedDamage()
    }
    if(Posy3 > 840)
    {
      asteroid3.setExplodedDamage()
    }


    //if the asteroid is below a certain point on the page
  if(Posy > 850)
  {
    //the position of the asteroid on the x axis is set to a random position-
    //between two max values.
    Posx = Math.min(Math.floor(Math.random() * max_x), max_x - 50)
    //when the asteroid is clicked the image is changed, this changes it back-
    //aswel as resetting its health and opacity. 
    asteroid.setNotExploded()
    //reset the asteroid position on the y to the top of the page and closes the loop for this condition. 
    Posy = 1;
  }
    //this repeats for each asteroid.
  if(Posy2 > 850)
  {
    Posx2 = Math.min(Math.floor(Math.random() * max_x), max_x - 50)
    asteroid2.setNotExploded()
    Posy2 = 1;
  }
  //this repeats for each asteroid.
  if(Posy3 > 850)
  {
    Posx3 = Math.min(Math.floor(Math.random() * max_x), max_x - 50)
    asteroid3.setNotExploded()
    Posy3 = 1;
  }



  //Updates the Html text to display the values in my score and lives variables.
  Scorecount.innerHTML = "Score:" + " " + ScoreNum
  Lifecount.innerHTML = "Lives:" + " " + LiveNum

  //Resets the score and lives when lives run out and display gameover
  if(LiveNum == 0)
  {
    window.alert('Game Over. Try again?')
    //after gameover altert is clicked, asteroid positions and score/lives are reset.
    Posy3 = 0.1;
    Posy2 = 0.1;
    Posy1 = 0.1;
    ScoreNum = 0
    LiveNum = 3
    
  }
  
  //Asteroid Movement---------

  //variables store values to later apply to the asteroids x and y position
  //the positions update each time this function loops,-
  //they travel at slightly different speeds. updating the x and y-
  //at the same time slows objects to travel at an angle.
  Posy += 2
  Posx += 0.2
  Posy2 += 3
  Posx2 += 0.1
  Posy3 += 2.4
  Posx3 += 0.4
  
  //apply the values of the position variables to the asteroids actual position-
  //using a function within my asteroid class.
  asteroid.setXY(Posx, Posy)
 
  asteroid2.setXY(Posx2, Posy2)
 
  asteroid3.setXY(Posx3, Posy3)

  //----Asteroid Movement-----
}

//creates and element on screen called game area and defines various parameters.
let gamearea = document.createElement('div')
//Makes it so backround elements arent effected by pointer clicks
gamearea.style.pointerEvents = "none";
gamearea.style.position = 'fixed'

gamearea.style.top = '0px'
gamearea.style.left = '0px'
gamearea.style.width = max_x + "px"
gamearea.style.height = max_y + "px"
//makes sure this element renders behind everything else by giving it the lowest index
gamearea.style.zIndex = -999
//adds the element to the document
document.body.appendChild(gamearea)

//set the speed at which the asteroid movement function is called.
//A lower number gives quicker smoother movement
setInterval(moveAsteroidDown, 12)