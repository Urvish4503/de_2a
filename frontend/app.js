const boxButton = document.querySelector('.box__button');
const boxContent = document.querySelector('.box__support');
const icons = {
    isClicked: '<img src="images/axa.png" style="height: 40px; width: 40px;"/>',
    isNotClicked: '<img src="images/axa.png" style="height: 40px; width: 40px;" />'
}
const box = new Interactivebox(boxButton, boxContent, icons);
box.display();
box.toggleIcon(false, boxButton);