let all_stars = [];
let starNumber = 1000;
let hyperspeed = false;
let curr_speed;

let speed_slider;
let button;

// initialize color settings
let star_hue = 200; // stars are lighter blue
let star_sat;
let line_hue = 220; // lines are darker blue
let line_sat;


function setup() {
    createCanvas(600,600);
    for (i=0; i<starNumber; i++) {
        all_stars[i] = new make_a_star();
    }
    speed_slider = createSlider(0, 40, 20, 1); // (min_val, max_val, start_val, increment)
    // add button to jump to hyperspace
    button = createButton('Jump to Hyperspace');
    button.mousePressed(change2hyperspeed);
}

function change2hyperspeed() {
    hyperspeed = !hyperspeed;
}

function draw() { 
    background(0);
    translate(width/2, height/2); // set center to center of window

    for (i=0; i<all_stars.length; i++) { //for each star, update its position and show it
        all_stars[i].update(hyperspeed);
        all_stars[i].show();
    }
}


function make_a_star() {
    colorMode(HSB);
    // makes a star at a random position
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    // this.previous_z = this.z; // previous z

    this.update = function (hyperspeed) {
        let speed_from_slider = speed_slider.value();

        if (hyperspeed) {
            curr_speed = 300; // take hyperspeed speed as input
            star_sat = 60; // change the color back to white
            line_sat = 100;
        } else {
            curr_speed = speed_from_slider; // take speed as input from the slider
            star_sat = 0; // change the color back to white
            line_sat = 0;
        }
        this.z = this.z - curr_speed;
        if (this.z < 1) {
          this.z = width;
          this.x = random(-width, width);
          this.y = random(-height, height);
          this.previous_z = this.z;
        }
    }

    this.show = function () {
        fill(star_hue,star_sat,100); // the fill for the ellipses (star)
        noStroke();

        // draws ellipses that move w/ consecutive frames as the function updates
        var current_x = map(this.x / this.z, 0, 1, 0, width);
        var current_y = map(this.y / this.z, 0, 1, 0, height);
        var star_radius = map(this.z, 0, width, 10, 0);
        ellipse(current_x, current_y, star_radius, star_radius);
    
        // makes a previous x and y for drawing a line
        var previous_x = map(this.x / this.previous_z, 0, 1, 0, width); 
        var previous_y = map(this.y / this.previous_z, 0, 1, 0, height);
        this.previous_z = this.z; // update the previous position to the new position
    
        stroke(line_hue,line_sat,100); // the color of the lines trailing the dots

        // makes a line betwixt the current and previous positions to show illusion of motion
        line(previous_x, previous_y, current_x, current_y);
    }
}