import { LightningElement,api,wire,track } from 'lwc';
import {NavigationMixin, CurrentPageReference} from 'lightning/navigation'
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class SimilarProperty extends NavigationMixin(LightningElement) {
    @api item;
    @wire(CurrentPageReference) pageRef;
    @track editMode = false;
	
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
     this.editMode = true;
 }
 handleSuccess() {
    const evt = new ShowToastEvent({
        title: "Success!",
        message: "The record has been successfully saved.",
        variant: "success",
    });
    this.dispatchEvent(evt);
    this.editMode = false;
}
   
handleError() {
    const evt = new ShowToastEvent({
        title: "Error!",
        message: "An error occurred while attempting to save the record.",
        variant: "error",
    });
    this.dispatchEvent(evt);
    this.editMode = false;
}
   
handleCancel(event) {
    this.editMode = false;
    event.preventDefault();
}
}