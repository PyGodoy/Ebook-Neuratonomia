class Carousel {
    constructor(container) {
      this.container = container;
      this.slides = container.querySelector('.slides');
      this.slideElements = container.querySelectorAll('.slide');
      this.prevButton = container.querySelector('.prev');
      this.nextButton = container.querySelector('.next');
      this.dotsContainer = container.querySelector('.carousel-dots');
      this.counter = container.querySelector('.slide-counter');
      
      this.currentSlide = 0;
      this.slideCount = this.slideElements.length;
      
      this.createDots();
      this.updateCounter();
      this.addEventListeners();
    }
    
    createDots() {
      for (let i = 0; i < this.slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => this.goToSlide(i));
        this.dotsContainer.appendChild(dot);
      }
    }
    
    updateDots() {
      const dots = this.dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === this.currentSlide);
      });
    }
    
    updateCounter() {
      this.counter.textContent = `${this.currentSlide + 1} / ${this.slideCount}`;
    }
    
    goToSlide(index) {
      this.currentSlide = index;
      this.slides.style.transform = `translateX(-${index * 100}%)`;
      this.updateDots();
      this.updateCounter();
    }
    
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slideCount;
      this.goToSlide(this.currentSlide);
    }
    
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
      this.goToSlide(this.currentSlide);
    }
    
    addEventListeners() {
      this.prevButton.addEventListener('click', () => this.prevSlide());
      this.nextButton.addEventListener('click', () => this.nextSlide());
      
      // Touch events for mobile swipe
      let touchStartX = 0;
      let touchEndX = 0;
      
      this.container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
      });
      
      this.container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
          this.nextSlide();
        } else if (touchEndX - touchStartX > 50) {
          this.prevSlide();
        }
      });
    }
  }
  
  // Initialize all carousels
  document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => new Carousel(container));
  });