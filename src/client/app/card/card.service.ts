import { Injectable } from '@angular/core';
import { Card, Operator, Choice } from './card.model';

@Injectable()
export class CardService {

    constructor() { }

    minNumber: number = 1;
    maxNumber: number = 10;
    card: Card;

    getCard(getNew: boolean) {
        if(!this.card || getNew) {
            this.initModel();
        }
        return this.card;
    }

    initModel() {
        let card = new Card();
        card.operator = Operator.Plus;
        card.first = this.getRandomIntInclusive(this.minNumber, this.maxNumber);
        card.second = this.getRandomIntInclusive(this.minNumber, this.maxNumber);
        card.correctAnswer = card.first + card.second;
        card.answerChoices = this.createAnswerChoices(card.correctAnswer);

        this.card = card;
    }

    createAnswerChoices(answer: number): Choice[] {

        let arr: number[] = [];
        // create an array with values answer +-2
        for (var index = answer - 2; index < answer + 2; index++) {
            arr.push(index);            
        }
        // remove the answer from array
        arr = this.remove(arr, answer);

        // shuffle
        arr = this.shuffle(arr);

        // create choices
        let choices: number[] = [];
        choices.push(arr[0]);
        choices.push(arr[1]);
        choices.push(answer);

        // and finally shuffle it
        choices = this.shuffle(choices);

        let ca: Choice[] = [];
        for (var index = 0; index < choices.length; index++) {
            let c = new Choice();
            c.answerd = false;
            c.displayValue = choices[index];
            c.answerd = false;
            c.enabled = true;
            c.correctAnswer = choices[index] === answer ? true : false;
            ca.push(c);            
        }

        return ca;
    }

    remove(arrOriginal: number[], elementToRemove: number): number[]{
        return arrOriginal.filter((el: number) => {return el !== elementToRemove});
    }



    shuffle(array: number[]): number[] {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}