const animationDuration = 200;
const images = Array.from(document.getElementsByClassName('photo'));
const carousel = document.getElementsByClassName('carousel')[0];

function animate(start, finish, fps, duration, callback){
    const count = parseInt(fps * duration / 1000);
    if (finish === start)
        return Promise.resolve(finish);
    return new Promise((resolve) => {
        const step = (finish - start)/(count - 1);
        let value = start;
        callback(value);
        let interval = setInterval(()=>{
            value += step;
            if ((finish > start && value > finish - step/2) || 
                (finish < start && value < finish - step/2))
            {
                callback(finish);
                clearInterval(interval);
                resolve(finish);
            }
            else {
                callback(value);
            }
        }, duration/count);
    });
}

const cards = images.map((img, index) => {
    return {
        shiftX: 0,
        _shiftX: 0,
        baseX: index * 100,
        img: img,
        animate: function(){
            return new Promise((resolve) => {
                animate(this._shiftX, this.shiftX, 60, animationDuration, (v)=>{
                    this.img.style.transform = 'translateX('+parseInt(v)+'%)';
                }).then((v)=>{
                    this._shiftX = v;
                    resolve();
                });
            });
        },

        noAnimate: function(){
            this.img.style.transform = 'translateX('+this.shiftX+'%)';
        },

        fixLeft: function() {
            if (this.actualShiftX() <= -100) {
                this.shiftX += 400;
                this._shiftX += 400;
                this.noAnimate();
            }
        },

        fixRight: function() {
            if (this.actualShiftX() > 300) {
                this.shiftX -= 400;
                this._shiftX -= 400;
                this.noAnimate();
            }
        },

        apply: function(){
            this.fixRight();
            this.img.style.zIndex = parseInt((this.actualShiftX()+300)/100);
            this.animate().then(()=>{
                this.fixLeft();
            });
        },

        actualShiftX: function(){
            return this.baseX + this.shiftX;
        }
    }
});

let disabled = false;

cards.forEach(card => {
    card.img.onclick = function(e){
        let step = -card.actualShiftX();
        move(step);
    }
});


carousel.onwheel = (e)=>{
    move(-e.deltaY);
};

function move(step){
    if (step > 0){
        step = 100;
    }
    if (step < 0){
        step = -100;
    }
    return new Promise((resolve) => {
        if (!disabled && step){
            disabled = true;
            cards.forEach(c => {
                c.shiftX += step;
                c.apply();
            });
            setTimeout(()=>{
                disabled = false;
                resolve();
            }, animationDuration + 100);
        }
    });
}

/***********************************/
let moving = null;
carousel.addEventListener('touchstart', (e) => {
    if (moving === null){
        moving = e.touches[0].clientX;
    }
});
carousel.addEventListener('touchmove', (e) => {
    const x = e.touches[0].clientX;
    console.log(moving, x);
    if (moving && x != moving){
        const step = x - moving;
        moving = undefined;
        move(step).then(()=>{
            moving = null;
        });
    }
});