class image {
  constructor(src = '', width = 0, height = 0, alt = '') {
    this.src = src;
    this.width = width;
    this.height = height;
    this.alt = alt;
    this.loaded = false;
  }

  load() {
    return new Promise((resolve, reject) => {
      const img = typeof Image !== 'undefined' ? new Image() : null;
      if (!img) {
        reject(new Error('Image constructor is not available in this environment'));
        return;
      }

      img.src = this.src;
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
        this.loaded = true;
        resolve(this);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  }

  toObject() {
    return {
      src: this.src,
      width: this.width,
      height: this.height,
      alt: this.alt,
      loaded: this.loaded,
    };
  }

  render() {
    if (typeof document === 'undefined') {
      throw new Error('Document is not available in this environment');
    }

    const img = document.createElement('img');
    img.src = this.src;
    img.width = this.width;
    img.height = this.height;
    img.alt = this.alt;
    return img;
  }
}
