![Deejay image](resources/images/deejay.jpg)
# Spotify Deejay

> Not your typical wedding DJ

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger)[![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger)

***INSERT ANOTHER GRAPHIC HERE***

- Most people will glance at your `README`, *maybe* star it, and leave
- Ergo, people should understand instantly what your project is about based on your repo

> Tips

- HAVE WHITE SPACE
- MAKE IT PRETTY
- GIFS ARE REALLY COOL

> GIF Tools

- Use <a href="http://recordit.co/" target="_blank">**Recordit**</a> to create quicks screencasts of your desktop and export them as `GIF`s.
- For terminal sessions, there's <a href="https://github.com/chjj/ttystudio" target="_blank">**ttystudio**</a> which also supports exporting `GIF`s.

**Recordit**

![Recordit GIF](http://g.recordit.co/iLN6A0vSD8.gif)

**ttystudio**

![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif)

---

## Table of Contents (Optional)

> If your `README` has a lot of info, section headers might be nice.

- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)


---

## Example (Optional)

```javascript
// code away!

let generateProject = project => {
  let code = [];
  for (let js = 0; js < project.length; js++) {
    code.push(js);
  }
};
```

---

## Installation

- All the `code` required to get started
- Images of what it should look like

### Clone

- Clone this repo to your local machine using `https://github.com/fvcproductions/SOMEREPO`

### Setup

- If you want more syntax highlighting, format your code like this:

> update and install this package first

```shell
$ brew update
$ brew install fvcproductions
```

> now install npm and bower packages

```shell
$ npm install
$ bower install
```

- For all the possible languages that support syntax highlithing on GitHub (which is basically all of them), refer <a href="https://github.com/github/linguist/blob/master/lib/linguist/languages.yml" target="_blank">here</a>.

---

## Features
## Usage
> Basic request format
- To create a session
a userId, and a song queue are required:
PATH: post. http://localhost:3000/sessions
```angular2
{
	"userId": "user_123dfdfee2dfg3sd423",
	"songQueue": [
		{"uri": "asdasdas", "title": "matt sings agian", "votes" : "0"},
		{"uri": "1231231", "title": "mattjhjgs agian", "votes" : "0"},
		{"uri": "asdassasdfsdfsdas", "title": "matsadfsdt sings agian", "votes" : "1"},
		{"uri": "123345634561231", "title": "matt sings agian", "votes" : "2"}
	]
}
```
- To add a song to a session
PATH: patch. http://localhost:3000/sessions/:sessionId/songs/add
```angular2
{
	"song": {
		"uri": "12334sd4561231",
		"title": "matt sings agian",
		"votes" : "2"
	}
}
```
- to add a user to a session
PATH: patch. http://localhost:3000/sessions/:sessionId/users/add
````angular2
{
    "user": {
        "userId": "user_125fdgs324"    
    }
}
````
## Documentation 
> To get started...
- You will need to setup a .env file with these requirements
```angular2
# Database credentials
API_KEY= ""
AUTH_DOMAIN= ""
DATABASE_URL= ""
PROJECT_ID= ""
STORAGE_BUCKET= ""
MESSAGING_SENDER_ID= ""
APP_ID= ""
MEASUREMENT_ID= ""

# server and logging
NAME=""
LOG_LEVEL=''
PORT=

```
## Tests (Optional)

- Going into more detail on code and technologies used
- I utilized this nifty <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Markdown Cheatsheet</a> for this sample `README`.

---

## Contributing

> To get started...

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/joanaz/HireDot2.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/joanaz/HireDot2/compare/" target="_blank">`https://github.com/joanaz/HireDot2/compare/`</a>.

---

## Team

| **Matt Lewandowski**</a> | **Kyle Vincent**</a> |
|:---:|:---:|
| [![matt](resources/images/matt.jpg?)](https://github.com/matthew-lewandowski) | [![kyle](resources/images/kyle.jpg?s=100)](https://github.com/soldered-snake) |

---

## FAQ

- **How do I do *specifically* so and so?**
    - No problem! Just do this.

---

## Support

Reach out to me at one of the following places!

- Website at <a href="http://fvcproductions.com" target="_blank">`fvcproductions.com`</a>
- Twitter at <a href="http://twitter.com/fvcproductions" target="_blank">`@fvcproductions`</a>
- Insert more social links here.

---

## Donations (Optional)

- You could include a <a href="https://cdn.rawgit.com/gratipay/gratipay-badge/2.3.0/dist/gratipay.png" target="_blank">Gratipay</a> link as well.

[![Support via Gratipay](https://cdn.rawgit.com/gratipay/gratipay-badge/2.3.0/dist/gratipay.png)](https://gratipay.com/fvcproductions/)


---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2015 © <a href="http://fvcproductions.com" target="_blank">FVCproductions</a>.