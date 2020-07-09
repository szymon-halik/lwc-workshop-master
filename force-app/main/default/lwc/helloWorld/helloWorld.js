import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting = 'World';
    myInput = 'World'
    handleChange(event){
        this.greeting = event.target.value;
        this.myInput = this.greeting;
    }
    handleClick(){
        this.greeting = this.myInput + ". It's a pleasure to meet you";
    }
}