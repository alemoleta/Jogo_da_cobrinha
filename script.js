let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let direction = "right";

//array da comidinha que cria a comidinha em locais randômicos da tela
let food = {    
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//criar background, desenha tela
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//cria a cobrinha
function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green"; //colore a cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); //cria um retângulo
    }
}

//função de criar comidinha
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//evento que capta o comando direcional do teclado
document.addEventListener('keydown', update);
//função que faz com que a cobrinha não fique com 2 cabeças em caso de comando que inverte a direção do movimento
function update (event){
    if (event.keyCode == 37 && direction != "right") direction = "left";   
    if (event.keyCode == 38 && direction != "down") direction = "up";   
    if (event.keyCode == 39 && direction != "left") direction = "right";   
    if (event.keyCode == 40 && direction != "up") direction = "down";   
}

function iniciarJogo(){  
    //faz com a cobrinha não suma da tela, fazendo-a retornar do outro lado quando passa do limite
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    //checar se as coordenadas se chocam para testar se a cobrinha esbarrou em si mesma
    for (i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert ('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();
 
    //coordenadas
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
 
    //faz o movimento alterando as coordenadas
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //aumentar o rabo da cobrinha e troca a comidinha de lugar
    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);

}
//atualiza a tela
let jogo = setInterval(iniciarJogo, 100);