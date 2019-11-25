Innovaccer SummerGeeks SDE Assignment
==============================================

Innovaccer SummerGeeks submission by Atharva Sharma

### Problem Statement
Given the visitors that we have in office and outside, there is a need to for an entry management software.

### Technology Stack

-   NodeJS

-   MongoDB

-   ExpressJS

-   MSG91 messaging API

-   NodeMailer email API

### Instructions to install

1, Clone this repository:

```git clone <https://github.com/atharvasharma/Innovaccer-Summer-Geeks-SDE>```

2, Change directory

```cd Innovaccer-Summer-Geeks-Sde```

3, Install dependencies

```npm install```

4, Generate Authentication Key for messaging api.

Refer to this link - <https://msg91.com/>

5, Create a .env file and add below mentioned details in it.
```
# specify your port number here
PORT= PORT  NUMBER HERE

# specify credentials of msg91 (messaging api) here.
# route number is 1 for promotional and 4 for transactional msgs.

AUTHENTICATIONKEY = PASS AUTHENTICATION KEY AS A STRING
ROUTENUMBER = 1 OR 4
SENDERID = 6 DIGIT CODE BY WHICH SMS WILL BE SENT (STRING)

# specify credentials for nodemailer(email api) here, please enable less secure apps on gmail.

EMAIL = EMAIL ADDRRESS HERE (STRING)
PASSWORD = PASSWORD OF THE EMAIL SPECIFIED ABOVE HERE (STRING)
EMAIL_FROM = ID BY WHICH EMAILS WILL BE SENT (STRING)

# specify office address. This address will go to the visitor in the mail.
ADDRESS= SPECIFY YOUR OFFICE ADDRESS HERE.

```

6, Start the server

```npm start```

You should get something like this when every step has been followed correctly:
![Server](https://github.com/atharvasharma/Innovaccer-images/blob/master/server.JPG)

### Folder Structure:

![Folder](https://github.com/atharvasharma/Innovaccer-images/blob/master/folder.png)

Routes
---------------
### 1\. "http://localhost:4000" Used to display home page of the application.
This page gives the user option to either register as a host or for a visitor to check in and out.
It looks something like this:
![index](https://github.com/atharvasharma/Innovaccer-images/blob/master/home.JPG)


### 2\. "http://localhost:4000/register" Host can register himself here.
This page is used for the host to register. After registering the host will be visible to the visitor.
The page looks like:
![register](https://github.com/atharvasharma/Innovaccer-images/blob/master/register.JPG)

If the host is able to register successfully. He is shown the success message as:
![register success](https://github.com/atharvasharma/Innovaccer-images/blob/master/register%20success.JPG)

If the host has already registered, then he is shown error message as:
![register fail](https://github.com/atharvasharma/Innovaccer-images/blob/master/register%20fail.JPG)

### 3\. "http://localhost:4000/checkin" Visitor can check-in here.
This page is used for the visitor to check-in. He will have to choose from one of the existing hosts and enter his own details.
This will trigger an sms and email to host using API, details of which have been provided in .env file.

The page looks like:
![check in](https://github.com/atharvasharma/Innovaccer-images/blob/master/checkIn.JPG)

If user is able to check in successfully, then he gets a success message as:
![check in success](https://github.com/atharvasharma/Innovaccer-images/blob/master/check%20in%20success.JPG)

If the user tries to checkin, even though he has already checked in. Then he is informed about the same though an error msg:
![check in fail](https://github.com/atharvasharma/Innovaccer-images/blob/master/checkin%20fail.JPG)

### 4\. "http://localhost:4000/checkout" Visitor can check-out here
This page is used for the visitor to check-out. He will have to provide his email id to checkout from the application. After checking-out he will recieve an email, giving the details of his visit with the office address as provided in the .env file.

The page looks like:
![check out](https://github.com/atharvasharma/Innovaccer-images/blob/master/checkout.JPG)

If user is able to check in successfully, then he gets a success message as:
![check out success](https://github.com/atharvasharma/Innovaccer-images/blob/master/checkout%20sucess.JPG)

If user has already checked out, or forgot to checkin , he gets an error message as:
![check out fail](https://github.com/atharvasharma/Innovaccer-images/blob/master/check%20out%20fail.JPG)

