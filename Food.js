class Food {
    constructor(){
        this.image=loadImage("Milk.png")
        this.foodStock= null
        this.lastFed= null
    }

    getFoodStock(){
        var listener= database.ref("Food")
        listener.on("value",(data)=>{
        this.foodStock = data.val();
        })
        return(this.foodStock)
    }

    updateFoodStock(Food){
        database.ref('/').update({
            Food:Food
        })
    }

    deductFoodStock(Food){
        database.ref('/').update({
            Food:foodS-1
        })

    }

    display(){
    var x=80, y=100

    imageMode(CENTER)
   // image(this.image,720,220,70,70);

    if(this.foodStock!=0){
        for( var i=0; i<this.foodStock;i++) {
            if(i%10==0){
                x=80
                y+y+50
            }
            image(this.image,x,y,50,50);
            x=x+30
        }
    }
    }

    bedroom(){
        background(bedroom,1000,1000)
    }

    washroom(){
        background(washroom,1050,1000)
    }

    garden(){
        background(garden,1500,1000)
    }


}