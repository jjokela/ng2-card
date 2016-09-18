export class Card {

 first: number;
 second: number;
 operator: Operator;
 
 correctAnswer: number;
 answerChoices: Choice[];



}

export enum Operator {
    'Plus',
    'Minus',
    'Multiply',
    'Divide'
}

export class Choice {
    correctAnswer: boolean;
    answerd: boolean;
    enabled: boolean;
    displayValue: number;
}
