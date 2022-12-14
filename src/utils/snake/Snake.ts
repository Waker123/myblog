class Snake {
    // è¡¨ç¤ºðå¤´çåç´ 
    head: HTMLElement;
    // èçèº«ä½(åæ¬èå¤´)
    bodies: HTMLCollection;
    // è·åèçå®¹å¨
    element: HTMLElement;

    constructor() {
        this.head = document.querySelector("#snake>div")!;//åèå¤´,ç¬¬ä¸ä¸ªdiv
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.element = document.getElementById('snake') as HTMLElement;//ç¸å½äº!
    }

    // è·åèçåæ (èå¤´åæ )
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }

    // è®¾ç½®èå¤´çåæ 
    set X(value: number) {
        if (this.X === value) {
            return
        }
        // Xçå¼çåæ³èå´0-290
        if (value < 0 || value > 290) {
            // è¿å¥å¤æ­è¯´æèæå¢äº
            throw new Error("Game Over")
        }
        // ä¿®æ¹xæ¶ï¼æ¯å¨ä¿®æ¹æ°´å¹³åæ ï¼èå¨å·¦å³ç§»å¨ï¼èå¨åå·¦(å³)ç§»å¨æ¶ï¼ä¸è½åå³(å·¦)æå¤´
        // å¨ç¬¬äºèå­å¨æ¶ï¼èå¤´çåæ ä¸è½ç­äºç¬¬äºèçåæ 
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('æ°´å¹³æ¹ååçäºè°å¤´')
            // å¦æåçäºæå¤´ï¼è®©èååæ¹åç»§ç»­ç§»å¨
            if (value > this.X) {
                // å¦ææ°å¼valueå¤§äºæ§å¼Xï¼åè¯´æèå¨åå³èµ°ï¼æ­¤æ¶åçæå¤´ï¼åºè¯¥è®©èç»§ç»­åå·¦èµ°
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }

        }


        this.moveBody();
        this.head.style.left = value + 'px';
    }
    set Y(value: number) {
        if (this.Y === value) {
            return
        }

        if (value < 0 || value > 290) {
            // è¿å¥å¤æ­è¯´æèæå¢äº
            throw new Error("Game Over")
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // å¦æåçäºæå¤´ï¼è®©èååæ¹åç»§ç»­ç§»å¨
            if (value > this.Y) {
                // å¦ææ°å¼valueå¤§äºæ§å¼Yï¼åè¯´æèå¨åä¸èµ°ï¼æ­¤æ¶åçæå¤´ï¼åºè¯¥è®©èç»§ç»­åä¸èµ°
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }

        }
        this.moveBody();
        this.head.style.top = value + 'px';
        // æ£æ¥ææ²¡ææå°èªå·±
        this.checkHeadBody();//å¿é¡»æ¾å°è®¾ç½®valueåé¢
    }

    // èå¢å èº«ä½çæ¹æ³
    addBody() {
        // åelementä¸­æ·»å ä¸ä¸ªdiv
        let div = document.createElement('div');
        this.element.appendChild(div);
    }

    // å¢å ä¸ä¸ªèèº«ä½ç§»å¨çæ¹æ³
    moveBody() {
        /* 
            å°åè¾¹çèº«ä½è®¾ç½®ä¸ºåè¾¹èº«ä½çä½ç½®
                ä¸¾ä¾å­
                    ç¬¬åè = ç¬¬ä¸èçä½ç½®
                    ç¬¬ä¸è = ç¬¬äºèçä½ç½®
                    ç¬¬äºè = èå¤´çä½ç½®
        */
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // è·ååè¾¹èº«ä½çä½ç½®
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // å°å¼è®¾ç½®å°å½åèº«ä½ä¸
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';

        }


    }

    // æ£æ¥èå¤´æ¯å¦æå°èªå·±äº
    checkHeadBody() {
        // è·åææçèº«ä½ï¼æ£æ¥å¶æ¯å¦åèå¤´çåæ åçéå 
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // è¿å¥å¤æ­è¯´æèå¤´æå°äºèº«ä½ï¼æ¸¸æç»æ
                throw new Error('æå°èªå·±äº!')
            }
        }
    }

}

export default Snake;