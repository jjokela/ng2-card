import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent }   from './card.component';
import { CardService } from './card.service';

@NgModule({
    imports: [ CommonModule ],
    exports: [ CardComponent ],
    declarations: [ CardComponent ],
    providers: [ CardService ],
})
export class CardModule { }
