class Interactivebox {
    constructor(a, b, c) {
        this.args = {
            button: a,
            box: b
        }
        this.icons = c;
        this.state = false; 
    }

    display() {
        const {button, box} = this.args;
        
        button.addEventListener('click', () => this.toggleState(box))
    }

    toggleState(box) {
        this.state = !this.state;
        this.showOrHideBox(box, this.args.button);
    }

    showOrHideBox(box, button) {
        if(this.state) {
            box.classList.add('box--active')
            this.toggleIcon(true, button);
        } else if (!this.state) {
            box.classList.remove('box--active')
            this.toggleIcon(false, button);
        }
    }

    toggleIcon(state, button) {
        const { isClicked, isNotClicked } = this.icons;
        let b = button.children[0].innerHTML;

        if(state) {
            button.children[0].innerHTML = isClicked; 
        } else if(!state) {
            button.children[0].innerHTML = isNotClicked;
        }
    }
}