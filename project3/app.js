/**
 * ImageCarousel Module
 * A modular ES6 vanilla JavaScript module for creating a responsive image carousel
 * 
 * Features:
 * - Navigates through slides with Previous/Next buttons
 * - Wraps around at boundaries (last slide → first slide, vice versa)
 * - Uses vanilla JS (no frameworks or libraries)
 * - Clean, documented code with proper separation of concerns
 */

class ImageCarousel {
    /**
     * Initialize the carousel
     * @param {Object} options - Configuration object
     * @param {string} options.slidesSelector - CSS selector for slide elements (default: '.slide')
     * @param {string} options.prevBtnSelector - CSS selector for previous button (default: '#prevBtn')
     * @param {string} options.nextBtnSelector - CSS selector for next button (default: '#nextBtn')
     * @param {string} options.activeClass - CSS class for active slide (default: 'active')
     */
    constructor(options = {}) {
        // Configuration with defaults
        const config = {
            slidesSelector: '.slide',
            prevBtnSelector: '#prevBtn',
            nextBtnSelector: '#nextBtn',
            activeClass: 'active',
            ...options
        };

        // Query DOM elements
        this.slides = document.querySelectorAll(config.slidesSelector);
        this.prevBtn = document.querySelector(config.prevBtnSelector);
        this.nextBtn = document.querySelector(config.nextBtnSelector);
        this.activeClass = config.activeClass;

        // Validate that elements exist
        if (!this.slides.length || !this.prevBtn || !this.nextBtn) {
            console.error('Carousel: Required DOM elements not found');
            return;
        }

        // Initialize state
        this.currentIndex = 0;

        // Bind methods to preserve 'this' context
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);

        // Initialize the carousel
        this.init();
    }

    /**
     * Initialize event listeners and render initial state
     */
    init() {
        this.attachEventListeners();
        this.updateCarousel();
    }

    /**
     * Attach click event listeners to navigation buttons
     */
    attachEventListeners() {
        this.prevBtn.addEventListener('click', this.handlePrevClick);
        this.nextBtn.addEventListener('click', this.handleNextClick);
    }

    /**
     * Handle previous button click - navigate to previous slide with wrap-around
     */
    handlePrevClick() {
        // Use modulo arithmetic to wrap around: (index - 1 + total) % total
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }

    /**
     * Handle next button click - navigate to next slide with wrap-around
     */
    handleNextClick() {
        // Use modulo arithmetic to wrap around: (index + 1) % total
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }

    /**
     * Update the carousel visual state in the DOM
     * Adds the active class to the current slide and removes it from others
     */
    updateCarousel() {
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add(this.activeClass);
            } else {
                slide.classList.remove(this.activeClass);
            }
        });
    }

    /**
     * Programmatically navigate to a specific slide
     * @param {number} index - The slide index to navigate to
     */
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentIndex = index;
            this.updateCarousel();
        } else {
            console.warn(`Carousel: Slide index ${index} is out of bounds`);
        }
    }

    /**
     * Get the current slide index
     * @returns {number} The current slide index
     */
    getCurrentIndex() {
        return this.currentIndex;
    }

    /**
     * Get the total number of slides
     * @returns {number} The number of slides
     */
    getTotalSlides() {
        return this.slides.length;
    }

    /**
     * Destroy the carousel and remove event listeners
     */
    destroy() {
        this.prevBtn.removeEventListener('click', this.handlePrevClick);
        this.nextBtn.removeEventListener('click', this.handleNextClick);
    }
}

/**
 * Auto-initialize carousel when DOM is ready
 * Remove or modify this if you prefer to initialize manually
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with default selectors
    const carousel = new ImageCarousel();
    
    // Optional: Expose to window for manual control
    window.carousel = carousel;
});
