/**
    * QuickOTP class
    * 
    * This class is part of QuickOTP repository.
    * This javascript plugin helps to render otp input for any project
    *
    * @package    QuickOTP
    * @author     SAIKAT DUTTA <saikatdutta1991@gmail.com>
    */
    class QuickOTP {

    // here we will parse the config
    constructor(holderelemid, config = {}) {

        this.config = Object.assign({
            otpLength : 4,
            boxSize : "40px",
            boxColor : "#d35400",
            fontSize : "27px"
        }, config); // assign default config with new config

        this.holderelemid = holderelemid;
        this.holderelem = document.querySelector(holderelemid);
    }


    // render html elements
    render() {
        this.holderelem.innerHTML = this.getContent();
        
        // loop through all input fields and where finds no value focus that inputbox
        let inputs = this.getInputElements();
        for(let i = 0; i < inputs.length; i++) {
            if(inputs[i].value == "") {
                inputs[i].focus();
                inputs[i].select();
                break;
            }
        }


        // for each inputs add event listener
        inputs.forEach(item =>  {
            
            item.addEventListener('keyup', this.keyupHandler.bind(this));
            item.addEventListener('click', (event) => {
                event.target.select();
            });
        });

        return this;

    }


    keyupHandler(event) {
        
        // if input key is backspace, then move to previous input
        if(event.code == "Backspace") {
            let corder = parseInt(event.target.getAttribute("order")); // current input order

            // find next input order and focus
            let porder = corder == 1 ? corder : corder - 1;
            let porderinput = document.querySelector(`${this.holderelemid} > .otp-inputs .input[order='${porder}']`);
            porderinput.focus();
            porderinput.select();
        }

        // if any value entered, then move to next input
        else if(event.target.value !== "") {
            let corder = parseInt(event.target.getAttribute("order")); // current input order

            if(corder < this.getInputElements().length) {
                let norder = corder + 1;
                let norderinput = document.querySelector(`${this.holderelemid} > .otp-inputs .input[order='${norder}']`);
                norderinput.focus();
                norderinput.select();
            } else {
                event.target.select();
            }
        }
    }


    // get inputs elements
    getInputElements() {
        
        if(this.inputelements === undefined) {
            return document.querySelectorAll(`${this.holderelemid} > .otp-inputs .input`)
        }

        return this.inputelements;
    }



    // returns the inner content
    getContent() {

        let contentArray = []; // holder content html array

        // loop through all parms
        for(let i = 1; i <= this.config.otpLength; i++) {
            contentArray.push(`<input 
                class="input" 
                type="text" order="${i}" 
                style="border-color : ${this.config.boxColor}; 
                    color : ${this.config.boxColor};
                    width : ${this.config.boxSize};
                    height : ${this.config.boxSize};
                    font-size : ${this.config.fontSize};">`
            );
        }

        let content = contentArray.join(`<span class="dash" style="color:${this.config.boxColor}">-</span>`);
        content = `<div class="otp-inputs">${content}</div>`; // wrap content

        return content;                
    }



    // returns this current entered otp
    getOtp() {

        let otp = "";
        let elements = this.getInputElements();
        for(let i = 0; i < elements.length; i++) {
            otp += elements[i].value;
        }

        return otp;
    }


}