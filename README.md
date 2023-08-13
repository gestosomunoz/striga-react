# Striga test frontend

The app is divided in three pages:
* Exchange: where the client inputs the amount in EUR they want to pay and it displays the BTC to receive
* Invoice: displays the generated invoice for the customer to pay
* Confirmation: displays a message with the transaction status

There are things **to improve** (given time constrains) on the app that could be follow ups:
* Make the app responsive so it can be accessed from different devices and adapt to the screen
* Server side persistence of invoice: currently the invoice data is in local storage. In a real app where the customer is really logged in, it could check the open transactions of the customer and display the pending ones.
* Unit tests: these are a must on every project. If this was a real production project I would have written them, but given the time constrains and the nature of the project I've focused on the business logic
