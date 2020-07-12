import { LightningElement,api,track,wire } from 'lwc';
import findProperties from '@salesforce/apex/SimilarPropertyController.findProperties';
import { getRecord } from 'lightning/uiRecordApi';
import {createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';
 import MESSAGE_CHANNEL from "@salesforce/messageChannel/Properties__c";
 import { refreshApex } from '@salesforce/apex';

const fields = [
    'Property__c.Name',
    'Property__c.Price__c',
    'Property__c.Status__c',
    'Property__c.Beds__c',
    'Property__c.Broker__c'
]
export default class SimilarProperties extends LightningElement {
    

 @api recordId;
 @track props;
 @track errorMsg;
 @track property;
 @track price;
 @track beds;

 context = createMessageContext();
 subscription = null;
			
 @wire(findProperties, { 
     recordId: '$recordId',
     priceRange: '100000',
     price: '$price',
     beds:'$beds'
 })
 props
 @wire(getRecord, {recordId: '$recordId', fields})
 wiredProperty(value) {
     if(value.data) {
         this.property = value.data;
         this.price = this.property.fields.Price__c.value;
         this.beds = this.property.fields.Beds__c.value;
     } else if (value.error) {
         console.log("OOOPS: ", value.error)
     }
 }
 connectedCallback() {
    if (this.subscription) {
        return;
    }
    this.subscription = subscribe(this.context, MESSAGE_CHANNEL, (message) => {
        this.refreshSelection(message);
    },{scope: APPLICATION_SCOPE} ); 
}

disconnectedCallback() {
    releaseMessageContext(this.context);
}
    
refreshSelection() {
    refreshApex(this.wiredRecords);
}
}