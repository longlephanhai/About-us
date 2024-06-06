var imgFeature = document.querySelector(".img-feature");
var listImg = document.querySelectorAll(".list-image img");
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");
var currentIndex = 0;
var autoSlideInterval;

// Function to update the image based on the index
function updateImageIndex(index) {
  // Remove active class from all list items
  document.querySelectorAll(".list-image div").forEach((item) => {
    item.classList.remove("active");
  });

  // Update current index
  currentIndex = index;

  // Update featured image source
  imgFeature.src = listImg[index].getAttribute("src");

  // Add active class to the current list item
  listImg[index].parentElement.classList.add("active");
}

// Function to handle the transition with animation
function changeImageWithAnimation(index, animation) {
  imgFeature.style.opacity = "0";
  setTimeout(() => {
    updateImageIndex(index);
    imgFeature.style.opacity = "1";
    imgFeature.style.animation = animation;
  }, 400);
}

// Event listeners for image clicks
listImg.forEach((imgElement, index) => {
  imgElement.addEventListener("click", (e) => {
    imgFeature.style.opacity = "0";
    setTimeout(() => {
      updateImageIndex(index);
      imgFeature.style.opacity = "1";
    }, 400);
  });
});

// Event listener for previous button
prevBtn.addEventListener("click", (e) => {
  if (currentIndex == 0) {
    currentIndex = listImg.length - 1;
  } else {
    currentIndex--;
  }

  imgFeature.style.animation = "";
  setTimeout(() => {
    updateImageIndex(currentIndex);
    imgFeature.style.animation = "slideLeft 1s ease-in-out forwards";
  }, 100);
});

// Event listener for next button
nextBtn.addEventListener("click", (e) => {
  if (currentIndex == listImg.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  imgFeature.style.animation = "";
  setTimeout(() => {
    updateImageIndex(currentIndex);
    imgFeature.style.animation = "slideRight 1s ease-in-out forwards";
  }, 100);
});

// Function to start auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (currentIndex == listImg.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    changeImageWithAnimation(
      currentIndex,
      "slideRight 1s ease-in-out forwards"
    );
  }, 3000); // Change image every 3 seconds
}

// Function to stop auto slide
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Start auto slide when the page loads
startAutoSlide();

// Stop auto slide on mouse enter and restart on mouse leave
imgFeature.addEventListener("mouseenter", stopAutoSlide);
imgFeature.addEventListener("mouseleave", startAutoSlide);

// Initialize with the first image
updateImageIndex(0);
