import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Card, Choice } from './card.model';
import { CardService } from './card.service';
declare var componentHandler: any;

@Component({
    moduleId: module.id,
    selector: 'card-component',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.css']
})
export class CardComponent implements AfterViewChecked, OnInit {

    card: Card;
    resultText: string = 'Vastaus';
    solved: boolean = false;

    constructor(private cardService: CardService) { }

    ngAfterViewChecked() {
        // viewChild is set after the view has been initialized
        componentHandler.upgradeAllRegistered();
    }

    ngOnInit() {
        this.card = this.cardService.getCard(true);
    }

    onClick(choice: Choice) {
        console.log(choice.displayValue);

        // if correct answer, disable all
        if (choice.correctAnswer) {
            for (let choice of this.card.answerChoices) {
                choice.enabled = false;
            }
            console.log('oikein');
            this.resultText = 'OIKEIN!!';
            this.solved = true;
        } else {
            choice.enabled = false;
            console.log('väärin');
            this.resultText = 'Väärin meni, yritä uudelleen';
        }

        choice.answerd = true;
    }

    onCreateNew() {
        this.solved = false;
        this.resultText = 'Vastaus';
        this.card = this.cardService.getCard(true);
    }

    setClass(choice: Choice): string {
        let className: string = '';
        if (choice.answerd && choice.correctAnswer) {
            className = 'correct-answer';
        } else if (choice.answerd && !choice.correctAnswer) {
            className = 'wrong-answer';
        }
        return className;
    }
}