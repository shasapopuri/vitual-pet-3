class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('Milk.png');
    this.washroom.x = this.washroom.x +20
    }

    preload(){
      Bedroom=loadImage("Bed Room.png")
      Garden=loadImage("Garden.png")
      Washroom=loadImage("Wash Room.png")
      }

    bedroom(){
      background(Bedroom,550,550)
    }

    garden(){
      background(Garden,550,550)
    }

    washroom(){
      background(Washroom,550,550)
    }


    
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    display(){
      var x=80,y=100;
      
      imageMode(CENTER);
      image(this.image,720,220,70,70);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
}
