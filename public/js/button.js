var a = 0;
    const button = document.getElementById('submit');
    const name = document.forms['form']['username'].value;
    const pass = document.forms['form']['password'].value;
        
        
    function mouseOver(){
        if((name == "" || pass == "") && a==0){
        buttonMoveLeft();
        a = 1;
        return false;
        } 
        if((name == "" || pass == "") && a==1){
        buttonMoveRight();
        a = 2;
        return false;
        }
        if((name == "" || pass == "") && a==2){
        buttonMoveLeft();
        a = 1;
        return false;
        } 
        else{
            button.style.cursor = 'pointer';
            return false;
        };
    };

    function buttonMoveLeft(){
        button.style.transform = 'translateX(-180%)';
    };

    function buttonMoveRight(){
        button.style.transform = 'translateX(0%)';
    };

    function resetBtn(){
        button.style.transform = 'translateX(0%)';
    };
