const turnOnOff = document.querySelector('#turnOnOff')
const lamp = document.querySelector('#lamp')

/* verificar se a lâmpada está quebrada ou não */

function isLampBroken() {
    return lamp.src.indexOf('quebrada') > -1
}

function lampOn() {
    if (!isLampBroken()) {
        lamp.src = '/assets/img/ligada.png' 
        turnOnOff.textContent = 'Desligar'
    }
}
function lampOff() {
    if (!isLampBroken()) {
        lamp.src = '/assets/img/desligada.png'
        turnOnOff.textContent = 'Ligar'
    }
}
function lampBroken() {
    lamp.src = '/assets/img/quebrada.png'
    turnOnOff.src = lampOnOff()
}
function lampOnOff() {
    if (turnOnOff.textContent == 'Ligar'&& !isLampBroken()) {
        lampOn();
        turnOnOff.textContent = 'Desligar'
    } else {
        lampOff()
        turnOnOff.textContent = 'Ligar'
    }
}
function lampBrokenReset(){
    if(isLampBroken()){
        lamp.src = 'assets/img/desligada.png';
        lampOff();
    }
}

turnOnOff.addEventListener('click', lampOnOff)
lamp.addEventListener('mouseover', lampOn)
lamp.addEventListener('mouseleave', lampOff)
lamp.addEventListener('dblclick', lampBroken)
turnOnOff.addEventListener('dblclick', lampBrokenReset)