const animationDuration = 200;
const images = Array.from(document.getElementsByClassName('photo'));
const cards = images.map((img, index) => {
    return {
        shiftX: 0,
        baseX: index * 100,
        img: img,
        animate: function(){
            this.img.style.transform = 'translateX('+this.shiftX+'%)';
        },
        noAnimate: function(callback){
            const self = this;
            const transition = this.img.style.transition;
            this.img.style.transition = 'all 0.001s linear';
            this.img.style.opacity = 0;
            callback();
            self.animate();

            setTimeout(function(){
                self.img.style.opacity = 1;
                self.img.style.transition = transition;
            }, animationDuration);
        },
        fixLeft: function() {
            if (this.actualShiftX() <= -100) {
                this.noAnimate(() => {
                    this.shiftX += 400;
                });
            }
        },
        fixRight: function() {
            if (this.actualShiftX() > 300) {
                this.noAnimate(() => {
                    this.shiftX -= 400;
                });
            }
        },
        apply: function(){
            this.img.style.zIndex = parseInt((this.actualShiftX()+300)/100);
            this.fixRight();
            this.animate();
            setTimeout(() => this.fixLeft(), animationDuration);
        },
        actualShiftX: function(){
            return this.baseX + this.shiftX;
        }
    }
});

let disabled = false;

cards.forEach(card => {
    card.img.onclick = function(e){
        if (!disabled){
            let step = -card.actualShiftX();
            if (step < -100)
                step = -100;
            else if (step > 100)
                step = 100;
            move(step);
            disabled = true;
            setTimeout(()=>{disabled = false;}, animationDuration + 100);
        }
    }
});


function move(step){
    let left, right;
    cards.forEach(c => {
        c.shiftX += step;
        c.apply();
        if (!left || c.actualShiftX() < left.actualShiftX())
            left = c;

        if (!right || c.actualShiftX() > right.actualShiftX())
            right = c;
    });
}