class ImageManager {
    constructor (){
        this.images = {};
    }

    load(images, onDone, onProgress) {
        //The images queue
        var queue = [];
        for(let im in images) {
            queue.push(
                {
                    key: im,
                    path: images[im]
                }
            );
        }

        if(queue.length == 0){
            onProgress && onProgress(0,0,null,null, true);
            onDone && onDone();

            return;
        }

        var itemCounter = {
            loaded: 0,
            total: queue.length
        };

        for(let i=0; i<queue.length; i++) {
            this.loadItem(queue[i], itemCounter, onDone, onProgress);
        }
    }

    getImage(key) {

        return this.images[key];
    }

    loadItem(queueItem, itemCounter, onDone, onProgress) {
        var img = new Image();

        img.onload = () => {
            this.images[queueItem.key] = img;
            this.onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
        }

        img.onerror = () => {
            this.onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
        }

        img.src = queueItem.path;
    }

    onItemLoaded(queueItem, itemCounter, onDone, onProgress, success){
        itemCounter.loaded++;
        onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);

        if(itemCounter.loaded == itemCounter.total) {
            onDone && onDone();
        }
    }
}