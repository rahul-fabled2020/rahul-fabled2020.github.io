/**
 * ImageLoader Class
 * It consists of images that are loaded by the means of load() method
 * It also contains the Ready Callbacks that are to be invoked when the images complete loading.
 */
class ImageLoader {
  constructor() {
    this.images = {};
    this.onReadyCallbacks = [];
  }

  /**
   * The load method takes url or array of urls of images and loads each images
   * @param {String or Array} imageURL
   */
  load(imageURL) {
    if (imageURL instanceof Array) {
      imageURL.forEach((url) => {
        this.loadImage(url);
      });
    } else {
        this.loadImage(imageURL);
    }
  }

  /**
   * The loadImage method creates an image for the given url. If the entry of url already exists in the images object then the method simply returns that image
   * @param {string} url; The url of the image
   * When the created image is loaded, it is added to the images object and the callbacks passed using onReady() method are called.
   */
  loadImage(url) {
    if (this.images[url]) {
      return this.images[url];
    } else {
      var img = new Image();
      img.onload = () => {
        this.images[url] = img;

        if (this.isReady()) {
          this.onReadyCallbacks.forEach(function (callback) {
            callback();
          });
        }
      };

      this.images[url] = false; //The image is not loaded
      img.src = url;
    }
  }

  /**
   * This method returns an image given url of the image that is present in the images object.
   * @param {String} url 
   * @return {HTML DOM} img
   */
  getImage(url) {
    return this.images[url];
  }

  /**
   * Checks if the the given url of the image is contained in images object.
   * Returns false if the image url is present in the images object but the image is not loaded
   * Returns true if the image is loaded.
   * @return {boolean} ready
   */
  isReady() {
    var ready = true;
    for (let imageUrl in this.images) {
      if (this.images.hasOwnProperty(imageUrl) && !this.images[imageUrl]) {
        ready = false;
      }
    }

    return ready;
  }

  /**
   * Appends the passed callback/function in  the onReadyCallbacks array to be called later when the images are loaded.
   * @param {function} callback 
   */
  onReady(callback) {
    this.onReadyCallbacks.push(callback);
  }
}
