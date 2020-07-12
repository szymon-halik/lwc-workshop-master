import { LightningElement,api,wire,track } from 'lwc';
import {NavigationMixin, CurrentPageReference} from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { publish, createMessageContext, releaseMessageContext } from 'lightning/messageService';
 import MESSAGE_CHANNEL from "@salesforce/messageChannel/Properties__c";
export default class SimilarProperty extends NavigationMixin(LightningElement) {
    @api item;
    @wire(CurrentPageReference) pageRef;
    @track editMode = false;
    context = createMessageContext();
	
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
    publish(this.context, MESSAGE_CHANNEL,this);
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