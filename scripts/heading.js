/* H1 heading curvature */

// define variable
const h1Heading = new CircleType(document.getElementById('h1-heading'));

// function for resizing curvature
function updateRadius(){
  h1Heading.radius(h1Heading.element.offsetWidth / 2);
}

// default radius
updateRadius();

// radius change when resizing window
window.addEventListener('resize', updateRadius);