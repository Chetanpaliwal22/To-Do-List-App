# React To-Do App

A simple To-Do App to understand the basic functionality of React and related concepts

This is motivated by [Scrimba](https://scrimba.com/) and [To-Do-App](https://github.com/AnjaliSharma1234/To-Do-App).

## Screenshot of the To-Do-List App

![](images/screenshot_app.PNG)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Installation Process

Follow the instructions for the ReactJS environment Setup given [here](https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm)

Follow the steps to create and deploy react app on GitHub pages

#### Step1: Initiative a react app
```
npm install -g create-react-app
```
#### Step2: Create your react app
```
create-react-app your-app-name
```
#### Step3: Go to the your-app-name directory
```
cd your-app-name
```
#### Step4: Start and check the working of the application
```
npm start
```
You can use the source code of the current [repository](https://github.com/Chetanpaliwal22/To-Do-List-App) to get started with the basic application

### Deployment

#### Step1: Install the gh-pages package as a "dev-dependency" of the app
```
npm install gh-pages — save-dev
```
#### Step2: Add homepage property to package.json file

Open package.json and add
```
"homepage": "http://{Github-username}.github.io/{Github-repo-name}"
```
#### Step3: Deploy scripts under package.json file

In the existing scripts property, add a predeploy property and a deploy property, each having the values shown below:

```
“scripts”: {
“predeploy”: “npm run build”,
“deploy”: “gh-pages -d build”
}
```

#### Step4: Create a remote GitHub repository
(Skip this step if your remote GitHub repository is already initialized)
```
Initialize: git init
```
Add it as remote: git remote add origin your-github-repository-url.git


#### Step5: Now deploy it to GitHub Pages
```
npm run deploy
```
## Hey Congratulations!! your application is deployed to GitHubPages

## Project Admin

| ![](images/chetan.jpeg) |
| :----------------------------------------------------------: |
| **[Chetan Paliwal](https://www.linkedin.com/in/Chetanpaliwal22/)**  |

[![GitHub followers](https://img.shields.io/github/followers/Chetanpaliwal22.svg?label=Follow%20@Chetanpaliwal22&style=social)](https://github.com/Chetanpaliwal22/) 
