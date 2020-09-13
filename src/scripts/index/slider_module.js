//IIFE
(

  function() {
    console.log("INITIAL LOG")

    var  itemClassName =  "slide";
    var  items = document.getElementsByClassName("slide");

    console.log(items.length + " slides");

    var  totalLength = items.length,
         currentSlideIndex = 0,
         moving = true;

    //set event listeners
    function setEventListeners(){
      console.log("setEventListeners()");
      var nextButton =  document.getElementsByClassName("slider_btn btn_next")[0],
          prevButton =  document.getElementsByClassName("slider_btn btn_prev")[0];


      nextButton.addEventListener('click', moveRight);
      prevButton.addEventListener('click', moveLeft);
    }

    //set initial classes
    function setInitialClasses() {
      console.log("setInitialClasses()");
      items[0].classList.add("active");
      items[totalLength-1].classList.add("prev");
      items[1].classList.add("next");
    }

    //move current slide to the right
    function moveRight(){
      if(!moving){
        if(currentSlideIndex == (totalLength-1)){
          //to where we go
          currentSlideIndex = 0;
          console.log("moveRight() to " + currentSlideIndex);
        }else{
          //to where we go
          currentSlideIndex++;
          console.log("moveRight() to " + currentSlideIndex);
        }
        moveCarouselTo(currentSlideIndex,true);
      }
    }
    function moveLeft(){
      if(!moving){
        if(currentSlideIndex == 0){
            currentSlideIndex = (totalLength-1);
            console.log("moveLeft() to " + currentSlideIndex);
        }else{
            currentSlideIndex--;
            console.log("moveLeft() to " + currentSlideIndex);
        }
        moveCarouselTo(currentSlideIndex, false);
      }
    }

    function disableInteraction(){
      console.log("disableInteraction()");
      // Set 'moving' to true for the same duration as our transition.
      // (0.5s = 500ms), for example
      moving = true;
      //setTimeout runs its function once after the given time
      setTimeout(function(){
        moving = false
      }, 500);
    }

    function moveCarouselTo(slide, direction){
      //In normal/middle conditions
      // Update the "old" adjacent slides with "new" ones
      var newPrevious = slide - 1,
          newNext = slide + 1,
          oldPrevious,
          oldNext;

      if(direction){
        oldPrevious = slide-2;
        oldNext = slide;
      }else{
        oldNext = slide + 2;
        oldPrevious = slide;
      }

      console.log("moveCarouselTo(slide, direction)");
      if(!moving){
        //temporarily disable interactivity
        disableInteraction();

        if(totalLength < 3) alert("just a few slides");

        if(!(totalLength < 3)){
          //Right
          if(direction){
            if(slide == 0){
              oldPrevious = (totalLength-2);
              oldNext = slide;
              newPrevious = (totalLength-1);
            }
            if(slide == 1){
              oldPrevious = (totalLength -1);
              oldNext = slide;
            }
            if(slide == 2){
              oldNext = slide;
            }
            if(slide == (totalLength - 1)){
              newNext = 0;
              oldPrevious = (slide - 2);
              oldNext = slide;
            }
          }else{
            if(slide == 0){
              newPrevious = (totalLength-1);
              oldNext = (slide + 2);
              oldPrevious = slide;
            }
            if (slide == 1) {
              oldPrevious = slide;
            }
            if(slide == (totalLength - 1)){
              oldPrevious = slide;
              oldNext = (0+1);
              newNext = 0;
            }
            if(slide == (totalLength - 2)){
              oldPrevious = (totalLength - 2);
              oldNext = 0;
              oldPrevious = slide;
            }
          }
        }
      }
     // Now we've worked out where we are and where we're going,
     // by adding/removing classes we'll trigger the transitions.
     // Reset old next/prev elements to default classes

     console.log(oldNext + " oldNext");
     items[oldPrevious].className = itemClassName;
     items[oldNext].className = itemClassName;
     // Add new classes
     items[newPrevious].className = itemClassName + " prev";
     items[slide].className = itemClassName + " active";
     items[newNext].className = itemClassName + " next";
    }

    function initCarousel() {
      setInitialClasses();
      setEventListeners();
      // Set moving to false so that the carousel becomes interactive
      moving = false;
    }
    initCarousel();
  }
)();
