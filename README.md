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
PORT=

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
### 1\. "localhost:4000" Used to display home page of the application.
This page gives the user option to either register as a host or for a visitor to check in and out.
It looks something like:
![Folder](https://github.com/atharvasharma/Innovaccer-images/blob/master/home.JPG)
