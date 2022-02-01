window.onload=function(){
    let canvas, ctx, eplep=document.querySelector('#eplep'),board={
        partSize:30,
        partsQuantity:20
    },
    apple={
        x:15,
        y:10,
        draw(){
            ctx.fillStyle='red'
            ctx.fillRect(this.x*board.partSize, this.y*board.partSize, board.partSize, board.partSize)
        }
    },
    snake={
        x:10,
        y:10,
        speed:1,
        xspeed:0,
        yspeed:0,
        trail:[],
        tail:5,
        epleptic:false,
        generateColor(value=0){
            let r = Math.random() * 255-value;
            let g = Math.random() * 255-value;
            let b = Math.random() * 255-value;
            
            return `rgba(${r}, ${g}, ${b}`;
        },
        draw(){
            if(this.epleptic){
                ctx.fillStyle=this.generateColor()
                ctx.fillRect(this.x*board.partSize, this.y*board.partSize, board.partSize, board.partSize)
            }
            else{
                ctx.fillStyle='tomato'
                ctx.fillRect(this.x*board.partSize, this.y*board.partSize, board.partSize, board.partSize)
            }
        },
        move(){
            this.x+=this.xspeed
            this.y+=this.yspeed
            if(this.x<0){
                this.x=board.partsQuantity-1
            }
            if(this.x>board.partsQuantity-1){
                this.x=0
            }
            if(this.y<0){
                this.y=board.partsQuantity-1
            }
            if(this.y>board.partsQuantity-1){
                this.y=0
            }
            
            this.draw()
            for (let i = 0; i < this.trail.length; i++) {
                ctx.fillRect(this.trail[i].x*board.partSize, this.trail[i].y*board.partSize, board.partSize-1, board.partSize-1)
                if(eplep.checked){
                    this.epleptic=true
                }else{
                    this.epleptic=false
                }                
                if(this.x==this.trail[i].x&&this.y==this.trail[i].y){
                    this.xspeed=0
                    this.yspeed=0
                    this.tail=5
                }              
                
            }
            apple.draw()
            
            this.trail.push({x:this.x, y:this.y})
            while(this.trail.length>this.tail){
                this.trail.shift()
            }


            if(this.x==apple.x&&this.y==apple.y){
                this.tail++
                apple.x=Math.floor(Math.random()*board.partsQuantity)
                apple.y=Math.floor(Math.random()*board.partsQuantity)
            }
            
            console.log(this.trail.length, this.tail)

        },
        moveControl(key){
            switch (key) {
                case 'ArrowUp':
                    this.yspeed=-this.speed
                    this.xspeed=0
                    break;
                case 'ArrowDown':
                    this.yspeed=this.speed
                    this.xspeed=0
                    break;
                case 'ArrowRight':
                    this.xspeed=this.speed
                    this.yspeed=0
                    break;
                case 'ArrowLeft':
                    this.xspeed=-this.speed
                    this.yspeed=0
                    break;
            
                default:
                    break;
            }
        }

    }

    function main() {
        canvas=document.querySelector('canvas')
        ctx=canvas.getContext('2d')

        canvas.width=600
        canvas.height=600
    }
    setInterval(draw,85)

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        window.onkeydown=function(e){
            let key=e.key
            snake.moveControl(key)
        }

        snake.move()
        snake.draw()
    }

    main()
}