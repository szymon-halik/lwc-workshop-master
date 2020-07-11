import { LightningElement,api,wire } from 'lwc';
import {NavigationMixin, CurrentPageReference} from 'lightning/navigation'
export default class SimilarProperty extends NavigationMixin(LightningElement) {
    @api item;
    @wire(CurrentPageReference) pageRef;
	
 navigateToRecord() {
     this[NavigationMixin.Navigate]({
         type: 'standard__recordPage',
         attributes: {
             recordId: this.item.Id,
             objectApiName: 'Property__c',
             actionName: 'view',
         },
     });
 }
 editRecord(){
     this[NavigationMixin.Navigate]({
         type: 'standard__recordPage',
         attributes: {
             actionName: "edit",
             recordId: this.item.Id,
             objectApiName: "Property__c"
         }
     });
 }
}