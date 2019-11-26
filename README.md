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

```git clone https://github.com/atharvasharma/Innovaccer-Summer-Geeks-SDE```

2, Change directory

```cd Innovaccer-Summer-Geeks-SDE```

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

![Folder](https://github.com/atharvasharma/Innovaccer-images/blob/master/folder.JPG)

### Models Used:
#### &nbsp;&nbsp;1. Visitor:
 
  &nbsp;&nbsp;&nbsp;&nbsp;a. Name <br>
  &nbsp;&nbsp;&nbsp;&nbsp;b. Email <br>
  &nbsp;&nbsp;&nbsp;&nbsp;c. Phone <br>
  &nbsp;&nbsp;&nbsp;&nbsp;d. checkInTime <br>
  &nbsp;&nbsp;&nbsp;&nbsp;e. checkInDate <br>
  &nbsp;&nbsp;&nbsp;&nbsp;f. timeStamp <br>
  &nbsp;&nbsp;&nbsp;&nbsp;g. checkoutTIme <br>
  &nbsp;&nbsp;&nbsp;&nbsp;h. status: [pending,departed] //depending on whether he has checked out. <br>
  &nbsp;&nbsp;&nbsp;&nbsp;i. hostEmail <br>

#### &nbsp;&nbsp;2. Host: 
  &nbsp;&nbsp;&nbsp;&nbsp;a. Name <br>
  &nbsp;&nbsp;&nbsp;&nbsp;b. Email <br>
  &nbsp;&nbsp;&nbsp;&nbsp;c. Phone <br>
  &nbsp;&nbsp;&nbsp;&nbsp;d. Visitors []  // Relation between Host and Visitor is 1:N relationship. <br>
  
Routes (with approaches)
---------------
### 1\. "http://localhost:4000" Used to display home page of the application.
This page gives the user option to either register as a host or for a visitor to check in and out.
It looks something like this:

![index](https://github.com/atharvasharma/Innovaccer-images/blob/master/index.JPG)


### 2\. "http://localhost:4000/register" Host can register himself here.
This page is used for the host to register. After registering the host will be visible to the visitor.
The page looks like:

![register](https://github.com/atharvasharma/Innovaccer-images/blob/master/register.JPG)

If the host is able to register successfully. He is shown the success message as:

![register success](https://github.com/atharvasharma/Innovaccer-images/blob/master/register%20success.JPG)

If the host has already registered, then he is shown error message as:

![register fail](https://github.com/atharvasharma/Innovaccer-images/blob/master/register%20fail.JPG)

#### Approach used for registration of host: 
a. Fetch details as entered by host. <br>
b. Find if a Host with that email already exists in db. If so, flash an error message. <br>
c. Else add host to db, flash a success message. <br>

### 3\. "http://localhost:4000/checkin" Visitor can check-in here.
This page is used for the visitor to check-in. He will have to choose from one of the existing hosts and enter his own details.
This will trigger an sms and email to host using API, details of which have been provided in .env file.

The page looks like:

![check in](https://github.com/atharvasharma/Innovaccer-images/blob/master/checkIn.JPG)

If user is able to check in successfully, then he gets a success message as:

![check in success](https://github.com/atharvasharma/Innovaccer-images/blob/master/check%20in%20success.JPG)

If the user tries to checkin, even though he has already checked in. Then he is informed about the same though an error msg:

![check in fail](https://github.com/atharvasharma/Innovaccer-images/blob/master/checkin%20fail.JPG)

#### Approach used for check-in: 
a. Fetch information as filled in by visitor. <br>
b. Get current date and time as well as timestamp of the entry. <br>
c. Find a visitor with that email and status as 'pending'. This means that he has already checked in beacuse he is already there in db with status pending. So flash an error. <br>
d. Else add the visitor in db, find host as entered by visitor and push visitor into visitors array for that host. This will help in host to see all the visitors he had. <br>
e. Send sms and email to host. <br>

### 4\. "http://localhost:4000/checkout" Visitor can check-out here
This page is used for the visitor to check-out. He just has to confirm his email which is already displayed to him using express session. After checking-out he will recieve an email, giving the details of his visit with the office address as provided in the .env file.

The page looks like:

![check out](https://github.com/atharvasharma/Innovaccer-images/blob/master/checkout.JPG)

If user is able to check out successfully, then he gets a success message as:

![check out success](https://github.com/atharvasharma/Innovaccer-images/blob/master/checkout%20sucess.JPG)

If user has already checked out, or forgot to checkin , he gets an error message as:

![check out fail](https://github.com/atharvasharma/Innovaccer-images/blob/master/check%20out%20fail.JPG)

#### Approach used for check-out: 
a. Fetch visitor email from post request. <br>
b. Find visitor with email same as entered in form and status as pending. If we are able to find such visitor then mark his status as departed and send him the mail of details. <br>
c. Else the visitor forgot to check in or has already checked out. So flash an error msg. <br>

### CONTACT

Atharva Sharma

Ph-8890307960

[Email -17ucc018@lnmiit.ac.in](mailto:Email-17ucc018@lnmiit.ac.in)
